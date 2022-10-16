export const FileReducer = (state={
    archiveTreeId:{
        archive:{
            isFormRequired:false
        }
    },
    mainArchiveTreeId:{
        isFormRequired:false
    }
},action) => {
    switch (action.type){
        case "INIT_FILE":
            return {...action.payload}
        default:
            return state
    }
}
