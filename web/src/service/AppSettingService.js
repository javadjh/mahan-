import axiosConfig from "./axiosConfig";
import config from "./config.json";

//دریافت اطلاعات پایه سامانه
export const getAppSettingService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getAppSetting}`)
}


//ثبت اطلاعات پایه سامانه
export const updateAppSettingService=(appSetting)=>{
    return axiosConfig.post(`${config.baseUrl}${config.updateAppSetting}`,appSetting)
}



//آیا اپلیکیشن فعال شده است
export const appStatusService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.appStatus}`)
}




//اطلاعات کلی و عمومی برنامه شامل ورژن و لوگو
export const getAppInfoService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getAppInfo}`)
}





//ارسال لوگو
export const changeAppSettingLogoService=(file)=>{
    return axiosConfig.post(`${config.baseUrl}${config.changeAppSettingLogo}`,file)
}
