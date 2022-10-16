//دریافت همه فرم ها
import {
    deleteFormService,
    getAllFormsService,
    getFormPreviewService,
    insertFormService,
    updateFormService
} from "../../service/FormService";
import {doneToast} from "../../utility/ShowToast";

export const getAllFormsAction = ()=>{
    return async (dispatch)=>{
        const {data,status} = await getAllFormsService()
        if(status===200){
            await dispatch({type:"INIT_FORMS",payload:data})
        }
    }
}

//برای ارسال راحت تر اطلاعات از context به کامپونتت ها
export const setFormEventAction = (data)=>{
    console.log(data)
    return async (dispatch)=>{
        await dispatch({type:"INIT_FORM_EVENT",payload:data})
    }
}


//ثبت فرم جدید
export const insertFormAction = (form,history)=>{
    return async (dispatch)=>{
        const {data,status} = await insertFormService(form)
        if(status===200){
            doneToast("با موفقیت ثبت شد")
            await dispatch(setFormEventAction({
                children:[]
            }))
            history.goBack()
        }
    }
}



//حذف فرم
export const deleteFormAction = (id)=>{
    return async (dispatch)=>{
        const {data,status} = await deleteFormService(id)
        if(status===200){
            doneToast("با موفقیت حذف شد")
            await dispatch(getAllFormsAction())
        }
    }
}



//ثبت فرم جدید
export const updateFormAction = (id,form,history)=>{
    return async (dispatch)=>{
        const {data,status} = await updateFormService(id,form)
        if(status===200){
            doneToast("با موفقیت بروز شد")
            await dispatch(setFormEventAction({
                children:[]
            }))
            history.goBack()
        }
    }
}


//ست کردن پیش نمایش فرم به صورت دستی
export const setManualFormPreviewAction = (childrenList)=>{
    return async (dispatch)=>{
        await dispatch({type:"INIT_FORM_PREVIEW",payload:childrenList})
    }
}



//ست کردن پیش نمایش فرم از سرور
export const getFormPreviewAction = (id)=>{
    return async (dispatch)=>{
        const {data,status} = await getFormPreviewService(id)
        if(status===200){
            await dispatch({type:"INIT_FORM_PREVIEW",payload:data})
        }
    }
}
