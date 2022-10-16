export const FilesAlertsReducer = (state={
    pageId:1,
    eachPerPage:12,
    searchValue:"",
    total:0,
    filesAlerts:[]
},action)=>{
    switch (action.type){
        case "INIT_FILES_ALERTS":
            return {...action.payload}
        default:
            return state
    }
}
