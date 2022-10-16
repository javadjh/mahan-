import React, {useContext} from 'react'
import {RootContext} from "../../RootComponent/RootContext";
const RolesTableComponent = ({roles,upsertRoleHandle,onOpenAlertDialogHandle})=>{
    const {handleHide} = useContext(RootContext)
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="1">عنوان</th>
                        <th data-priority="6">توضیحات</th>
                        <th data-priority="6">دسترسی ها</th>
                        <th data-priority="6" hidden={handleHide("الگوی دسترسی")}>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map((r,index)=>(
                        <tr>
                            <th>{index+1}</th>
                            <td style={{width:150}}>{r.title}</td>
                            <td>{r.description}</td>
                            <td style={{width:100}}>{r.accessList.length}</td>
                            <td hidden={handleHide("الگوی دسترسی")}>
                                <div className="btn-group" hidden={r.title==="مدیر کل سامانه" || r.title==="توسعه دهنده"}>
                                    <div className="btn-group dropright">
                                                            <span data-toggle="dropdown" aria-haspopup="true"
                                                                  aria-expanded="false">
                                                                <i className="mdi mdi mdi-menu"/>
                                                            </span>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" onClick={()=>{
                                                upsertRoleHandle(r)
                                            }}>ویرایش</a>
                                            <a className="dropdown-item" onClick={()=>{
                                                onOpenAlertDialogHandle(r)
                                            }}>حذف</a>
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
export default RolesTableComponent
