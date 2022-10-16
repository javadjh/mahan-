export const ArchiveTreesReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_ARCHIVE_TREES":
            return [...action.payload]
        default:
            return state
    }
}
