import React, {useContext} from 'react'
import {useDispatch} from "react-redux";
import {setManualArchiveTreesAction} from "../../stateManager/actions/ArchiveTreeAction";
import {RootContext} from "../../RootComponent/RootContext";
const ArchiveTreeLineFileTable = ({files,archiveId,hasForm,history})=>{
    const dispatch = useDispatch()
    const {handleHide} = useContext(RootContext)
    return(
        <>
            <div className="table-rep-plugin py-0 my-0">
                <div className="table-responsive mb-0 py-0 my-0" data-pattern="priority-columns">
                    <table id="tech-companies-1 py-0 my-0" className="table table-striped">
                        <thead>
                        <tr>
                            <th>شماره</th>
                            <th data-priority="6">عنوان</th>
                            <th data-priority="6">نوع</th>
                            <th data-priority="6">وضعیت</th>
                            <th data-priority="6">شماره پرونده</th>
                            <th data-priority="6">تاریخ</th>
                            <th data-priority="6" hidden={handleHide("ویرایش پرونده") && handleHide("ویرایش سند")}>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {files.map((file,index)=>(
                            <tr>
                                <th>{index+1}</th>
                                <td>{file.title} <span style={{color:"green"}}>({file.documentCount})</span></td>
                                <td>{file.type}</td>
                                <td>{file.fileStatus}</td>
                                <td>{file.fileCode}</td>
                                <td>{file.fileDate}</td>
                                <td hidden={handleHide("ویرایش پرونده") && handleHide("ویرایش سند")}>
                                    <i className="mdi mdi-eye mx-1" style={{fontSize:16,color:"royalblue",cursor:"pointer"}} onClick={ async ()=>{
                                        await dispatch(setManualArchiveTreesAction([]))
                                        history.push({
                                            pathname:"/upsert-document",
                                            state:{
                                                archiveId:archiveId,
                                                fileId:file._id,
                                                hasForm
                                            }
                                        })
                                    }}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
export default ArchiveTreeLineFileTable
