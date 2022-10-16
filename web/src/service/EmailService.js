import axiosConfig from "./axiosConfig";
import config from "./config.json";


//افزودن اشتراک گذاری با ایمیل
export const insertEmailService=(email)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertEmail}`,email)
}



//دریافت تاریخچه ایمیل های ارسال شده در پرونده
export const getEmailsHistoryService=(id)=>{
    return axiosConfig.get(`${config.baseUrl}${config.emailsHistory}${id}`)
}




//دریافت اطلاعات یک ایمیل
export const getEmailService=(filter)=>{
    console.log(filter)
    return axiosConfig.get(`${config.baseUrl}${config.getEmail}`,{
        params:filter
    })
}





//دریافت فایل سند با استفاده از ای دی ایمیل و ای دی سند(برای ایمیل استفاده می شود)
export const getDocumentsFileEmailService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getDocumentsFileEmail}`,{
        responseType:"blob",
        params:filter
    })
}






//جهت ویرایش ایمیل ارسال شده استفاده می شود (شامل ای دی ایمیل و تاریخ انقضا و کاربران و سند)
export const updateEmailService=(emailId,data)=>{
    return axiosConfig.put(`${config.baseUrl}${config.updateEmail}${emailId}`,data)
}
