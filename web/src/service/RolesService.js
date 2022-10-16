import axiosConfig from "./axiosConfig";
import config from "./config.json";

//برای دریافت تمامی نقش ها استفاده می شود
export const getAllRolesService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getAllRoles}`)
}

//برای افزودن نقش جدید استفاده می شود
export const insertRoleService=(role)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertRole}`,role)
}


//برای ویرایش نقش استفاده می شود
export const updateRoleService=(id,role)=>{
    return axiosConfig.put(`${config.baseUrl}${config.updateRole}${id}`,role)
}



//برای حذف نقش استفاده می شود
// دقت شود مقدار hasUser چک شود اگر true بود باید دیالوگ نمایش داده شود و لیستی از کاربران نمایش بدهیم
export const deleteRoleService=(id)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.deleteRole}${id}`)
}
