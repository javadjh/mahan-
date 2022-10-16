import React, {Fragment, useContext} from "react";
import ImageCropComponent from "../document/imageCroper/ImageCropComponent";
import MP4PlayerComponent from "../document/MP4Player/MP4PlayerComponent";
import LibrariesDocumentsComponent from "../../Library/LibrariesDocumentsComponent";
import {LibraryContext} from "../../Library/LibraryContext";
const ShowLibraryDialog = ()=>{
    const {sendData,selectedDoc} = useContext(LibraryContext)
    return(
        <Fragment>

            <div className="modal fade bs-example-modal-xl" id="showLibraryDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content p-4">
                        <div className={"card card-body px-4"}>
                            <h5 className={"mb-0 mt-3"}>فایل های کازیو</h5>
                            <LibrariesDocumentsComponent isManage={false}/>
                            <div className={"row"}>
                                <div className={"col-lg-9"}></div>
                                <div className={"col-lg-3"}>
                                    <button hidden={selectedDoc.length<=0} className={"btn btn-success mt-2 btn-block"} onClick={sendData}>ثبت اسناد</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ShowLibraryDialog
