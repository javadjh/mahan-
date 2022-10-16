export const LendsReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_LENDS":
            return [...action.payload]
        default:
            return state
    }
}
