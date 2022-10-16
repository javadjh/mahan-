const moment = require('jalali-moment')
const LogModel = require("../../../model/LogModel");

module.exports.getLogsHandler = async (filterData)=>{
    let {pageId,eachPerPage,method,searchValue,users} = filterData
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)
    let filter = {
        method:new RegExp(method),
        $or:[
            {title:{$regex: searchValue, $options: 'i'}},
            {description:{$regex: searchValue, $options: 'i'}},
            {department:{$regex: searchValue, $options: 'i'}},
            {ip:{$regex: searchValue, $options: 'i'}},
            {"creator.firstName":{$regex: searchValue, $options: 'i'}},
            {"creator.lastName":{$regex: searchValue, $options: 'i'}},
            {"fileId.title":{$regex: searchValue, $options: 'i'}},
        ],
        "creator":{
            $ne:"626451c2ce31af260c2238be"
        }
    }
    if(users){
        filter.creator = {
            $in:users
        }
    }
    const logs = await LogModel.find(filter)
        .populate("creator","firstName lastName")
        .populate("fileId" , "title").sort({date:-1}).skip((pageId-1)*eachPerPage).limit(eachPerPage).lean()
    const total = await LogModel.find(filter).count()

    logs.map(l=>{
        l.date = moment(l.date, 'YYYY/MM/DD HH:mm').locale('fa').format('YYYY/MM/DD HH:mm')
    })

    return {logs,total}
}
