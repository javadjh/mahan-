const moment = require('jalali-moment')
const FileModel = require("../model/FileModel");

module.exports.generateFileCode = async (firstPart)=>{
    console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    //date
    let today = new Date()
    today = moment(today, 'YYYY/MM/DD').locale('fa').format('YYYYMMDD')

    //counter
    const lastItemOfType = await FileModel.findOne({
        fileCode:{$regex: firstPart + "-" + today, $options: 'i'}
    }).sort({createDate:-1})

    console.log(lastItemOfType)

    if(!lastItemOfType){
        console.log(firstPart + "-" + today + "001")
        return firstPart + "-" + today + "001"
    }else{
        const totalIndex = lastItemOfType.fileCode.length
        let number = Number(lastItemOfType.fileCode.substr(totalIndex-3,totalIndex-1))

        number++

        const counter = padLeadingZeros(number,3)
        console.log(firstPart + "-" + today + counter)
        return firstPart + "-" + today + counter
    }



}
const padLeadingZeros = (num, size)=> {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
