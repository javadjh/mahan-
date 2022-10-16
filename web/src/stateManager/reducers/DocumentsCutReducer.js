export const DocumentsCutReducer = (state={
    origin:undefined,
    documents:[]
},action)=>{
    switch (action.type){
        case "INIT_DOCUMENTS_CUT":
            return {...action.payload}
        default:
            return state
    }
}
