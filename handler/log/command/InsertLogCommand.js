const LogModel = require("../../../model/LogModel");
module.exports.insertLog = async (req,title,description,isSuccess,department,fileId=undefined)=>{
    await new LogModel({
        title,
        description,
        creator:req.user?req.user.userId:null,
        ip:req.ip,
        isSuccess,
        method:req.method,
        department,
        fileId
    }).save()
     return true
}
