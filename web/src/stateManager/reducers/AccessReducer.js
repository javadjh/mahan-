export const AccessReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_ACCESS":
            return [...action.payload]
        default:
            return state
    }
}
