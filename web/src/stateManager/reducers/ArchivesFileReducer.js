export const ArchivesFileReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_ARCHIVES_FILE":
            return [...action.payload]
        default:
            return state
    }
}
