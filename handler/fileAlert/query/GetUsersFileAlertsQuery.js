/*
ارسال هشدار های بایگانی هایی که کاربر دسترسی ویرایش پرونده را دارد
نیاز به استفاده از roleGuard نداره
*/
const UserModel = require("../../../model/UserModel");
const FileAlertModel = require("../../../model/FileAlertModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
module.exports.getUsersFileAlerts = async (req,res)=>{

    let userId = req.user.userId

    const user = await UserModel.findById(userId).populate("role.roleId").populate("role.roleId.accessList").lean()

    //شروع دریافت هشدار های پرونده
    //بایگانی هایی که کاربر نقش ویرایش پرونده را دارد
    let archivesList = []
    user.role.map(r=>{
        r.roleId.accessList.map(a=>{
            if(a=="61e3caf7d6d14316ac387bbe"){
                archivesList.push(r.archiveId)
            }
        })
    })

    const fileAlerts = await FileAlertModel.find({
        archiveId:{$in:archivesList},
        isActive:true,
        $or:[
            {alertDate:null},
            {alertDate:{$gt: new Date(Date.now()),}},
        ],
        $or:[
            {alertDate: {$gte: new Date(Date.now()),},},
            {alertDate:null}
        ]
    })
        .populate("fileId")
        .populate("creator","firstName lastName")
        .populate("archiveId","isFormRequired")
        .limit(6)
        .sort({createDate:-1})
        .lean()

    fileAlerts.map(f=>{
        if(f.alertDate)
            f.alertDate = convertToShamsi(f.alertDate)
        f.createDate = convertToShamsi(f.createDate)
    })

    res.send(fileAlerts)
}
