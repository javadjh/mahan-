import axiosConfig from "./axiosConfig";
import config from "./config.json";


//دریافت سمت سازمانی
export const getApplicantsService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.applicants}`)
}



//ثبت مورد جدید در سمت سازمانی
export const insertApplicantService=(applicant)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertApplicant}`,applicant)
}




//حذف موردی در سمت سازمانی
export const deleteApplicantService=(id)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.applicants}/${id}`)
}
