export const SearchFileReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_SEARCH_FILE":
            return [...action.payload]
        default:
            return state
    }
}
