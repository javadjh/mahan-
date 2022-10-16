export const SingleRoleReducer = (state={
    accessList:[]
},action)=>{
    switch (action.type){
        case "INIT_SINGLE_ROLE":
            return {...action.payload}
        default:
            return state
    }
}
