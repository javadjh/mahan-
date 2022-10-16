import React, {Fragment, useEffect, useState} from 'react'
import MainLayout from "../../RootComponent/MainLayout";
import AlertDialog from "../../utility/AlertDialog";
import FormsTableComponent from "../../Form/forms/FormsTableComponent";
import ArchivesTableComponent from "./ArchivesTableComponent";
import {useDispatch, useSelector} from "react-redux";
import {deleteArchiveAction, getAllArchivesAction} from "../../stateManager/actions/ArchiveAction";
import InsertArchiveDialog from "../insertArchive/InsertArchiveDialog";
import {getAllFormsAction} from "../../stateManager/actions/FormAction";
import {useHistory} from "react-router";
const ArchivesRootComponent = ()=>{
    const archives = useSelector(state => state.archives)
    const dispatch = useDispatch()
    const [singleArchive,setSingleArchive] = useState({})
    const [singleId,setSingleId] = useState()
    useEffect(()=>{
        getData()
    },[])
    const getData = async ()=>{
        await dispatch(getAllArchivesAction())
        await dispatch(getAllFormsAction())
    }

    const deleteArchiveHandle = (id)=>{
        setSingleId(id)
        window.$('#alertDialog').modal('show')
    }

    const upsertArchiveHandle = (archive)=>{
        setSingleArchive(archive)
        window.$('#upsertArchiveDialog').modal('show')
    }
    const deleteArchive = async ()=>{
        await dispatch(deleteArchiveAction(singleId))
    }
    return(
        <Fragment>
            <MainLayout title={"لیست بایگانی های سامانه"}>
                <AlertDialog title={"آیا از حذف این بایگانی مطمعن هستید؟"} deleteHandle={deleteArchive}/>
                <InsertArchiveDialog singleArchive={singleArchive}/>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <div className={"row"}>
                                    <div className={"col-lg-8"}>
                                        <div className={"row mb-1"}>
                                            <h4 className="card-title ml-3 mt-1">بایگانی ها</h4>
                                            <button
                                                onClick={()=>{
                                                    setSingleArchive({})
                                                    window.$('#upsertArchiveDialog').modal('show')
                                                }}
                                                type="button" className="btn btn-success ml-3 waves-effect waves-light"
                                                data-toggle="button" aria-pressed="false">افزودن بایگانی جدید</button>
                                        </div>
                                        <p className="card-title-desc">در این قسمت می توانید بایگانی ها را مدیریت یا ویرایش کنید</p>
                                    </div>

                                </div>
                                <ArchivesTableComponent archives={archives} deleteArchiveHandle={deleteArchiveHandle} upsertArchiveHandle={upsertArchiveHandle}/>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </Fragment>
    )
}
export default ArchivesRootComponent
