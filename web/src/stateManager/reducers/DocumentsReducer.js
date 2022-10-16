export const DocumentsReducer = (state={
    pageId:1,
    eachPerPage:12,
    total:0,
    documents:[],
    searchValue:""
},action)=>{
    switch (action.type){
        case "INIT_DOCUMENTS":
            return {...action.payload}
        default:
            return state
    }
}
