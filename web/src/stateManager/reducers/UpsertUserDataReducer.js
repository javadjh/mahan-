export const UpsertUserDataReducer = (state={roles:[],archives:[]},action)=>{
    switch (action.type){
        case "INIT_UPSERT_USER_DATA":
            return {...action.payload}
        default:
            return state
    }
}
