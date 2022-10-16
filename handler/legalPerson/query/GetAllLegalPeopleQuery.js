const LegalPersonModel = require("../../../model/LegalPerson");
module.exports.getAllLegalPeople = async ()=>{
    return LegalPersonModel.find().sort({createDate:-1}).lean()
}
