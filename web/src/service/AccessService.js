import axiosConfig from "./axiosConfig";
import config from "./config.json";

//دریافت لیست دسترسی ها
export const getAllAccessService=(roleId)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getAllAccess}${roleId}`)
}
