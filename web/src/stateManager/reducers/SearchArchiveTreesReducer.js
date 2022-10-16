export const SearchArchiveTreesReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_SEARCH_ARCHIVE_TREES":
            return [...action.payload]
        default:
            return state
    }
}
