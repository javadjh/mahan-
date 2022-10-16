import React, {useContext} from 'react'
import {RootContext} from "../../RootComponent/RootContext";
const LegalPeopleTableComponent = ({legalPeople,onClickEditLegalPerson,onClickDeleteLegalPerson})=>{
    const {handleHide} = useContext(RootContext)
    return(
        <div className="table-rep-plugin">
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-companies-1" className="table table-striped">
                    <thead>
                    <tr>
                        <th>شماره</th>
                        <th data-priority="6">شرکت</th>
                        <th data-priority="6">مدیر عامل</th>
                        <th data-priority="6">تاریخ ثبت</th>
                        <th data-priority="6">شماره ثبت</th>
                        <th data-priority="6" hidden={handleHide("مدیریت اشخاص حقوقی")}>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {legalPeople.map((legalPerson,index)=>(
                        <tr>
                            <th>{index+1}</th>
                            <td>{legalPerson.companyName}</td>
                            <td>{legalPerson.ceo}</td>
                            <td>{legalPerson.registerDate}</td>
                            <td>{legalPerson.registerCode}</td>
                            <td hidden={handleHide("مدیریت اشخاص حقوقی")}>
                                <div className="btn-group">
                                    <div className="btn-group dropright">
                                                            <span data-toggle="dropdown" aria-haspopup="true"
                                                                  aria-expanded="false">
                                                                <i className="mdi mdi mdi-menu"/>
                                                            </span>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" onClick={()=>{
                                                onClickEditLegalPerson(legalPerson)
                                            }}>ویرایش</a>
                                            <a className="dropdown-item" onClick={()=>{
                                                onClickDeleteLegalPerson(legalPerson._id)
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
export default LegalPeopleTableComponent
