import React, {Fragment, useEffect, useRef, useState} from "react";
import {validatorSP} from "../../utility/formValidator";
import {useDispatch, useSelector} from "react-redux";
import {insertLegalPeopleAction, updateLegalPeopleAction} from "../../stateManager/actions/LegalPeopleAction";
import {insertArchiveAction, updateArchiveAction} from "../../stateManager/actions/ArchiveAction";
const InsertArchiveDialog = ({singleArchive})=>{
    const formValidator = useRef(validatorSP())
    console.table(singleArchive)
    const dispatch = useDispatch()
    const [id,setId] = useState()
    const [title,setTitle] = useState()
    const [description,setDescription] = useState()
    const [,setReloadValidation] = useState()

    const forms = useSelector(state => state.forms)

    useEffect(()=>{
        if(singleArchive._id){
            setId(singleArchive._id)
            setTitle(singleArchive.title)
            setDescription(singleArchive.description)
        }else{
            setId('')
            setTitle('')
            setDescription('')
        }
    },[singleArchive])


    const sendData = async ()=>{
        if(formValidator.current.allValid()){
            const data = {
                title,
                description,
            }
            if(id)
                await dispatch(updateArchiveAction(id,data))
            else
                await dispatch(insertArchiveAction(data))
        }else{
            formValidator.current.showMessages()
            setReloadValidation(1)
        }

    }

    return(
        <Fragment>
            <div className="modal fade" id="upsertArchiveDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div >
                            <h4>مدیریت بایگانی ها</h4>
                            <p>در این قسمت می توانید بایگانی ها را مدیریت یا ویرایش کنید</p>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom04">عنوان بایگانی</label>
                                        <input type="text"
                                               name={"title"}
                                               value={title}
                                               onChange={(e)=>{
                                                   setTitle(e.target.value)
                                                   formValidator.current.showMessageFor("title")
                                               }}
                                               className="form-control" id="validationCustom04"
                                               placeholder="عنوان بایگانی را وارد کنید..." required/>
                                        {formValidator.current.message("title",title,"required|min:2|max:80")}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom03">توضیحات</label>
                                        <textarea type="text" className="form-control" id="validationCustom03"
                                                  name={"description"}
                                                  value={description}
                                                  onChange={(e)=>{
                                                      setDescription(e.target.value)
                                                      formValidator.current.showMessageFor("description")
                                                  }}
                                                  placeholder="توضیحات را وارد کنید..." required/>
                                        {formValidator.current.message("description",description,"max:550")}
                                    </div>
                                </div>
                            </div>
                            <div className={"text-center"}>
                                <button
                                    onClick={sendData}
                                    className="btn btn-success waves-effect waves-light btn-block">ثبت</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default InsertArchiveDialog
