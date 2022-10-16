import axios from "axios";
import {errorToast} from "../utility/ShowToast";
import {store} from '../stateManager/Store'


axios.defaults.headers.post['Content-Type']="application/json"
axios.defaults.headers.common['token']=localStorage.getItem("token")
axios.defaults.headers.common['archive']=store.getState().archiveState.archiveId

axios.interceptors.response.use(null,error=>{
    if(error){
        // console.log(error.response.data.error)
        if(error?.response?.data?.error){
            if(error.response.data.error==="نشست شما منقضی شده است"){
                localStorage.clear()
                window.location.reload()
            }else{
                errorToast(error.response.data.error)
            }
        }
    }
    return Promise.reject(error)
})

export default {
    post:axios.post,
    get:axios.get,
    put:axios.put,
    delete:axios.delete
}
