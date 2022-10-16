export const UsersFileAlertsReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_USERS_FILE_ALERTS":
            return [...action.payload]
        default:
            return state
    }
}
