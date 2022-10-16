const FileModel = require("../../../model/FileModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')

module.exports.setFileFormData = async (req,res)=>{
    await roleGuard(['ویرایش روکش پرونده'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {id} = req.params

    let uniqueUiIdObjectList = []
    let uniqueAnswerObjectList = []
    req.body.map(f=>{
        if(f.type==="input" && f.pattern==="unique"){
            uniqueUiIdObjectList.push(f.uiId)
            uniqueAnswerObjectList.push(f.answer)
        }
    })


    const fileFormUnique = await FileModel.findOne({
        _id:{
            $ne:id
        },
        form:{
            $elemMatch:{
                uiId:{
                    $in:uniqueUiIdObjectList
                },
                answer:{
                    $in:uniqueAnswerObjectList
                }
            }
        }
    })
    console.log(fileFormUnique)
    if(fileFormUnique){
        return errorResponse(res,"این ورودی یکتا میباشد")
    }

    const setForm = await FileModel.findByIdAndUpdate(id,{
        $set:{
            form:req.body
        }
    })
    if (!setForm) return errorResponse(res,4)

    return res.send(setForm)
}
