const FileModel = require("../../../model/FileModel");
const UserModel = require("../../../model/UserModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
module.exports.searchFile = async (req,res)=>{
    let {searchValue} = req.params

    const user = await UserModel.findById(req.user.userId).lean()
    const usersArchiveList =[]
    user.role.map(r=>{
        usersArchiveList.push(r.archiveId)
    })

    console.log("archives : " , usersArchiveList)

    const files = await FileModel.find({
        isActive:true,
        archiveId:{
            $in:usersArchiveList
        },
        $or:[
            {title:{$regex: searchValue, $options: 'i'}},
        ]
    }).populate("archiveTreeId","route archive createDate").limit(20).lean()


    return res.send(files)
}
