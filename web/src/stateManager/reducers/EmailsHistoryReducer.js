export const EmailsHistoryReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_EMAILS_HISTORY":
            return [...action.payload]
        default:
            return state
    }
}
