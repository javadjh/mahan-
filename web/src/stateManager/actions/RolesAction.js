import {deleteRoleService, getAllRolesService, insertRoleService, updateRoleService} from "../../service/RolesService";
import {doneToast} from "../../utility/ShowToast";

//برای دریافت تمامیه دسترسی ها استفاده می شود
export const getAllRolesAction = ()=>{
    return async (dispatch) =>{
        const {data,status} = await getAllRolesService()
        if(status===200){
            await dispatch({type:"INIT_ROLES",payload:data})
        }
    }
}

//برای افزودن نقش جدید استفاده می شود
export const insertRoleAction = (role,history)=>{
    return async () =>{
        const {status} = await insertRoleService(role)
        if(status===200){
            doneToast("با موفقیت ثبت شد")
            history.goBack()
        }
    }
}

//برای ویرایش نقش استفاده می شود
export const updateRoleAction = (id,role,history)=>{
    return async () =>{
        const {status} = await updateRoleService(id,role)
        if(status===200){
            doneToast("با موفقیت ثبت شد")
            history.goBack()
        }
    }
}

//جهت اضافه کردن تک نقش
export const insertSingleRoleAction = (data)=>{
    return async (dispatch) =>{
        await dispatch({type:"INIT_SINGLE_ROLE",payload:data})
    }
}

//برای حذف نقش استفاده می شود
// دقت شود مقدار hasUser چک شود اگر true بود باید دیالوگ نمایش داده شود و لیستی از کاربران نمایش بدهیم
export const deleteRoleAction = (id)=>{
    return async (dispatch) =>{
        const {status,data} = await deleteRoleService(id)
        if(status===200){
            if(data.hasUser){
                await dispatch({type:"INIT_DELETE_ROLE",payload:data})
            }else{
                await dispatch(getAllRolesAction())
                doneToast("با موفقیت حذف شد")
            }
        }
    }
}
export const clearDeleteRoleAction = ()=>{
    return async (dispatch)=>{
        await dispatch({type:"CLEAR_DELETE_ROLE"})
    }
}

