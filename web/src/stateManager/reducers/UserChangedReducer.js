export const UserChangedReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_USER_CHANGED":
            return {...action.payload}
        default:
            return state
    }
}