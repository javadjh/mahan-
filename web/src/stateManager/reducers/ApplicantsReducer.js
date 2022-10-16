export const ApplicantsReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_APPLICANTS":
            return [...action.payload]
        default:
            return state
    }
}
