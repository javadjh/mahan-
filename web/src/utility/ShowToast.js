import {toast} from "react-toastify";

export const doneToast = (message)=>{
    toast.success(message,{
        closeOnClick:true
    })
}
export const errorToast = (message)=>{
    toast.error(message,{
        closeOnClick:true
    })
}
export const infoToast = (message)=>{
    toast.info(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
