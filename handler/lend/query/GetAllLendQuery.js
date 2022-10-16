const LendModel = require("../../../model/LendModel");
const {roleGuard} = require("../../../authUtilities/Auth");
const _ = require('lodash')
const {convertToShamsi} = require("../../../utility/dateUtility");

/*
دریافت پرونده های اشتراک گذاری شده برای هر کاربر
*/
module.exports.getAllLend = async (req,res)=>{

    const lends = await LendModel.find({
        usersReceiver:{$in:req.user.userId},
        expireDate:{$gt: new Date(Date.now()),},
    }).populate("documentIds fileId").populate("creator","firstName lastName userName position").lean()


    for (let i = 0; i < lends.length; i++) {
        if(!lends[i].fileId.isActive){
            _.pullAt(lends,i)
        }
    }

    lends.map(l=>{
        l.createDate = convertToShamsi(l.createDate)
        l.expireDate = convertToShamsi(l.expireDate)
    })

    return res.send(lends)
}
