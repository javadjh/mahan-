import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSupervisorsFilesAction} from "../stateManager/actions/FileAction";
import MainLayout from "../RootComponent/MainLayout";
import SupervisorFilesTableComponent from "./SupervisorFilesTableComponent";
const SupervisorsFileRootComponent = ({history})=>{
    const dispatch = useDispatch()
    const supervisorsFiles = useSelector(state => state.supervisorsFiles)
    const [pageId,setPageId] = useState(1)
    const [searchValue,setSearchValue] = useState('')
    const [isConfirm,setIsConfirm] = useState(false)
    const [isReject,setIsReject] = useState(false)
    const [isWaiting,setIsWaiting] = useState(true)
    const [reload,setReload] = useState('')
    useEffect(()=>{
        getData()
    },[reload,searchValue])
    const getData = async ()=>{
        await dispatch(getSupervisorsFilesAction({
            pageId:pageId,
            eachPerPage:20,
            searchValue,
            isConfirm,
            isReject,
            isWaiting,
        }))
    }

    return(
        <MainLayout title={"لیست پرونده ها"} isMain={true}>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div>
                                <div className={"row mb-1"}>
                                    <h4 className="card-title ml-3 mt-1">پرونده های ارسال شده برای شما</h4>

                                </div>
                                <div className={"row"}>
                                    <p className="card-title-desc col-lg-8">در این بخش میتوانید پرونده های فرستاده شده برای ناظر را مدیریت کنید و آن ها را مدیریت کنید</p>
                                    <input className="form-control col-lg-4" type="text" value={searchValue}
                                           placeholder={"جستجو..."}
                                           onChange={(e)=>{
                                               setSearchValue(e.target.value)
                                           }}
                                    />
                                </div>
                            </div>
                            <div className={"card"}>
                                <div className="card-body">

                                    <ul className="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                                        <li className="nav-item" onClick={()=>{
                                            setIsConfirm(false)
                                            setIsReject(false)
                                            setIsWaiting(true)
                                            setReload(Date.now())
                                        }}>
                                            <a className="nav-link active" data-toggle="tab" href="#waiting" role="tab">
                                                <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                <span className="d-none d-sm-block">در انتظار تایید</span>
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={()=>{
                                            setIsConfirm(true)
                                            setIsReject(false)
                                            setIsWaiting(false)
                                            setReload(Date.now())
                                        }}>
                                            <a className="nav-link" data-toggle="tab" href="#confirm" role="tab">
                                                <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                                <span className="d-none d-sm-block">تایید شده</span>
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={()=>{
                                            setIsConfirm(false)
                                            setIsReject(true)
                                            setIsWaiting(false)
                                            setReload(Date.now())
                                        }}>
                                            <a className="nav-link" data-toggle="tab" href="#reject" role="tab">
                                                <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                                <span className="d-none d-sm-block">مرجوع شده</span>
                                            </a>
                                        </li>
                                    </ul>

                                    <div className="tab-content p-3 text-muted">


                                        <div className="tab-pane active" id="waiting" de role="tabpanel">
                                            <div>
                                                <SupervisorFilesTableComponent files={supervisorsFiles.files} history={history}/>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="confirm" role="tabpanel">
                                            <div>
                                                <SupervisorFilesTableComponent files={supervisorsFiles.files} history={history}/>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="reject" role="tabpanel">
                                            <div>
                                                <SupervisorFilesTableComponent files={supervisorsFiles.files} history={history}/>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default SupervisorsFileRootComponent
