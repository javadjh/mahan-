import React, {useContext} from 'react'
import {RootContext} from "../../RootComponent/RootContext";
import {getFormPreviewAction, setManualFormPreviewAction} from "../../stateManager/actions/FormAction";
import {useDispatch} from "react-redux";
const FormsTableComponent = ({forms,upsertFormIntent,onDeleteClickListener})=>{
    const dispatch = useDispatch()
    const {handleHide} = useContext(RootContext)
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="1">عنوان</th>
                        <th data-priority="6">سازنده</th>
                        <th data-priority="6">تاریخ ایجاد</th>
                        <th data-priority="6" hidden={handleHide("افزودن فرم")}>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {forms.map((f,index)=>(
                        <tr>
                            <th>{index+1}</th>
                            <td>{f.title}</td>
                            <td>{f.creator.userName}</td>
                            <td>{f.createDate}</td>
                            <td hidden={handleHide("افزودن فرم")}>
                                <div className="btn-group">
                                    <div className="btn-group dropright">
                                                            <span data-toggle="dropdown" aria-haspopup="true"
                                                                  aria-expanded="false">
                                                                <i className="mdi mdi mdi-menu"/>
                                                            </span>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" onClick={ async ()=>{
                                                await dispatch(setManualFormPreviewAction([]))
                                                upsertFormIntent(f,true)
                                            }}>ویرایش</a>
                                            <a className="dropdown-item" onClick={ async ()=>{
                                                await dispatch(getFormPreviewAction(f._id))
                                                window.$('#showFileFormDialog').modal('show')
                                            }}>پیش نمایش</a>
                                            <a className="dropdown-item" onClick={()=>{
                                                onDeleteClickListener(f)
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
export default FormsTableComponent
