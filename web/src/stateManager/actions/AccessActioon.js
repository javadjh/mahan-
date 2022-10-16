//ریافت همه دسترسی ها از سرور ( ثابت هستن )
import {getAllAccessService} from "../../service/AccessService";

//دریافت دسترسی ها از سمت سرور
export const getAllAccessAction = (roleId)=>{
    return async (dispatch) =>{
        const {status,data} = await getAllAccessService(roleId)
        if(status===200){
            await dispatch({type:"INIT_ACCESS",payload:data})
        }
    }
}

//ست کردن دسترسی ها به صورت دستی
export const getManualAccessAction = (data)=>{
    return async (dispatch) =>{
        await dispatch({type:"INIT_ACCESS",payload:data})
    }
}
