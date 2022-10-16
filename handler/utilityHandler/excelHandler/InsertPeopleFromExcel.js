const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {errorResponse} = require("../../../utility/ResponseHandler");
const readXlsxFile = require('read-excel-file/node')
const path = require("path");
const PersonModel = require("../../../model/PersonModel");
const fs = require("fs");
module.exports.insertPeopleFromExcel = async (req,res)=>{

    let {filename} = req.file
    console.log(filename)

    //[مدیریت اشخاص حقیقی]
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dab"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    const pathAddress = path.join(__dirname + "../" + "../" + "../" + "../" + "/config/" + filename)
    readXlsxFile(pathAddress).then( async (rows) => {
        let firstNameIndex
        let lastNameIndex
        let fathersNameIndex
        let idCodeIndex
        let birthdayIndex
        let melliCodeIndex
        let genderIndex
        let dataList = []
        for (let i = 0; i < rows.length; i++) {
            if(i===0){
                let list = rows[0]
                for (let j = 0; j < list.length; j++) {
                    switch (list[j]){
                        case "نام":
                            firstNameIndex = j
                            break
                        case "نام خانوادگی":
                            lastNameIndex = j
                            break
                        case "پدر":
                            fathersNameIndex = j
                            break
                        case "شماره شناسنامه":
                            idCodeIndex = j
                            break
                        case "شماره ملی":
                            melliCodeIndex = j
                            break
                        case "جنسیت":
                            genderIndex = j
                            break
                        case "تاریخ تولد":
                            birthdayIndex = j
                            break
                    }

                }
            }else{
                let currentList = rows[i]
                let firstName=currentList[firstNameIndex]
                let lastName=currentList[lastNameIndex]
                let fathersName=currentList[fathersNameIndex]
                let idCode=currentList[idCodeIndex]
                let birthday=currentList[birthdayIndex]
                let melliCode=currentList[melliCodeIndex]
                let gender=currentList[genderIndex]==="آقا"?"man":"woman"

                dataList.push({
                    firstName,
                    lastName,
                    fathersName,
                    idCode,
                    birthday,
                    melliCode,
                    gender,
                    creator:req.user.userId
                })

            }
        }
        await PersonModel.insertMany(dataList)
        await fs.unlinkSync(pathAddress)
        res.send(dataList)
    })
}