import React, {Fragment, useContext, useEffect, useState} from "react";
import {ArchiveTreeContext} from "../ArchiveTreeContext";
import {ArchiveTreeLineContext} from "../archiveTreeLine/ArchiveTreeLineContext";
import {errorToast} from "../../utility/ShowToast";

const AddTreeDialog = ({inTree = true})=>{
    const { addNewTree,singleTreeData} = useContext(inTree?ArchiveTreeContext:ArchiveTreeLineContext)
    const [title,setTitle] = useState('')
    const [id,setId] = useState()
    useEffect(()=>{
        if(singleTreeData.title){
            setTitle(singleTreeData.title)
            setId(singleTreeData._id)
        }else{
            setTitle('')
            setId('')
        }
    },[singleTreeData])
    return(
        <Fragment>
            <div className="modal fade" id="addTreeDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div className={"text-center"}>
                            <input id="txtFirstNameBilling"
                                   type="text"
                                   value={title}
                                   onChange={(e)=>{
                                       setTitle(e.target.value)
                                   }}
                                   placeholder={"عنوان قفسه را وارد کنید..."}
                                   className="form-control col-lg-12"/>
                            <button type="button"
                                    onClick={()=>{
                                        if(title.length<1){
                                            errorToast("لطفا عنوان را وارد کنید")
                                            return
                                        }
                                        addNewTree(title)
                                    }}
                                    className="btn btn-primary btn-lg btn-block waves-effect waves-light mb-1 mt-2">ثبت</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AddTreeDialog
