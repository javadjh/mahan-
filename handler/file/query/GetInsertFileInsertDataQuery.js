/*
دریافت اطلاعات مورد نیاز برای ثبت پرونده
 */
const ApplicantModel = require("../../../model/ApplicantModel");
const {getAllLegalPeople} = require("../../legalPerson/query/GetAllLegalPeopleQuery");
const {getAllPerson} = require("../../person/query/GetAllPersonQuery");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const UserModel = require("../../../model/UserModel");


module.exports.getInsertFileInsertData = async (req, res)=>{
    await roleGuard(["ویرایش پرونده","ناظر"],req,res)

    if(res.statusCode>399)
        return errorResponse(res,6)

    //دریافت اشخاص حقوقی و حقیقی
    const person = await getAllPerson()
    const legalPerson = await getAllLegalPeople()
    const applicantsData = await ApplicantModel.find()

    let people = []
    for (let i = 0; i < person.length; i++) {
        people.push({
            value:person[i]._id,
            personId:person[i]._id,
            type:"person",
            label:person[i].firstName + " " + person[i].lastName + "- (شخص حقیقی) ",
        })
    }
    for (let i = 0; i < legalPerson.length; i++) {
        people.push({
            value:legalPerson[i]._id,
            legalPersonId:legalPerson[i]._id,
            type:"legalPerson",
            label:legalPerson[i].companyName + "- (شخص حقوقی) " ,
        })
    }
    let applicants = []
    for (let i = 0; i < applicantsData.length; i++) {
        applicants.push({
            value:applicantsData[i]._id,
            label:applicantsData[i].title,
        })
    }

    const user = await UserModel.findById(req.user.userId).select("role")
    let fileAccess = []
    user.role.map(role=>{
        if(role.archiveId.toString()===req.headers.archive.toString()){
            fileAccess = role.fileAccess
        }
    })


    return res.send({
        people,
        applicants,
        fileAccess
    })
}
