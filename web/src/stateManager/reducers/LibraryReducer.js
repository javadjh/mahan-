export const LibraryReducer = (state={
    libraryShelf:[],
    library:[]
},action)=>{
    switch (action.type){
        case "INIT_LIBRARY":
            return {...action.payload}
        default:
            return state
    }
}
