import axiosConfig from "./axiosConfig";
import config from "./config.json";

//دریافت پرونده ها برای ناظر
//ارسالی ها : pageId,eachPerPage,searchValue,isReject,isConfirm,isWaiting
export const getSupervisorsFilesService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getSupervisorsFiles}`,{
        params:filter
    })
}
