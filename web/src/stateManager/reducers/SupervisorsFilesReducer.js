export const SupervisorsFilesReducer = (state={
    pageId:0,
    eachPerPage:0,
    searchValue:'',
    isConfirm:false,
    isReject:false,
    isWaiting:false,
    files:[]
},action) =>{
    switch (action.type){
        case "INIT_SUPERVISORS_FILES":
            return {...action.payload}
        default:
            return state
    }
}
