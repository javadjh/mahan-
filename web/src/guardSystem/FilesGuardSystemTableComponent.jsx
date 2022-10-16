import React from "react";
import {useHistory} from "react-router";

const FilesGuardSystemTableComponent = ({files,setData})=>{
    let history = useHistory()
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره پرونده</th>
                        <th data-priority="6">عنوان</th>
                        <th data-priority="6">وضعیت</th>
                        <th data-priority="6">نوع</th>
                        <th data-priority="6">ایجاد کننده</th>
                        <th data-priority="6">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {files.map((file)=>(
                        <tr>
                            <th onClick={()=>{
                                history.push({
                                    pathname:"/upsert-document",
                                    state:{
                                        archiveId:file.archiveId,
                                        fileId:file._id,
                                    }
                                })
                            }}>{file.fileCode}</th>
                            <td>{file.title}</td>
                            <td>{file.fileStatus}</td>
                            <td>{file.type}</td>
                            <td>{file.creator?`${file.creator.firstName} ${file.creator.lastName}`:""}</td>
                            <td >
                                <div className={"row"}>
                                    <div onClick={()=>{
                                        setData({
                                            file,
                                            isReject:false
                                        })
                                        window.$('#fileGuardSystemActionDialog').modal('show')
                                    }}>
                                        <i className={"mdi mdi-check-underline-circle custom-cursor mx-1"} style={{color:"green",fontSize:18}}/>
                                    </div>
                                    <div onClick={()=>{
                                        setData({
                                            file,
                                            isReject:true
                                        })
                                        window.$('#fileGuardSystemActionDialog').modal('show')
                                    }}>
                                        <i className={"mdi mdi-close-circle custom-cursor mx-1"} style={{color:"red",fontSize:18}}/>
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
export default FilesGuardSystemTableComponent
