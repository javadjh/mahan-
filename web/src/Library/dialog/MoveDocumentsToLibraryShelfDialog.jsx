import React, {Fragment, useState} from "react";
import {useSelector} from "react-redux";
const MoveDocumentsToLibraryShelfDialog = ({moveDocumentHandel,destinationId,setDestinationId})=>{
    const library = useSelector(state => state.library)
    return(
        <Fragment>
            <div className="modal fade" id="moveDocumentsToLibraryShelfDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div >
                            <h5>انتقال به پوشه</h5>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="validationCustom04">انتخاب پوشه</label>
                                    <select className="custom-select" onChange={(e)=>{
                                        setDestinationId(e.target.value)
                                    }}>
                                        <option value={``} name={``}>انتخاب کنید</option>
                                        {library.libraryShelf.map(l=>(
                                            <option selected={destinationId===l._id} value={l._id} name={l._id}>{l.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button className={"btn btn-success"} onClick={moveDocumentHandel}>ثبت</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default MoveDocumentsToLibraryShelfDialog