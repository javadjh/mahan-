import axiosConfig from "./axiosConfig";
import config from "./config.json";


//دریافت فایل سند در کازیو
export const getLibrariesDocumentsFileService=(id)=>{
    return axiosConfig.get(`${config.baseUrl}${config.libraryDocument}${id}`,{
        responseType:"blob"
    })
}


//حذف سندی که داخل کازیو میباشد
export const deleteLibrariesDocumentService=(id,libraryShelfId)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.libraryDocument}${id}/${libraryShelfId}`)
}



//دریافت کتابخانه (اسناد بدون پرونده)
export const getLibraryService=()=>{
    return axiosConfig.get(`${config.baseUrl}${config.getLibrary}`)
}




//افزودن قفسه در کازیو
export const insertLibraryShelfService=(libraryShelf)=>{
    return axiosConfig.post(`${config.baseUrl}${config.insertLibraryShelf}`,libraryShelf)
}





//ویرایش قفسه در کازیو
export const updateLibraryShelfService=(libraryShelf,id)=>{
    return axiosConfig.put(`${config.baseUrl}${config.updateLibraryShelf}${id}`,libraryShelf)
}






//حذف پوشه در کازیو
export const deleteLibraryShelfService=(id)=>{
    return axiosConfig.delete(`${config.baseUrl}${config.deleteLibraryShelf}${id}`)
}







//دریافت اسناد یک پوشه در کازیو
export const getLibraryShelfDocumentsService=(id)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getLibraryShelfDocuments}${id}`)
}








//دریافت اسناد یک پوشه در کازیو
export const getDocumentsFilePreviewLibraryService=(id)=>{
    return axiosConfig.get(`${config.baseUrl}${config.getDocumentsFilePreviewLibrary}${id}`,{
        responseType:"blob"
    })
}


//حذف گروهی اسناد انتخاب شده
export const deleteGroupLibrariesDocumentsService=(data)=>{
    return axiosConfig.put(`${config.baseUrl}${config.deleteGroupLibrariesDocuments}`,data)
}



//انتقال سند از روت اصلی به ریشه ها
export const moveDocumentsToLibraryShelfService=(data)=>{
    return axiosConfig.post(`${config.baseUrl}${config.moveDocumentsToLibraryShelf}`,data)
}
