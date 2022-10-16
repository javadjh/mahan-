export const ArchiveTreesFilesReducer = (state={
    pageId:1,
    eachPerPage:12,
    searchValue:"",
    files:[]
},action)=>{
    switch (action.type){
        case "INIT_ARCHIVE_TREES_FILES":
            return {...action.payload}
        default:
            return state
    }
}
