import React, {Fragment, useEffect, useState} from "react";
import {getDocumentsFilePreviewLibraryService} from "../../service/LibraryService";
const ShowFilePreviewLibraryDialog = ({id})=>{
    const [image,setImage] = useState()
    useEffect(()=>{
        console.log(id)
        if(id!==undefined)
            getFile()

    },[id])

    const getFile = async ()=>{

        const {data,status} = await getDocumentsFilePreviewLibraryService(id)
        console.log(data)
        if(status===200){
            const blobUrl = URL.createObjectURL(data)
            console.log(blobUrl)
            setImage(blobUrl)
        }
    }
    return(
        <Fragment>
            <div className="modal fade bs-example-modal-xl" id="showFilePreviewLibraryDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content p-4">
                        <div className={"col-lg-13 text-center"}>
                            <img width={780} src={image}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ShowFilePreviewLibraryDialog
