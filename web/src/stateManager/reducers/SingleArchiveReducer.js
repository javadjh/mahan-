export const SingleArchiveReducer = (state={
    archive:{},
    forms:[]
},action)=>{
    switch (action.type){
        case "INIT_SINGLE_ARCHIVE":
            return {...action.payload}
        default:
            return state
    }
}
