const UserModel = require("../../../model/UserModel");
const mv = require('mv');
const fs = require('fs')
const pathLib = require('path');

/*
تغییر عکس پروفایل کاربر -  فایل ارسال می شود و نام فایل ذخیره شده در سرور در دیتابیس دخیره می شود
در سرور پوشه ای با ای دی کاربر ساخته می شود که در آن عکس پروفایل وجود دارد
*/
module.exports.setProfileImage = async (req,res)=>{

    let {path,filename} = req.file

    const user = await UserModel.findByIdAndUpdate(req.user.userId,{$set:{profileImage:filename}})

    let newPath = "uploads\\\\" + user._id

    const isExist = await fs.existsSync(newPath);

    if(!isExist){
        fs.mkdirSync(newPath)
    }

    mv(path, newPath + "/" + filename , function(err) {
        if(err)
            console.log(err)
    });

    return res.send(true)
}
