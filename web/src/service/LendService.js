import axiosConfig from "./axiosConfig";
import config from "./config.json";



//دریافت پرونده های استارک گذاری شده ی کاربر
export const getLendsService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getLends}`)
}




//ثبت اشتراک گذاری جدید
export const insertLendService=(lend)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertLend}`,lend)
}
