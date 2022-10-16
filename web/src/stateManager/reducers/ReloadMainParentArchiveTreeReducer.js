export const ReloadMainParentArchiveTreeReducer = (state={},action)=>{
    switch (action.type){
        case "INIT_RELOAD_MAIN_PARENT_ARCHIVE_TREE":
            return {...action.payload}
        default:
            return state
    }
}
