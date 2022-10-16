export const DeActivateDocumentsReducer = (state={
    pageId:1,
    eachPerPage:12,
    total:0,
    documents:[]
},action)=>{
    switch (action.type){
        case "INIT_DEACTIVATE_DOCUMENTS":
            return {...action.payload}
        default:
            return state
    }
}
