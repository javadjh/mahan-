import React, {useContext, useEffect, useState} from 'react'
import AlertDialog from "../../utility/AlertDialog";
import UsersTableComponent from "../../User/users/UsersTableComponent";
import MainLayout from "../../RootComponent/MainLayout";
import RolesTableComponent from "./RolesTableComponent";
import {useDispatch, useSelector} from "react-redux";
import {
    clearDeleteRoleAction,
    deleteRoleAction,
    getAllRolesAction,
    insertSingleRoleAction
} from "../../stateManager/actions/RolesAction";
import ShowUsersRoleDialog from "../../dialog/ShowUsersRoleDialog";
import {singleUserAction} from "../../stateManager/actions/UsersAction";
import {RootContext} from "../../RootComponent/RootContext";
const RolesRootComponent = ({history})=>{
    const {handleHide} = useContext(RootContext)
    const dispatch = useDispatch()
    const roles = useSelector(state => state.roles)
    const deleteRole = useSelector(state => state.deleteRole)
    const [singleRole,setSingleRole] = useState({})
    useEffect(()=>{
        getData()
        return()=>{
            dispatch(clearDeleteRoleAction())
        }
    },[])
    const getData= async ()=>{
        await dispatch(getAllRolesAction())
    }
    const upsertRoleHandle = async (data)=>{
        await dispatch(insertSingleRoleAction(data))
        history.push("/upsert-role")
    }
    const onOpenAlertDialogHandle = (user)=>{
        setSingleRole(user)
        window.$('#alertDialog').modal('show')
    }
    const deleteHandle = async ()=>{
        await dispatch(deleteRoleAction(singleRole._id))
    }
    useEffect(()=>{
        if(deleteRole.hasUser)
            showUserDialog()
    },[deleteRole])
    const showUserDialog = ()=>{
        window.$('#showUsersRoleDialog').modal('show')
    }
    const upsertIntent = async (data)=>{
        await dispatch(singleUserAction(data))
        history.push("/upsert-user")
    }
    return(
        <MainLayout title={"لیست نقش های سامانه"}>
            <ShowUsersRoleDialog users={deleteRole.usersRole} upsertIntent={upsertIntent}/>
            <AlertDialog title={"آیا از حذف این نقش مطمعن هستید؟"} deleteHandle={deleteHandle}/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-8"}>
                                    <div className={"row mb-1"}>
                                        <button
                                            hidden={handleHide("الگوی دسترسی")}
                                            onClick={()=>{
                                                upsertRoleHandle({})
                                            }}
                                            type="button" className="btn btn-success ml-3 waves-effect waves-light"
                                            data-toggle="button" aria-pressed="false">افزودن نقش جدید</button>
                                    </div>
                                    <p className="card-title-desc">تمامی نقش های سامانه را می توانید در لیست زیر مشاهده و مدیریت نمایید</p>
                                </div>
                            </div>
                            <RolesTableComponent onOpenAlertDialogHandle={onOpenAlertDialogHandle} roles={roles} upsertRoleHandle={upsertRoleHandle}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default RolesRootComponent
