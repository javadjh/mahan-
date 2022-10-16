export const FileLogsReducer = (state={
    pageId:0,
    eachPerPage:12,
    searchValue:"",
    total:0,
    logs:[]
},action)=>{
    switch (action.type){
        case "INIT_FILE_LOGS":
            return {...action.payload}
        default:
            return state
    }
}
