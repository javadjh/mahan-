const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {errorResponse} = require("../../../utility/ResponseHandler");
const path = require("path");
const readXlsxFile = require("read-excel-file/node");
const PersonModel = require("../../../model/PersonModel");
const LegalPersonModel = require("../../../model/LegalPerson");
const fs = require('fs')
module.exports.insertLegalPeopleFromExcel = async (req,res)=>{
    let {filename} = req.file
    console.log(filename)

    //['مدیریت اشخاص حقوقی']
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dac"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    const pathAddress = path.join(__dirname + "../" + "../" + "../" + "../" + "/config/" + filename)
    readXlsxFile(pathAddress).then( async (rows) => {
        console.log(rows)
        let companyNameIndex
        let ceoIndex
        let registerDateIndex
        let registerCodeIndex
        let telIndex
        let addressIndex
        let dataList = []
        for (let i = 0; i < rows.length; i++) {
            if(i===0){
                let list = rows[0]
                for (let j = 0; j < list.length; j++) {
                    switch (list[j]){
                        case "نام شرکت":
                            companyNameIndex = j
                            break
                        case "مدیر عامل":
                            ceoIndex = j
                            break
                        case "تاریخ ثبت":
                            registerDateIndex = j
                            break
                        case "شماره ثبت":
                            registerCodeIndex = j
                            break
                        case "شماره تماس":
                            telIndex = j
                            break
                        case "آدرس":
                            addressIndex = j
                            break
                    }
                }
            }else{
                let currentList = rows[i]
                let companyName = currentList[companyNameIndex]
                let ceo = currentList[ceoIndex]
                let registerDate = currentList[registerDateIndex]
                let registerCode = currentList[registerCodeIndex]
                let tel = currentList[telIndex]
                let address = currentList[addressIndex]

                dataList.push({
                    companyName,
                    ceo,
                    registerDate,
                    registerCode,
                    tel,
                    address,
                    creator:req.user.userId
                })

            }
        }
        await LegalPersonModel.insertMany(dataList)
        await fs.unlinkSync(pathAddress)
        res.send(dataList)
    })
}