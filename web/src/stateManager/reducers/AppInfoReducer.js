export const AppInfoReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_APP_INFO":
            return {...action.payload}
        default:
            return state
    }
}