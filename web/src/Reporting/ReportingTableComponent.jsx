import React from 'react'
const ReportingTableComponent = ({files,setSortBy,sortBy})=>{
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="title"?"royalblue":undefined,width:250}} onClick={()=>{
                            setSortBy('title')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>عنوان</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="archiveTreeId.title"?"royalblue":undefined}} onClick={()=>{
                            setSortBy('archiveTreeId.title')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>قفسه</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="fileDate"?"royalblue":undefined}} onClick={()=>{
                            setSortBy('fileDate')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>تاریخ</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="fileStatus"?"royalblue":undefined}} onClick={()=>{
                            setSortBy('fileStatus')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>وضعیت</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="type"?"royalblue":undefined}} onClick={()=>{
                            setSortBy('type')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>نوع</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="fileCode"?"royalblue":undefined}} onClick={()=>{
                            setSortBy('fileCode')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>شماره</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="creator.lastName"?"royalblue":undefined}} onClick={()=>{
                            setSortBy('creator.lastName')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>ایجاد کننده</th>
                        <th className={"custom-cursor"} style={{color:sortBy==="createDate"?"royalblue":undefined}} onClick={()=>{
                            setSortBy('createDate')
                        }} data-priority="6"><i className={"mdi mdi-arrow-down-drop-circle-outline mx-1"}/>ایجاد</th>
                        <th data-priority="6">وضعیت</th>

                    </tr>
                    </thead>
                    <tbody>
                    {files.map((file,index)=>(
                        <tr>
                            <th>{index+1}</th>
                            <td>{file.title}</td>
                            <td>{file.archiveTreeId.title}</td>
                            <td>{file.fileDate}</td>
                            <td>{file.fileStatus}</td>
                            <td>{file.type}</td>
                            <td>{file.fileCode}</td>
                            <td>{file.creator.firstName} {file.creator.lastName}</td>
                            <td>{file.createDate}</td>
                            <td style={{
                                color:file.isConfirm?"green":file.isReject?"red":"royalblue"
                            }}>{file.isConfirm?"تایید شده":file.isReject?"مرجوع شده":"در انتظار"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default ReportingTableComponent
