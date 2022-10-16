

import {deleteApplicantService, getApplicantsService, insertApplicantService} from "../../service/ApplicantService";

//دریافت سمت سازمانی
export const getApplicantsAction = ()=>{
    return async (dispatch)=>{
        const {data,status} = await getApplicantsService()
        if(status===200){
            await dispatch({type:"INIT_APPLICANTS",payload:data})
        }
    }
}


//افزودن مورد به سمت سازمانی
export const insertApplicantAction = (companyChart,setTitle)=>{
    return async (dispatch)=>{
        const {status} = await insertApplicantService(companyChart)
        if(status===200){
            await dispatch(getApplicantsAction())
            window.$('#insertApplicantDialog').modal('hide')
            setTitle('')
        }
    }
}



//حذف مورد به سمت سازمانی
export const deleteApplicantAction = (id)=>{
    return async (dispatch)=>{
        const {status} = await deleteApplicantService(id)
        if(status===200){
            await dispatch(getApplicantsAction())
        }
    }
}
