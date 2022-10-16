import axiosConfig from "./axiosConfig";
import config from "./config.json";

//ثبت هشدار برای پرونده
export const insertFileAlertService=(fileAlert)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertFileAlert}`,fileAlert)
}


//برای دریافت هشدار های یک پرونده
export const fileAlertsService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.fileAlerts}`,{
        params:filter
    })
}

