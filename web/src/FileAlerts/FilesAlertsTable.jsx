import React from "react";
import ReactTooltip from "react-tooltip";
import {useHistory} from "react-router";
const FilesAlertsTable = ({filesAlerts,history})=>{
    history = useHistory()
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="6">بایگانی</th>
                        <th data-priority="6">پرونده</th>
                        <th data-priority="6">عنوان</th>
                        <th data-priority="6">ایجاد کننده</th>
                        <th data-priority="6">انقضا</th>
                        <th data-priority="6">ایجاد</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filesAlerts.map((alert,index)=>(
                        <tr className={"custom-cursor"} onClick={()=>{
                            history.push({
                                pathname:"/upsert-document",
                                state:{
                                    archiveId:alert.archiveId._id,
                                    fileId:alert.fileId._id,
                                    hasForm:alert.archiveId.isFormRequired
                                }
                            })
                        }}>
                            <th>{index+1}</th>
                            <td>{alert.archiveId.title}</td>
                            <td>{alert.fileId.title}</td>
                            <td>
                                <span>
                                    <span data-tip={alert.description}>{alert.title}</span>
                                    <ReactTooltip  />
                                </span>
                            </td>
                            <td>{alert.creator.firstName} {alert.creator.lastName} ({alert.creator.position}) </td>
                            <td style={{color:alert.isExpired?"red":"green"}}>{alert.alertDate}</td>
                            <td>{alert.createDate}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default FilesAlertsTable