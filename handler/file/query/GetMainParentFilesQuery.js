const DocumentModel = require("../../../model/DocumentModel");
const FileModel = require("../../../model/FileModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const UserModel = require("../../../model/UserModel");
module.exports.getMainParentFiles = async (req,res)=>{
    //todo don't forget add guard for this module!!
    let {pageId,eachPerPage,searchValue} = req.query
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)
    const user = await UserModel.findById(req.user.userId).select("role")
    let fileAccess = []
    user.role.map(role=>{
        if(role.archiveId.toString()===req.headers.archive.toString()){
            fileAccess = role.fileAccess
        }
    })
    let filter
    if(req.user.userId.toString()!=="61e3f77540129135ec4d928f" && req.user.userId.toString()!=="626451c2ce31af260c2238be")
        filter = {
            archiveTreeId: req.params.id,
            isActive:true,
            type:{
                $in:fileAccess
            },
            $or:[
                {title:{$regex: searchValue, $options: 'i'}},
                {fileCode:{$regex: searchValue, $options: 'i'}},
                {fileStatus:{$regex: searchValue, $options: 'i'}},
                {keyword:{$regex: searchValue, $options: 'i'}},
                {type:{$regex: searchValue, $options: 'i'}},

            ],
            $or:[
                {$and: [{isConfirm: false}, {creator: req.user.userId}]},
                {isConfirm:true}
            ]
        }
    else
        filter = {
            archiveTreeId: req.params.id,
            isActive:true,
            type:{
                $in:fileAccess
            },
            $or:[
                {title:{$regex: searchValue, $options: 'i'}},
                {fileCode:{$regex: searchValue, $options: 'i'}},
                {fileStatus:{$regex: searchValue, $options: 'i'}},
                {keyword:{$regex: searchValue, $options: 'i'}},
                {type:{$regex: searchValue, $options: 'i'}},

            ]
        }
    const files = await FileModel.find(filter)
        .skip((pageId-1)*eachPerPage)
        .limit(eachPerPage)
        .sort({createDate: -1})
        .select("title type fileStatus fileCode fileDate archiveTreeId")
        .lean()

    const total = await FileModel.find(filter).count()

    files.map(f=>{
        try {
            f.fileDate = convertToShamsi(f.fileDate)
        }catch (err){

        }
    })

    for (let i = 0; i < files.length; i++) {
        files[i].documentCount = await DocumentModel.find({
            fileId:files[i]._id,
            isActive:true,
            isMain:true
        }).count()
    }

    return res.send({
        pageId,
        eachPerPage,
        searchValue,
        total,
        files
    })
}
