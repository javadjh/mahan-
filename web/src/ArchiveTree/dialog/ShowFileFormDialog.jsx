import React, {Fragment, useEffect} from "react";
import LibrariesDocumentsComponent from "../../Library/LibrariesDocumentsComponent";
import UpsertArchivesFormDialog from "./UpsertArchivesFormDialog";
import ElementsContextProvider from "../../Form/Elements/ElementsContextProvider";
const ShowFileFormDialog = ({childrenListInput=[],fileId,isPreview})=>{
    useEffect(()=>{
        console.log(childrenListInput)
    },[childrenListInput])
    return(
        <Fragment>

            <div className="modal fade" id="showFileFormDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg " role="document">
                    <div className="modal-content p-4">
                        <div className={"card card-body px-4"}>
                            <ElementsContextProvider fileId={fileId} childrenListInput={childrenListInput}>
                                <UpsertArchivesFormDialog isPreview={isPreview}/>
                            </ElementsContextProvider>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ShowFileFormDialog
