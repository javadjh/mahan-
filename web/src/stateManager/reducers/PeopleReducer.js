export const PeopleReducer = (state={
    pageId:1,
    eachPerPage:12,
    people:[]
},action)=>{
    switch (action.type){
        case "INIT_PEOPLE":
            return {...action.payload}
        default:
            return state
    }
}
