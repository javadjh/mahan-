const PersonModel = require("../../../model/PersonModel");
module.exports.getAllPerson = async ()=>{
    return PersonModel.find().sort({createDate:-1}).lean()
}
