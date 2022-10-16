import React, {useContext, useEffect, useState} from 'react'
import MainLayout from "../../RootComponent/MainLayout";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserAction, getAllUsersAction, singleUserAction} from "../../stateManager/actions/UsersAction";
import UsersTableComponent from "./UsersTableComponent";
import AlertDialog from "../../utility/AlertDialog";
import {RootContext} from "../../RootComponent/RootContext";
import ChangeUsersPasswordAdminDialog from "../../dialog/ChangeUsersPasswordAdminDialog";
const UsersRootComponent = ({history})=>{
    const {handleHide} = useContext(RootContext)
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const [searchValue,setSearchValue] = useState("")
    const [user,setUser] = useState({})
    const [singleUser,setSingleUser] = useState({})
    useEffect(()=>{
        getData()
    },[searchValue])

    useEffect(()=>{
        if(singleUser._id){
            window.$('#changeUsersPasswordAdminDialog').modal('show')
        }
    },[singleUser])

    const getData = async ()=>{
        await dispatch(getAllUsersAction({searchValue}))
    }
    const upsertIntent = async (data)=>{
        await dispatch(singleUserAction(data))
        history.push("/upsert-user")
    }
    const onOpenAlertDialogHandle = (user)=>{
        setUser(user)
        window.$('#alertDialog').modal('show')
    }
    const deleteHandle = async ()=>{
        await dispatch(deleteUserAction(user._id))
    }
    const changeUsersPasswordAdminHandler = (u)=>{
        setSingleUser(u)
    }
    return(
        <MainLayout title={"لیست کاربران سامانه"}>
            <AlertDialog title={"آیا از حذف این کاربر مطمعن هستید؟"} deleteHandle={deleteHandle}/>
            <ChangeUsersPasswordAdminDialog user={singleUser}/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-8"}>
                                    <div className={"row mb-1"}>
                                        <button
                                            hidden={handleHide("تعریف کاربر")}
                                            onClick={()=>upsertIntent({})}
                                            type="button" className="btn btn-success ml-3 waves-effect waves-light"
                                            data-toggle="button" aria-pressed="false">افزودن کاربر جدید</button>
                                        </div>
                                    <p className="card-title-desc">تمامی کاربران سامانه را می توانید در لیست زیر مشاهده و مدیریت نمایید</p>
                                </div>
                                <div className={"col-lg-4"}>
                                    <div className={"row"}>
                                        <input className="form-control col-lg-12" type="text" value={searchValue}
                                               placeholder={"جستجو..."}
                                               onChange={(e)=>{
                                                   setSearchValue(e.target.value)
                                               }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <UsersTableComponent users={users}
                                                 upsertIntent={upsertIntent}
                                                 onOpenAlertDialogHandle={onOpenAlertDialogHandle}
                                                 changeUsersPasswordAdminHandler={changeUsersPasswordAdminHandler}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default UsersRootComponent
