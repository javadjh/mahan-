export const LegalPeopleReducer = (state={
    pageId:1,
    eachPerPage:12,
    total:0,
    legalPeople:[]
},action)=>{
    switch (action.type){
        case "INIT_LEGAL_PEOPLE":
            return {...action.payload}
        default:
            return state
    }
}
