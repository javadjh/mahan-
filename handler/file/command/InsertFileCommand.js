const ArchiveTreeModel = require("../../../model/ArchiveTree");
const FileModel = require("../../../model/FileModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertFileValidator} = require("../../../validator/FileValidator");
const {generateFileCode} = require("../../../utility/generateFileCode");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const moment = require('jalali-moment')
const AppSettingModel = require("../../../model/AppSettingModel");
const ArchiveModel = require("../../../model/ArchiveModel");



module.exports.insertFile = async (req,res)=>{

    await roleGuard(["ویرایش پرونده"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {error} = insertFileValidator(req.body)
    if(error) {
        await insertLog(req,"افزودن پرونده",`خطا در افزودن پرونده جدید رخ داد - اطلاعات ارسال شده نادرست میباشد`,false,"پرونده")
        return errorResponse(res,error.message)
    }

    const archiveTree = await ArchiveTreeModel.findById(req.body.archiveTreeId).populate("archive")

    const appSetting = await AppSettingModel.findOne()

    let fileCode = req.body.fileCode
    switch (archiveTree.archive.availablePattern){
        case "three":
            fileCode = await generateFileCode(archiveTree.archive.firstStringOfPattern)
            break
        case "four":
            fileCode = await generateFileCode("MAHAN")
            break
        case "one":
            fileCode = archiveTree.archive.firstStringOfPattern + "-" + req.body.fileCode
            break
        case "two":
            fileCode = archiveTree.archive.firstStringOfPattern + "-" + moment(new Date(), 'YYYY/MM/DD').locale('fa').format('YYYYMMDD') + req.body.fileCode
            break
    }


    let supervisorData = {
        isReject:false,
        isWaiting:false
    }
    /*if(appSetting.isSupervisorActive){
        supervisorData.isConfirm = false
    }else{
        supervisorData.isConfirm = true
    }*/

    let waitingFor = undefined
    const archive = await ArchiveModel.findById(archiveTree.archive._id)
    if(archive.guardSystem){
        if(archive.guardSystem.isActive){
            let guard = archive.guardSystem
            switch (guard.cycle){
                case 1:
                    waitingFor = "finally"
                    break
                case 2:
                    waitingFor = "primitive"
                    break
                case 3:
                    waitingFor = "primitive"
                    break
            }
        }else{
            supervisorData.isConfirm = true
        }
    }else{
        supervisorData.isConfirm = true
    }


    let isFind = false
    let mainParentArchiveTreeId
    let currentArchiveTreeId = req.body.archiveTreeId
    while (!isFind){
        let preArchiveTree = await ArchiveTreeModel.findById(currentArchiveTreeId).select("title isMain mainParent")
        currentArchiveTreeId = preArchiveTree.mainParent
        if(preArchiveTree.isMain){
            isFind = true
            mainParentArchiveTreeId = preArchiveTree._id
            break
        }
    }

    if (isFind && mainParentArchiveTreeId.toString()!==req.body.mainArchiveTreeId)
        return errorResponse(res,"کاربر متخلف و از سامانه به درستی استفاده نکرده است")

    const mainArchiveTree = await ArchiveTreeModel.findById(req.body.mainArchiveTreeId).select("form")

    let hasSpecialForm = false
    if(mainArchiveTree.form !==req.body.formSelected){
        hasSpecialForm = true
    }

    let newFile = await new FileModel({...req.body, ...{fileCode,archiveId:archiveTree.archive._id,creator:req.user.userId},
        ...supervisorData,...hasSpecialForm,waitingFor})

    if(!newFile){
        await insertLog(req,"افزودن پرونده",`خطا در افزودن پرونده جدید رخ داد`,false,"پرونده")
        return errorResponse(res,1)
    }

    newFile = await newFile.save()

    return res.send(newFile)

}
