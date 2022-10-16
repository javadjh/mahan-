export const UserProfileReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_USER_PROFILE":
            return {...action.payload}
        default:
            return state
    }
}
