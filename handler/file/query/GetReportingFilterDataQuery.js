const PersonModel = require("../../../model/PersonModel");
const LegalPersonModel = require("../../../model/LegalPerson");
const ApplicantModel = require("../../../model/ApplicantModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");

/*
ارسال اطلاعات مورد نیاز برای فیلتر کردن در بخش گزارش ها
*/
module.exports.getReportingFilterData = async (req,res)=>{

    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bc6"],req.user.userId)
    if(archiveIds.length===0)
        return errorResponse(res,6)

    //اشخاص حقیقی
    const people = await PersonModel.find({isActive:true}).sort({createDate:-1}).select("firstName lastName")
    let finalPeople = []
    people.map(p=>{
        finalPeople.push({
            label:`${p.firstName} ${p.lastName}`,
            value:p._id
        })
    })
    //اشخاص حقوقی
    const legalPeople = await LegalPersonModel.find({isActive:true}).sort({createDate:-1}).select("companyName")
    let finalLegalPeople = []
    legalPeople.map(l=>{
        finalLegalPeople.push({
            label:l.companyName,
            value:l._id
        })
    })
    //سمت های سازمانی
    const applicant = await ApplicantModel.find().sort({createDate:-1})
    const finalApplicant = []
    applicant.map(a=>{
        finalApplicant.push({
            label:a.title,
            value:a._id
        })
    })

    return res.send({
        people:finalPeople,
        legalPeople:finalLegalPeople,
        applicant:finalApplicant
    })
}
