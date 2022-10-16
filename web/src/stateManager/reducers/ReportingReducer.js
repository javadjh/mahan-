export const ReportingReducer = (state={
    pageId:1,
    eachPerPage:12,
    files:[]
},action)=>{
    switch (action.type){
        case "INIT_REPORTING":
            return {...action.payload}
        default:
            return state
    }
}
