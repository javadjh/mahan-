import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {RootContext} from "../../RootComponent/RootContext";
const UsersTableComponent = ({users,upsertIntent,onOpenAlertDialogHandle,changeUsersPasswordAdminHandler})=>{
    const {handleHide} = useContext(RootContext)
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="1">نام</th>
                        <th data-priority="6">تلفن</th>
                        <th data-priority="6">نام کاربری</th>
                        <th data-priority="6">سمت</th>
                        <th hidden={handleHide("تعریف کاربر")} data-priority="6">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u,index)=>(
                        <tr>
                            <th>{index+1}</th>
                            <td>{u.firstName} {u.lastName}</td>
                            <td>{u.phoneNumber}</td>
                            <td>{u.userName}</td>
                            <td>{u.position}</td>
                            <td hidden={handleHide("تعریف کاربر")} >
                                <div className="btn-group" hidden={u.position==="مدیر سامانه" || u.position==="توسعه دهنده"}>
                                    <div className="btn-group dropright">
                                        <span data-toggle="dropdown" aria-haspopup="true"
                                              aria-expanded="false">
                                            <i className="mdi mdi mdi-menu"/>
                                        </span>
                                        <div  className="dropdown-menu">
                                            <a className="dropdown-item" onClick={()=>{
                                                upsertIntent(u)
                                            }}>ویرایش</a>
                                            <a className="dropdown-item" onClick={()=>onOpenAlertDialogHandle(u)}>حذف</a>
                                            <a className="dropdown-item" onClick={()=>changeUsersPasswordAdminHandler(u)}>تغییر کلمه عبور</a>
                                        </div>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default UsersTableComponent
