import React from 'react'
const DeActivateDocumentsTable = ({documents,restoreDocument})=>{
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="6">عنوان</th>
                        <th data-priority="6">حجم</th>
                        <th data-priority="6">فرمت</th>
                        <th data-priority="6">تاریخ ایجاد</th>
                        <th data-priority="6">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.map((d,index)=>(
                        <tr className={"custom-cursor"} style={{width:"100% !important"}}>
                            <th>{index+1}</th>
                            <td>{d.title}</td>
                            <td>{d.documentSize}</td>
                            <td>{d.ex}</td>
                            <td>{d.createDate}</td>
                            <td >
                                <div className="btn-group">
                                    <i onClick={()=>{
                                        restoreDocument(d._id)
                                    }} className="mdi mdi-file-restore m-0 p-0" style={{color:"royalblue",fontSize:15}} />
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
export default DeActivateDocumentsTable
