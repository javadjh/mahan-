import axiosConfig from "./axiosConfig";
import config from "./config.json";



//دریافت لیست تاریخچه یک پرونده
export const getFileLogsService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getFileLogs}`,{
        params:filter
    })
}




//دریافت تاریخچه تغییرات سامانه
export const getLogsService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getLogs}`,{
        params:filter
    })
}





//دریافت تاریخچه تغییرات سامانه
export const getLogsFileService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getLogsFile}`,{
        params:filter,
        responseType:"blob"
    })
}
