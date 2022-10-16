import {
    changeAppSettingLogoService,
    getAppInfoService,
    getAppSettingService,
    updateAppSettingService
} from "../../service/AppSettingService";
import {doneToast} from "../../utility/ShowToast";


//دریافت اطلاعات پایه سامانه
export const getAppSettingAction = ()=>{
    return async (dispatch)=>{
        const {status,data} = await getAppSettingService()
        if(status===200){
            await dispatch({type:"INIT_APP_SETTING",payload:data})
        }
    }
}



//آپدیت اطلاعات پایه سامانه
export const updateAppSettingAction = (appSetting)=>{
    return async (dispatch)=>{
        const {status,data} = await updateAppSettingService(appSetting)
        if(status===200){
            doneToast("با موفقیت ثبت شد")
            await dispatch(getAppSettingAction())
        }
    }
}




//آپدیت اطلاعات پایه سامانه
export const getAppInfoAction = ()=>{
    return async (dispatch)=>{
        const {status,data} = await getAppInfoService()
        if(status===200){
            await dispatch({type:"INIT_APP_INFO",payload:data})
        }
    }
}





//آپدیت اطلاعات پایه سامانه
export const changeAppSettingLogoAction = (file)=>{
    return async (dispatch)=>{
        const {status,data} = await changeAppSettingLogoService(file)
        if(status===200){
            await dispatch({type:"INIT_APP_INFO",payload:data})
            doneToast("با موفقیت ثبت شد")
        }
    }
}
