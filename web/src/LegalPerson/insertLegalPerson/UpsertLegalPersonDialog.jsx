import React, {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {insertPersonAction, updatePersonAction} from "../../stateManager/actions/PeopleAction";
import {insertLegalPeopleAction, updateLegalPeopleAction} from "../../stateManager/actions/LegalPeopleAction";
import {validatorSP} from "../../utility/formValidator";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import {just_persian} from "../../utility/inputValidators";
import {defaultDate} from "../../utility/dateUtil";
const jalaliMoment = require('jalali-moment')

const UpsertLegalPersonDialog = ({singleLegalPerson})=>{
    const formValidator = useRef(validatorSP())
    console.table(singleLegalPerson)
    const dispatch = useDispatch()
    const [id,setId] = useState()
    const [companyName,setCompanyName] = useState()
    const [ceo,setCeo] = useState()
    const [address,setAddress] = useState('')
    const [registerDate,setRegisterDate] = useState(defaultDate(true))
    const [registerCode,setRegisterCode] = useState('')
    const [tel,setTel] = useState('')
    const [,setReloadValidation] = useState()

    useEffect(()=>{
        if(singleLegalPerson._id){
            setId(singleLegalPerson._id)
            setCompanyName(singleLegalPerson.companyName)
            setCeo(singleLegalPerson.ceo)
            setAddress(singleLegalPerson.address)
            setRegisterDate(singleLegalPerson.registerDate)
            setRegisterCode(singleLegalPerson.registerCode)
            setTel(singleLegalPerson.tel)
        }else{
            setId('')
            setCompanyName('')
            setCeo('')
            setAddress('')
            setRegisterDate(defaultDate(true))
            setRegisterCode('')
            setTel('')
        }
    },[singleLegalPerson])


    const sendData = async ()=>{
        if(formValidator.current.allValid()){
            const data = {
                companyName,
                ceo,
                address,
                registerDate,
                registerCode,
                tel
            }
            if(id)
                await dispatch(updateLegalPeopleAction(id,data))
            else
                await dispatch(insertLegalPeopleAction(data))
        }else{
            formValidator.current.showMessages()
            setReloadValidation(1)
        }

    }

    return(
        <Fragment>

            <div className="modal fade" id="upsertLegalPersonDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div >
                            <h4>مدیریت شخص حقوقی</h4>
                            <p>در این فرم می توانید اطلاعات اشخاص حقوقی را ثبت و ویرایش کنید</p>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom03">نام شرکت</label>
                                            <input type="text" className="form-control" id="validationCustom03"
                                                   name={"companyName"}
                                                   value={companyName}
                                                   onChange={(e)=>{
                                                       setCompanyName(e.target.value)
                                                       formValidator.current.showMessageFor("companyName")
                                                   }}
                                                   placeholder="نام شرکت را وارد کنید..." required/>
                                            {formValidator.current.message("companyName",companyName,"required|min:2|max:100")}
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom04">مدیر عامل</label>
                                            <input type="text"
                                                   name={"ceo"}
                                                   value={ceo}
                                                   onChange={(e)=>{
                                                       if(just_persian(e.target.value) || e.target.value.length===0) {
                                                           setCeo(e.target.value)
                                                           formValidator.current.showMessageFor("ceo")
                                                       }

                                                   }}
                                                   className="form-control" id="validationCustom04"
                                                   placeholder="مدیر عامل را وارد کنید..." required/>
                                            {formValidator.current.message("ceo",ceo,"required|min:2|max:80")}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom04">تاریخ ثبت {registerDate}</label>
                                            <PersianDatePickerComponent value={registerDate} onSelect={(moment)=>{
                                                const miladiDate = moment.format("MM/DD/YYYY")
                                                const persianDate = moment.format("jYYYY/jMM/jDD")
                                                console.log(persianDate)
                                                console.log(miladiDate)
                                                setRegisterDate(persianDate)
                                            }}/>
                                            {formValidator.current.message("registerDate",registerDate,"max:15")}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom03">شماره ثبت</label>
                                            <input type="number" className="form-control" id="validationCustom03"
                                                   name={"registerCode"}
                                                   value={registerCode}
                                                   onChange={(e)=>{
                                                       setRegisterCode(e.target.value)
                                                       formValidator.current.showMessageFor("registerCode")
                                                   }}
                                                   placeholder="شماره ثبت را وارد کنید..." required/>
                                            {formValidator.current.message("registerCode",registerCode,"max:50")}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom04">شماره تماس</label>
                                            <input type="number"
                                                   name={"tel"}
                                                   value={tel}
                                                   onChange={(e)=>{
                                                       if(e.target.value.length>11)
                                                           return

                                                       setTel(e.target.value)
                                                       formValidator.current.showMessageFor("tel")
                                                   }}
                                                   className="form-control" id="validationCustom04"
                                                   placeholder="شماره تماس را وارد کنید..." required/>
                                            {formValidator.current.message("tel",tel,"min:11|max:11")}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom03">آدرس</label>
                                            <textarea type="text" className="form-control" id="validationCustom03"
                                                   name={"address"}
                                                   value={address}
                                                   onChange={(e)=>{
                                                       setAddress(e.target.value)
                                                       formValidator.current.showMessageFor("address")
                                                   }}
                                                   placeholder="آدرس را وارد کنید..." required/>
                                            {formValidator.current.message("address",address,"max:550")}
                                        </div>
                                    </div>
                                </div>
                                <div className={"text-center"}>
                                    <div className={"row"}>
                                        <div className={"col-lg-7"}></div>
                                        <div className={"col-lg-5"}>
                                            <button
                                                onClick={sendData}
                                                className="btn btn-success waves-effect waves-light btn-block">ثبت</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default UpsertLegalPersonDialog
