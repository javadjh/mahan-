import axiosConfig from "./axiosConfig";
import config from "./config.json";
import axios from "axios";


//دریافت همه کاربران
export const getAllUsersService=(searchValue)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getAllUsers}`,{
        params:searchValue
    })
}

//دریافت اطلاعات صفحه برای ثبت کاربر جدید
export const upsertUserDataService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.upsertUserData}`)
}

//برای ثبت کاربر جدید
export const insertUserService=(user)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertUser}`,user)
}


//ویرایش کاربر
export const updateUserService=(id,user)=>{
    return axiosConfig.put(`${config.baseUrl}${config.updateUser}${id}`,user)
}

//برای حذف کاربر
export const deleteUserService=(userId)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.deleteUser}${userId}`)
}


//دریافت بایگانی های کاربر
export const getUsersArchivesService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getUsersArchivesUser}`)
}



//جهتا ورود کاربر به ناحیه کاربری مورد استفاده قرار میگرد
export const loginService=(user)=>{
    return axiosConfig.post(`${config.baseUrl}${config.userLogin}`,user)

}




//دریافت کاربران برای اتومامپلیت
export const usersAutocompleteService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.usersAutocomplete}`)

}


//دریافت هشدار های پرونده هایی که به بایگانی هاشون دسترسی داره
export const getUsersFileAlertsService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getUsersFileAlerts}`)
}


//فراموشی رمز عبور کاربر با استفاده از email,userName صورت میگیرد
export const userForgetPasswordService=(data)=>{
    return axiosConfig.post(`${config.baseUrl}${config.userForgetPassword}`,data)
}



//دریافت پروفایل کاربر
export const usersProfileService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.usersProfile}`)
}




//تغییر کلمه عبور ورودی ها(newPassword,oldPassword)
export const changePasswordService=(passwordData)=>{
    return axiosConfig.put(`${config.baseUrl}${config.changePassword}`,passwordData)
}





//جهت ویرایش پروفایل کاربر از این ماژول استفاده می شود
export const updateProfileService=(profile)=>{
    return axiosConfig.put(`${config.baseUrl}${config.updateProfile}`,profile)
}




//جهت ویرایش پروفایل کاربر از این ماژول استفاده می شود
export const getArchivesSupervisorsService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getArchivesSupervisors}`)
}




//دریافت داشبورد مدیریت
export const getAdminDashboardService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getAdminDashboard}`)
}



//چک کردن توکن کاربر
export const checkUsersTokenService=()=>{
    try {
        return axios.get(`${config.baseUrl}${config.checkUsersToken}`,{
            headers:{
                'Content-Type':"application/json",
                "token":localStorage.getItem("token")
            }
        })
    }catch (err){
        console.log("err")
        console.log(err)
    }
}


//دریافت داشبورد مدیریت
export const setUsersProfileImageService=(image)=>{
    return axiosConfig.post(`${config.baseUrl}${config.setUsersProfileImage}`,image)
}



//تغییر کلمه عبور
export const changeUsersPasswordAdminService=(id)=>{
    return axiosConfig.put(`${config.baseUrl}${config.changeUsersPasswordAdmin}${id}`)
}




//دریافت هشدار های کاربر
export const getUsersFilesAlertsService=(filter)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getUsersFilesAlerts}`,{
        params:filter
    })
}




//دریافت کاربران ناظر در سامانه
export const getSupervisorsService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getSupervisors}`)
}
