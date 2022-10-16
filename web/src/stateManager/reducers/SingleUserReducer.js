export const SingleUserReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_SINGLE_USER":
            return {...action.payload}
        default:
            return state
    }
}
