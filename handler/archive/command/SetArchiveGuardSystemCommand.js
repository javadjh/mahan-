const ArchiveModel = require("../../../model/ArchiveModel");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
module.exports.setArchiveGuardSystem = async (req,res)=>{
    await roleGuard(['ثبت اطلاعات تکمیلی برای بایگانی'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {archiveId,cycle,finallyUserId,auditUserId,primitiveUserId,isActive} = req.body

    let data = {
        cycle,
        isActive
    }
    switch (cycle){
        case 1:
            data.finally = finallyUserId
            break
        case 2:
            data.finally = finallyUserId
            data.primitive = primitiveUserId
            if(finallyUserId===primitiveUserId)
                return errorResponse(res,"تصویب کننده و تایید کننده اولیه نمیتوانند یکی باشند")
            break
        case 3:
            data.finally = finallyUserId
            data.primitive = primitiveUserId
            data.audit = auditUserId
            if(finallyUserId===primitiveUserId)
                return errorResponse(res,"تصویب کننده و تایید کننده اولیه نمیتوانند یکی باشند")
            if(finallyUserId===auditUserId)
                return errorResponse(res,"تایید کننده نهایی و کاربر ممیزی نمیتوانند یکی باشند")
            if(primitiveUserId===auditUserId)
                return errorResponse(res,"تایید کننده اولیه و ممیزی نمیتوانند یکی باشند")
            break
    }



    const archive = await ArchiveModel.findByIdAndUpdate(archiveId,{
        $set:{
            guardSystem:data
        }
    },{new:true})



    return res.send(archive)
}