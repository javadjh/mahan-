import React from 'react'
const TicketsTableComponent = ({logs})=>{
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th data-priority="6">تاریخ</th>
                        <th data-priority="6">فرستنده</th>
                        <th data-priority="6">توضیحات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map((log,index)=>(
                        <tr>
                            <td>{log.createDate}</td>
                            <td>{log.isSupervisor?"ناظر " :"ایجاد کننده"} {log.creator.firstName} {log.creator.lastName} </td>
                            <td>{log.message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default TicketsTableComponent
