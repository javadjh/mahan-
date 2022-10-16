export const AdminDashboardReducer = (state={
    totalDocuments:0,
    totalLibrariesDocument:0,
    totalTodayDocuments:0,
    last7DayDocuments:0,
    last30DayDocuments:0,
    totalSize:0,
    totalTodaySize:0,
    total7DaySize:0,
    total30DaySize:0,
    makhtomeCount:0,
    nimeJari:0,
    jari:0,
    fileTodayCount:0,

    fileType:[],
    fileUpload7DaysAgo:[],
    lastFileName:[],
    archives:[],
},action)=>{
    switch (action.type){
        case "INIT_ADMIN_DASHBOARD":
            return {...action.payload}
        default:
            return state
    }
}
