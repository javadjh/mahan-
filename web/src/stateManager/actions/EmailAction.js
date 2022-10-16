import {
    getEmailService,
    getEmailsHistoryService,
    insertEmailService,
    updateEmailService
} from "../../service/EmailService";
import {doneToast} from "../../utility/ShowToast";

//ارسال ایمیل جدید
export const insertEmailAction = (email,fileId)=>{
    return async (dispatch)=>{
        const {data,status} = await insertEmailService(email)

        if(status===200){
            doneToast("با موفقیت ثبت شد")
            window.$('#upsertEmailDialog').modal('hide')
            await dispatch(getEmailsHistoryAction(fileId))
        }
    }
}

//دریافت تاریحچه ایمیل های یک پرونده
export const getEmailsHistoryAction = (fileId)=>{
    return async (dispatch)=>{
        const {data,status} = await getEmailsHistoryService(fileId)
        if(status===200){
            await dispatch({type:"INIT_EMAILS_HISTORY",payload:data})
        }
    }
}


//دریافت اطلاعات یک ایمیل
export const getEmailAction = (filter)=>{
    return async (dispatch)=>{
        const {data,status} = await getEmailService(filter)
        if(status===200){
            await dispatch({type:"INIT_EMAIL",payload:data})
        }
    }
}



//جهت ویرایش ایمیل ارسال شده استفاده می شود (شامل ای دی ایمیل و تاریخ انقضا و کاربران و سند)
export const updateEmailAction = (emailId,emailData,fileId)=>{
    return async (dispatch)=>{
        const {data,status} = await updateEmailService(emailId,emailData)
        if(status===200){
            doneToast("با موفقیت بروز شد")
            window.$('#upsertEmailDialog').modal('hide')
            await dispatch(getEmailsHistoryAction(fileId))
        }
    }
}
