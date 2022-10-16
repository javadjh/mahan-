export const ArchivesSupervisorsReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_ARCHIVES_SUPERVISORS":
            return [...action.payload]
        default:
            return state
    }
}
