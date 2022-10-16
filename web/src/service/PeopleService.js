import axiosConfig from "./axiosConfig";
import config from "./config.json";


//دریافت اشخاص حقیقی با فیلتر و پیجینگ
export const getPeopleService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getPeople}`,{
        params:filter
    })
}


//افزودن شخص حقیقی جدید
export const insertPersonService=(person)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertPeople}`,person)
}



//ویرایش شخص حقیقی جدید
export const updatePersonService=(id,person)=>{
    return axiosConfig.put(`${config.baseUrl}${config.updatePeople}${id}`,person)
}




//حذف شخص حقیقی
export const deletePersonService=(id)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.deletePeople}${id}`)
}





//ثبت گروهی اشخاص حقیقی با فایل excel
export const insertPeopleFormExcelService=(file)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertPeopleFormExcel}`,file)
}
