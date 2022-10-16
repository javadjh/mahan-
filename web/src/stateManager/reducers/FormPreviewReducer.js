export const FormPreviewReducer = (state=[],action)=>{
    switch (action.type){
        case "INIT_FORM_PREVIEW":
            return [...action.payload]
        default:
            return state
    }
}
