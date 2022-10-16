const UserModel = require("../../../model/UserModel");
const FileAlertModel = require("../../../model/FileAlertModel");
const {convertToShamsi} = require("../../../utility/dateUtility");


module.exports.getAllUsersFilesAlerts = async (req,res)=>{
    let {pageId,eachPerPage,searchValue} = req.query
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)

    let userId = req.user.userId

    const user = await UserModel.findById(userId).populate("role.roleId").populate("role.roleId.accessList").lean()

    let archivesList = []
    user.role.map(r=>{
        archivesList.push(r.archiveId)
    })

    const filesAlerts = await FileAlertModel.find({
        archiveId:{$in:archivesList},
        isActive:true,
        $or:[
            {title:{$regex: searchValue, $options: 'i'}},
        ]
    })
        .populate("fileId")
        .populate("creator","firstName lastName position")
        .populate("archiveId","isFormRequired title")
        .skip((pageId-1)*eachPerPage)
        .limit(eachPerPage)
        .sort({createDate:-1})
        .lean()

    const total = await FileAlertModel.find({
        archiveId:{$in:archivesList},
        isActive:true,
    }).lean()

    filesAlerts.map(alert=>{
        alert.createDate = convertToShamsi(alert.createDate)
        alert.isExpired = (new Date(Date.now()) > alert.alertDate)
        alert.alertDate = convertToShamsi(alert.alertDate)
    })

    console.log(filesAlerts)


    return res.send({
        pageId,
        eachPerPage,
        searchValue,
        total,
        filesAlerts
    })

}