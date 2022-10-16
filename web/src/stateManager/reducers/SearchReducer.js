export const SearchReducer = (state={
    files:[],
    documents:[]
}, action)=>{
    switch (action.type){
        case "INIT_FILES":
            return {...action.payload}
        default:
            return state
    }
}
