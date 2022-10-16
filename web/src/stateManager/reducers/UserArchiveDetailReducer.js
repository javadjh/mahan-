export const UserArchiveDetailReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_USER_ARCHIVE_DETAIL":
            return [...action.payload]
        default:
            return state
    }
}
