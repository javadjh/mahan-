export const DocumentReducer = (state={
    versions:[],
    document:{}
},action)=>{
    switch (action.type){
        case "INIT_DOCUMENT":
            return {...action.payload}
        default:
            return state
    }
}
