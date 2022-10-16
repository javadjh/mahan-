import React, {Fragment, useEffect, useState} from "react";
import {just_persian} from "../../utility/inputValidators";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import {useDispatch} from "react-redux";
import {insertLibraryShelfAction, updateLibraryShelfAction} from "../../stateManager/actions/LibraryAction";
export const UpsertLibraryShelfDialog = ({libraryShelf})=>{
    const dispatch = useDispatch()
    const [title,setTitle] = useState('')

    useEffect(()=>{
        if(libraryShelf._id){
            setTitle(libraryShelf.title)
        }else{
            setTitle('')
        }
    },[libraryShelf])

    const sendData = async ()=>{
        if(libraryShelf._id){
            await dispatch(updateLibraryShelfAction({title},libraryShelf._id))
            window.$('#upsertLibraryDialog').modal('hide')
        }else{
            await dispatch(insertLibraryShelfAction({title}))
            window.$('#upsertLibraryDialog').modal('hide')
        }
        setTitle('')
    }
    return(
        <Fragment>
            <div className="modal fade" id="upsertLibraryDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div >
                            <p>افزودن پوشه</p>
                            <input type={"text"}
                                   value={title}
                                   placeholder={"عنوان پوشه را وارد کنید..."}
                                   onChange={(e)=>{
                                       setTitle(e.target.value)
                                   }}
                                   className={"form-control"}
                            />
                            <button onClick={sendData} className={"btn btn-success btn-block mt-4"}>ثبت</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default UpsertLibraryShelfDialog
