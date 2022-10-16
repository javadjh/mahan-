export const ArchivesReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_ARCHIVES":
            return [...action.payload]
        default:
            return state
    }
}
