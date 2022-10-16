import {getFileLogsService, getLogsService} from "../../service/LogService";

//برای دریافت لاگ های یک پرونده استفاده می شود
export const getFileLogsAction = (filter)=>{
    return async (dispatch)=>{
        const {data,status} = await getFileLogsService(filter)
        if(status===200){
            await dispatch({type:"INIT_FILE_LOGS",payload:data})
        }
    }
}


//دریافت تاریخچه تغییرات سامانه
export const getLogsAction = (filter)=>{
    return async (dispatch)=>{
        const {data,status} = await getLogsService(filter)
        if(status===200){
            await dispatch({type:"INIT_LOGS",payload:data})
        }
    }
}
