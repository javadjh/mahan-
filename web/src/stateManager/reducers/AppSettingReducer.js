export const AppSettingReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_APP_SETTING":
            return {...action.payload}
        default:
            return state
    }
}
