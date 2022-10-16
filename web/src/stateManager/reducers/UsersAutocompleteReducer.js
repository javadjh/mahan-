export const UsersAutocompleteReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_USERS_AUTOCOMPLETE":
            return [...action.payload]
        default:
            return state
    }
}
