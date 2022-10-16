import React, {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import {insertPeopleFormExcelAction} from "../../stateManager/actions/PeopleAction";
import {insertLegalPeopleFormExcelAction} from "../../stateManager/actions/LegalPeopleAction";
import {errorToast} from "../../utility/ShowToast";
const InsertLegalPeopleFromExcelDialog = ()=>{
    const [fileName,setFileName] = useState('انتخاب فایل')
    const [fileData,setFileData] = useState()
    const dispatch = useDispatch()


    const saveFileHandler = async (files)=>{
        const file = new FormData()
        file.append("file",files[0])
        setFileData(file)
        setFileName("فایل اکسل انتخاب شد")
    }

    const sendData = async ()=>{
        if (fileData)
            await dispatch(insertLegalPeopleFormExcelAction(fileData))
        else
            errorToast("لطفا فایل را انتخاب کنید")
    }


    return(
        <Fragment>
            <div className="modal fade" id="insertLegalPeopleFromExcelDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div>
                            <div className={"text-center"}>
                                <h4>بارگذاری اشخاص حقوقی </h4>
                            </div>
                            <b style={{fontSize:15}}>
                                * نام شرکت <br/>
                                * مدیر عامل <br/>
                                * تاریخ ثبت <br/>
                                * شماره ثبت <br/>
                                * شماره تماس <br/>
                                * آدرس <br/>
                            </b>
                            <div className="custom-file mt-4">
                                <input  accept=".xls,.xlsx"  type="file" onChange={(e)=>{
                                    saveFileHandler(e.target.files)
                                }}
                                       name={"imageUrl"}
                                       className="custom-file-input" id="customFile" />
                                <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                            </div>
                            <div className={"row mt-4"}>
                                <div className={"col-lg-9"}></div>
                                <div className={"col-lg-3"}>
                                    <button className={"btn btn-success btn-block"} onClick={sendData}>ثبت</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default InsertLegalPeopleFromExcelDialog