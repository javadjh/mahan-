import React from "react";
const FileLogsTableComponent = ({fileLogs})=>{
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="6">عنوان</th>
                        <th data-priority="6">توضیحات</th>
                        <th data-priority="6">کاربر</th>
                        <th data-priority="6">تاریخ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fileLogs.map((log,index)=>(
                        <tr>
                            <th>{index+1}</th>
                            <td>{log.title}</td>
                            <td>{log.description}</td>
                            <td>{log.creator.firstName} {log.creator.lastName}</td>
                            <td>{log.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default FileLogsTableComponent
