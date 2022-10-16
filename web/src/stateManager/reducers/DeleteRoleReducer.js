export const DeleteRoleReducer = (state={
    hasUser:false,
    usersRole:[]
},action)=>{
    switch (action.type){
        case "INIT_DELETE_ROLE":
            return {...action.payload}
        case "CLEAR_DELETE_ROLE":
            return {
                hasUser:false,
                usersRole:[]
            }
        default:
            return state
    }
}
