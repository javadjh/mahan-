import axiosConfig from "./axiosConfig";
import config from "./config.json";


//دریافت همه بایگانی ها
export const getAllArchivesService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getAllArchives}`)
}



//افزودن بایگانی جدید
export const insertArchiveService=(archive)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertArchive}`,archive)
}



//ویرایش بایگانی
export const updateArchiveService=(id,archive)=>{
    return axiosConfig.put(`${config.baseUrl}${config.updateArchive}${id}`,archive)
}




//حذف بایگانی
export const deleteArchiveService=(id)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.deleteArchive}${id}`)
}




//دریافت مشخصات یک بایگانی(برای افزودن اطلاعات تکمیلی یک بایگانی استفاده می شود)
export const getSingleArchiveService=(id)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getSingleArchive}${id}`)
}




//تکمیل اطلاعات بایگانی
export const insertMoreSettingArchiveService=(id,info)=>{
    return axiosConfig.put(`${config.baseUrl}${config.insertMoteSettingArchive}${id}`,info)
}




//دریافت بایگانی با اطلاعات تکمیلی
export const getArchivesDetailService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.archivesDetail}`)
}


//دریافت بایگانی با اطلاعات تکمیلی
export const getGuardSystemService=(id)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getGuardSystem}${id}`)
}



//دریافت بایگانی با اطلاعات تکمیلی
export const setArchiveGuardSystemService=(guardSystem)=>{
    return axiosConfig.post(`${config.baseUrl}${config.setArchiveGuardSystem}`,guardSystem)
}




//دریافت پرونده های ناظر مربوطه
export const getArchivesFilesGuardSystemService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getArchivesFilesGuardSystem}`,{
        params:filter
    })
}
