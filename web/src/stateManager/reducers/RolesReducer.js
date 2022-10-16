export const RolesReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_ROLES":
            return [...action.payload]
        default:
            return state
    }
}
