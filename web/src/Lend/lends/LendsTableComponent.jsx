import React from 'react'
const LendsTableComponent = ({lends,setDialogData})=>{
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="6">پرونده</th>
                        <th data-priority="6">وضعیت پرونده</th>
                        <th data-priority="6">نوع</th>
                        <th data-priority="6">فرستنده</th>
                        <th data-priority="6">شروع</th>
                        <th data-priority="6">پایان</th>
                        <th data-priority="6">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lends.map((lend,index)=>(
                        <tr>
                            <th>{index+1}</th>
                            <td>{lend.fileId.title}</td>
                            <td>{lend.fileId.fileStatus}</td>
                            <td>{lend.fileId.type}</td>
                            <td>{lend.creator.firstName} {lend.creator.lastName} ({lend.creator.position}) </td>
                            <td>{lend.createDate}</td>
                            <td>{lend.expireDate}</td>
                            <td>
                                <i className={"mdi mdi-eye custom-cursor"} onClick={()=>{
                                    setDialogData({
                                        isCompleteFile:lend.isCompleteFile,
                                        fileId:lend.fileId._id
                                    })
                                }} style={{color:"royalblue"}}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default LendsTableComponent
