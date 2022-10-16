export const FileStatisticReducer = (state={
    chartEx:[]
},action)=>{
    switch (action.type){
        case "INIT_FILE_STATISTIC":
            return {...action.payload}
        default:
            return state
    }
}
