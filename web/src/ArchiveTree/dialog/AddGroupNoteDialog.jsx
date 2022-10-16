import React, {Fragment, useState} from 'react'
const AddGroupNoteDialog = ({setGroupNoteHandle})=>{
    const [description,setDescription] = useState()
    return(
        <Fragment>
            <div className="modal fade" id="addGroupNoteDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div className={"text-center"}>
                            <h4>ثبت یادداشت گروهی</h4>
                            <textarea id="txtFirstNameBilling"
                                      rows={3}
                                   type="text"
                                   value={description}
                                   onChange={(e)=>{
                                       setDescription(e.target.value)
                                   }}
                                   placeholder={"توضیحات اسناد را وارد کنید..."}
                                   className="form-control col-lg-12"/>
                            <button type="button"
                                    onClick={()=>{
                                        setGroupNoteHandle(description)
                                        setDescription('')
                                    }}
                                    className="btn btn-primary btn-lg btn-block waves-effect waves-light mb-1 mt-2">ثبت</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AddGroupNoteDialog
