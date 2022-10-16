export const ArchiveStateReducer = (state={},action)=>{
    switch (action.type){
        case "SET_ARCHIVE_STATE":
            return {...action.payload}
        default:
            return state
    }
}
