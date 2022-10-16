export const FileAlertsReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_FILE_ALERTS":
            return [...action.payload]
        default:
            return state
    }
}
