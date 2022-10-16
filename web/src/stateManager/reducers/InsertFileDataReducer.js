export const InsertFileDataReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_INSERT_FILE_DATA":
            return {...action.payload}
        default:
            return state
    }
}
