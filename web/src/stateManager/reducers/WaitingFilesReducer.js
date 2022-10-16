export const WaitingFilesReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_WAITING_FILES":
            return [...action.payload]
        default:
            return state
    }
}
