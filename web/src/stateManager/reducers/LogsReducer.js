export const LogsReducer = (state={
    pageId:0,
    eachPerPage:40,
    logs:[]
},action)=>{
    switch (action.type){
        case "INIT_LOGS":
            return {...action.payload}
        default:
            return state
    }
}
