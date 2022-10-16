import React, {useRef, useState} from 'react'
import {useDispatch} from "react-redux";
import {validatorSP} from "../../utility/formValidator";
import {insertApplicantAction} from "../../stateManager/actions/ApplicantAction";
const ApplicantTable = ({applicants,openDeleteDialog})=>{
    const dispatch = useDispatch()

    return(
        <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",paddingTop:10}} className={"text-center"}>
            <div className={"text-center"} style={{width:"100%"}} >




                <div className="table-rep-plugin">
                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                        <table id="tech-companies-1" className="table table-striped">
                            <thead>
                            <tr>
                                <th style={{width:"10%"}}>شماره</th>
                                <th style={{width:"75%"}} data-priority="1">عنوان</th>
                                <th style={{width:"15%"}}data-priority="6">عملیات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {applicants.map((a,index)=>(
                                <tr>
                                    <th>{index+1}</th>
                                    <td style={{width:150}}>{a.title}</td>
                                    <td >
                                        <i onClick={()=>{
                                            openDeleteDialog(a._id)
                                        }} className={"mdi mdi-delete"} style={{fontSize:15,color:"red"}}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>


            </div>
        </div>
    )
}
export default ApplicantTable
