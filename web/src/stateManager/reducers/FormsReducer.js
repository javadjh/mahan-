export const FormsReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_FORMS":
            return [...action.payload]
        default:
            return state
    }
}
