export const FormEventReducer = (state={
    children:[],
},action)=>{
    switch (action.type){
        case "INIT_FORM_EVENT":
            return {...action.payload}
        default:
            return state
    }
}
