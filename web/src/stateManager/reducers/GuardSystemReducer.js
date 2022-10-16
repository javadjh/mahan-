export const GuardSystemReducer = (state={},action)=>{
    switch (action.type){
        case "GUARD_SYSTEM":
            return {...action.payload}
        default:
            return state
    }
}