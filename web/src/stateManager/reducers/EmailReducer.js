export const EmailReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_EMAIL":
            return {...action.payload}
        default:
            return state
    }
}
