export const SearchArchivesTreesReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_SEARCH_ARCHIVES_TREES":
            return [...action.payload]
        default:
            return state
    }
}
