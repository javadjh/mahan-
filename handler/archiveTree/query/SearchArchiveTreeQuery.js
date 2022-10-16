const ArchiveTreeModel = require("../../../model/ArchiveTree");
const UserModel = require("../../../model/UserModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
module.exports.searchArchiveTree = async (req,res)=>{
    const {searchValue} = req.query

    if(searchValue.length<=0){
        return res.send([])
    }
    //فقط بایگانی هایی که داره رو نشون میده
    const usersArchives = await UserModel.findById(req.user.userId).populate("role")
    let listArchives = []
    usersArchives.role.map(r=>{
        listArchives.push(r.archiveId)
    })
    if(listArchives.length<=0) {
        await insertLog(req,"جستجو در درخت",`این کاربر به بایگانی درخواست داده است که به آن دسترسی ندارد`,false,"بایگانی")
        return errorResponse(res,"شما به هیچ بایگانی دسترسی ندارید")
    }

    const trees = await ArchiveTreeModel.find({
        route:{$regex: searchValue, $options: 'i'},
        archive:{
            $in:listArchives
        },
        isActive:true
    }).populate("archive","isFormRequired title description availablePattern firstStringOfPattern")
        .populate("creator","firstName lastName userName").limit(10)

    // await insertLog(req,"جستجو در درخت",`این کاربر موفق به جست و جو در بایگانی ها شده است`,true,"بایگانی")

    return res.send(trees)


}
