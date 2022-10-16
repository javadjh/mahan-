import axiosConfig from "./axiosConfig";
import config from "./config.json";


/*
دریافت درخت
isMain va mainParent
گزینه هایی هست که ارسال میکنیم
isMain:
    برای دریافت روت اصلی بایگانی هست
mainParent:
    برای دریافت قفسه های روت اصلی میباشد (بینهایت)

استثنا در این route هست اونم اینه که از redux استفاده نشده
*/
export const getArchiveTreesService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getArchiveTrees}`,{
        params:filter
    })
}

//جهت افزودن یک درخت استفاده می شود
export const insertArchiveTreeService = (archiveTree)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertArchiveTrees}`,archiveTree)
}

//جهت ویرایش نام یک درخت استفاده می شود
export const changeArchiveTreesNameService = (id,archiveTreesTitle)=>{
    return axiosConfig.put(`${config.baseUrl}${config.changeArchiveTreesName}${id}`,archiveTreesTitle)
}

//جست و جو در درخت
export const searchArchiveTreesService=(searchValue)=>{
    return axiosConfig.get(`${config.baseUrl}${config.searchArchiveTrees}`,{
        params:searchValue
    })
}


//ویرایش تنظیمات درخت
export const settingArchiveTreesService=(id,setting)=>{
    return axiosConfig.put(`${config.baseUrl}${config.settingArchiveTrees}${id}`,setting)
}



//حذف درخت (اگر پرونده نداشت)
export const deleteArchiveTreeService=(id)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.deleteArchiveTree}${id}`)
}



//جست و جوی درخت های یک بایگانی
export const searchArchivesTreesService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.searchArchivesTrees}`,{
        params:filter
    })
}




//جست و جوی درخت های یک بایگانی
export const mainArchiveTreesFormService=(archiveTreeId,data)=>{
    return axiosConfig.put(`${config.baseUrl}${config.mainArchiveTreesForm}${archiveTreeId}`,data)
}
