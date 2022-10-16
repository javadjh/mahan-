const FileModel = require("../../../model/FileModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");

module.exports.getSingleFile = async (req,res)=>{
    await roleGuard(["ویرایش پرونده","ناظر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {id} = req.params
    const file = await FileModel.findById(id).populate("archiveTreeId").populate("correspondence.creator correspondence.userReceiver","firstName lastName")
        .populate("correspondence.supervisorReceiver","firstName lastName")
        .populate("mainArchiveTreeId","isFormRequired")
        .populate({
        path: 'archiveTreeId',
        populate: {
            path: 'archive',
            model: 'archive'
        }
    }).select("-contacts._id")
        .populate("applicantId").lean()

    file.createDate = convertToShamsi(file.createDate)
    file.fileDateMiladi =file.fileDate
    file.fileDate = convertToShamsi(file.fileDate)

    if(file.applicant)
        file.applicant = {
            value:file.applicantId._id,
            label:file.applicantId.title
        }

    file.correspondence.map(c=>{
        c.createDate = convertToShamsi(c.createDate)
    })

    const isFind = checkUserArchiveAccess(req.user.userId,file.archiveTreeId.archive)
    if(!isFind) return errorResponse(res,"شما به این بخش دسترسی ندارید")

    //todo complete this gourd
    // if(!file.isConfirm)
    //     if(file.creator.toString()!==req.user.userId.toString())
    //         return errorResponse(res,"این پرونده تایید نشده است")

    return res.send(file)

}
