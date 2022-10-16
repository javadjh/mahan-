export const FileFormReducer = (state={
    form:{},
    filesForm:[]
}, action)=>{
    switch (action.type){
        case "INIT_FILE_FORM":
            return {...action.payload}
        default:
            return state
    }
}
