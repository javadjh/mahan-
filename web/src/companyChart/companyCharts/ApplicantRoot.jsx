import React, {useEffect, useState} from "react";
import AlertDialog from "../../utility/AlertDialog";
import MainLayout from "../../RootComponent/MainLayout";
import ApplicantTable from "./ApplicantTable";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteApplicantAction,
    getApplicantsAction,
    insertApplicantAction
} from "../../stateManager/actions/ApplicantAction";
import ShowUsersRoleDialog from "../../dialog/ShowUsersRoleDialog";
import RolesTableComponent from "../../Role/roles/RolesTableComponent";
import InsertApplicantDialog from "./InsertApplicantDialog";

const ApplicantRoot = ()=>{
    const dispatch = useDispatch()
    const applicants = useSelector(state => state.applicants)
    const [applicantId,setApplicantId] = useState()
    useEffect(()=>{
        getData()
    },[])

    const getData = async ()=>{
        await dispatch(getApplicantsAction())
    }
    const openDeleteDialog = (id)=>{
        setApplicantId(id)
        window.$('#alertDialog').modal('show')
    }
    const deleteApplicantsHandle = async ()=>{
        await dispatch(deleteApplicantAction(applicantId))
    }
    const sendData = async (title,setTitle)=>{
        if(title.length<=1){
            return
        }
        await dispatch(insertApplicantAction({title},setTitle))

    }
    return(
        <MainLayout title={"سمت سازمانی"}>
            <InsertApplicantDialog sendData={sendData}/>
            <AlertDialog title={"آیا از حذف این سمت سازمانی اطمینان دارید؟"} deleteHandle={deleteApplicantsHandle} />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-8"}>
                                    <div className={"row mb-1"}>
                                        <button
                                            onClick={()=>{
                                                window.$('#insertApplicantDialog').modal('show')
                                            }}
                                            type="button" className="btn btn-success ml-3 waves-effect waves-light"
                                            data-toggle="button" aria-pressed="false">افزودن سمت سازمانی جدید</button>
                                    </div>
                                    <p className="card-title-desc">سمت های سامانی در این قسمت تعریف میشوند</p>
                                </div>
                            </div>
                            <ApplicantTable applicants={applicants} openDeleteDialog={openDeleteDialog} />
                        </div>
                    </div>
                </div>
            </div>


        </MainLayout>
    )
}
export default ApplicantRoot
