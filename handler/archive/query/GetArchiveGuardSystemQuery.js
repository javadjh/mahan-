const ArchiveModel = require("../../../model/ArchiveModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
module.exports.getArchiveGuardSystem = async (req,res)=>{
    await roleGuard(['ثبت اطلاعات تکمیلی برای بایگانی'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const hasGuard = await ArchiveModel.findById(req.params.id)
        .select("guardSystem")
    if(!hasGuard) return errorResponse(res,2)

    let guardSystem = hasGuard.guardSystem
    let guard = {}
    if(guardSystem && hasGuard.guardSystem){

        if(guardSystem.primitive && guardSystem.finally && guardSystem.audit ){
            console.log("first")
            guard = await ArchiveModel.findById(req.params.id)
                .populate("guardSystem.primitive","firstName lastName position")
                .populate("guardSystem.finally ","firstName lastName position")
                .populate("guardSystem.audit ","firstName lastName position")
                .lean()
            guard.guardSystem.primitive = {
                value:guard.guardSystem.primitive._id,
                label:`${guard.guardSystem.primitive.firstName} ${guard.guardSystem.primitive.lastName} - ${guard.guardSystem.primitive.position}`
            }

            guard.guardSystem.audit = {
                value:guard.guardSystem.audit._id,
                label:`${guard.guardSystem.audit.firstName} ${guard.guardSystem.audit.lastName} - ${guard.guardSystem.audit.position}`
            }

            guard.guardSystem.finally = {
                value:guard.guardSystem.finally._id,
                label:`${guard.guardSystem.finally.firstName} ${guard.guardSystem.finally.lastName} - ${guard.guardSystem.finally.position}`
            }

        }else if(guardSystem.primitive && guardSystem.finally){
            console.log("second")
            guard = await ArchiveModel.findById(req.params.id)
                .populate("guardSystem.primitive","firstName lastName position")
                .populate("guardSystem.finally ","firstName lastName position")
                .lean()
            guard.guardSystem.primitive = {
                value:guard.guardSystem.primitive._id,
                label:`${guard.guardSystem.primitive.firstName} ${guard.guardSystem.primitive.lastName} - ${guard.guardSystem.primitive.position} `
            }

            guard.guardSystem.finally = {
                value:guard.guardSystem.finally._id,
                label:`${guard.guardSystem.finally.firstName} ${guard.guardSystem.finally.lastName} - ${guard.guardSystem.finally.position} `
            }

        }else if(guardSystem.finally){
            console.log("third")
            guard = await ArchiveModel.findById(req.params.id)
                .populate("guardSystem.finally ","firstName lastName position")
                .lean()


            guard.guardSystem.finally = {
                value:guard.guardSystem.finally._id,
                label:`${guard.guardSystem.finally.firstName} ${guard.guardSystem.finally.lastName} - ${guard.guardSystem.finally.position} `
            }

        }

        console.log("finish")


    }


    return res.send(guard.guardSystem)

}