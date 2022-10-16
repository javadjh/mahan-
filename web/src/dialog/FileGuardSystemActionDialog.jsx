import React, {useEffect, useState} from 'react'
import {fileConfirmAction, rejectFileAction} from "../stateManager/actions/FileAction";
import {useDispatch} from "react-redux";
import TicketsTableComponent from "../ArchiveTree/document/tickets/TicketsTableComponent";
const FileGuardSystemActionDialog = ({data,setReload})=>{
    const dispatch = useDispatch()
    const [message,setMessage] = useState('')

    const confirmFile = async ()=>{
        await dispatch(fileConfirmAction(data?.file?._id))
        setReload(Date.now())
        window.$('#fileGuardSystemActionDialog').modal('hide')
    }

    const rejectFile = async ()=>{
        await dispatch(rejectFileAction(data?.file?._id, {message}))
        setReload(Date.now())
        window.$('#fileGuardSystemActionDialog').modal('hide')
    }
    return (
        <div className="modal fade" id="fileGuardSystemActionDialog" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content p-4">
                    <div>
                        <div >
                            <h3>عملیات پرونده ها</h3>

                            {data.isReject? (
                                <>
                                    <p>آیا از رد پرونده اطمینان دارید؟</p>
                                    <textarea
                                        onChange={(e)=>{
                                            setMessage(e.target.value)
                                        }}
                                        value={message}
                                        name={"message"}
                                        className={"form-control"}
                                        placeholder={"پیام رد پرونده (دلایل)..."}/>
                                    <br/>
                                    <div className={"row"}>
                                        <div className={"col-lg-8"}></div>
                                        <div onClick={rejectFile}
                                             className={"col-lg-4"}>
                                            <button className={"btn btn-danger btn-block"}>رد پرونده</button>
                                        </div>
                                    </div>
                                </>
                            ):(
                                <>
                                    <p>آیا از تایید پرونده اطمینان دارید؟</p>
                                    <br/>
                                    <div className={"row"}>
                                        <div className={"col-lg-8"}></div>
                                        <div
                                            onClick={confirmFile}
                                            className={"col-lg-4"}>
                                            <button className={"btn btn-success btn-block"}>تایید پرونده</button>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={"mt-3"}>
                                <TicketsTableComponent logs={data?.file?.correspondence?data?.file?.correspondence:[]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FileGuardSystemActionDialog