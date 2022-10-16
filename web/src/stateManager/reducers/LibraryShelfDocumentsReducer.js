export const LibraryShelfDocumentsReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_LIBRARY_SHELF_DOCUMENTS":
            return [...action.payload]
        default:
            return state
    }
}
