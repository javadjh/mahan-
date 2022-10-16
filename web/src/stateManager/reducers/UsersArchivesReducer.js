export const UsersArchivesReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_USERS_ARCHIVES":
            return [...action.payload]
        default:
            return state
    }
}
