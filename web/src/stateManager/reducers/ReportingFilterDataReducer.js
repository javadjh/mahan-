export const ReportingFilterDataReducer = (state={
    finalPeople:[],
    finalLegalPeople:[],
    finalApplicant:[]
},action)=>{
    switch (action.type){
        case "INIT_REPORTING_FILTER_DATA":
            return {...action.payload}
        default:
            return state
    }
}
