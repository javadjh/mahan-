import React, {Fragment, useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux";
import {insertPersonAction, updatePersonAction} from "../../stateManager/actions/PeopleAction";
import {just_persian, melliCodeValidator} from "../../utility/inputValidators";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import {errorToast} from "../../utility/ShowToast";
import {defaultDate} from "../../utility/dateUtil";
import {validatorSP} from "../../utility/formValidator";
const UpsertPersonDialog = ({singlePerson})=>{
    console.table(singlePerson)
    const formValidator = useRef(validatorSP())
    const dispatch = useDispatch()
    const [id,setId] = useState()
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [fathersName,setFathersName] = useState()
    const [idCode,setIdCode] = useState()
    const [melliCode,setMelliCode] = useState()
    const [birthday,setBirthday] = useState(defaultDate(true))
    const [gender,setGender] = useState()
    const [isShowValidator,setIsShowValidator] = useState(false)
    const [isMelliCodeValid,setIsMelliCodeValid] = useState(true)
    const [alertText,setAlertText] = useState()
    const [,reloadPage] = useState()


    useEffect(()=>{
        if(singlePerson._id){
            setId(singlePerson._id)
            setFirstName(singlePerson.firstName)
            setLastName(singlePerson.lastName)
            setFathersName(singlePerson.fathersName)
            setIdCode(singlePerson.idCode)
            setMelliCode(singlePerson.melliCode)
            setBirthday(singlePerson.birthday)
            setGender(singlePerson.gender)
            setIsMelliCodeValid(false)
        }else{
            setId('')
            setFirstName('')
            setLastName('')
            setFathersName('')
            setIdCode('')
            setMelliCode('')
            setBirthday(defaultDate(true))
            setGender('')
            setIsMelliCodeValid(false)
        }
    },[singlePerson])


    const sendData = async ()=>{
        if(formValidator.current.allValid() && !isMelliCodeValid){
            const data = {
                firstName,
                lastName,
                fathersName,
                idCode,
                melliCode,
                birthday,
                gender
            }
            if(id)
                await dispatch(updatePersonAction(id,data))
            else
                await dispatch(insertPersonAction(data))
        }else{
            formValidator.current.showMessages()
            reloadPage(1)
        }


    }

    return(
        <Fragment>
            <div className="modal fade" id="upsertPersonDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div >
                            <h4>مدیریت شخص حقیقی</h4>
                            <p>در این فرم می توانید اطلاعات اشخاص حقیقی را ثبت و ویرایش نمایید</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom03">نام</label>
                                            <input type="text" className="form-control" id="validationCustom03"
                                                   name={"firstName"}
                                                   value={firstName}
                                                   onChange={(e)=>{
                                                       if(just_persian(e.target.value) || e.target.value.length===0) {
                                                           setFirstName(e.target.value)
                                                           formValidator.current.showMessageFor("firstName")
                                                       }
                                                   }}
                                                   placeholder="نام را وارد کنید..." required/>
                                        {formValidator.current.message("firstName",firstName,"min:2|required|max:50")}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom04">نام خانوادگی</label>
                                            <input type="text"
                                                   name={"lastName"}
                                                   value={lastName}
                                                   onChange={(e)=>{
                                                       if(just_persian(e.target.value) || e.target.value.length===0){
                                                           setLastName(e.target.value)
                                                           formValidator.current.showMessageFor("lastName")
                                                       }
                                                   }}
                                                   className="form-control" id="validationCustom04"
                                                   placeholder="نام خانوادگی را وارد کنید..." required/>
                                        {formValidator.current.message("lastName",lastName,"required|min:2|max:50")}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom03">نام پدر</label>
                                            <input type="text" className="form-control" id="validationCustom03"
                                                   name={"fathersName"}
                                                   value={fathersName}
                                                   onChange={(e)=>{
                                                       if(just_persian(e.target.value) || e.target.value.length===0) {
                                                           setFathersName(e.target.value)
                                                           formValidator.current.showMessageFor("fathersName")
                                                       }
                                                   }}
                                                   placeholder="نام پدر را وارد کنید..." required/>
                                        </div>
                                        {formValidator.current.message("fathersName",fathersName,"min:2|max:50")}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom04">شماره شناسنامه</label>
                                            <input type="number"
                                                   name={"idCode"}
                                                   value={idCode}
                                                   onChange={(e)=>{
                                                       if(e.target.value.length>10)
                                                           return
                                                       setIdCode(e.target.value)
                                                       formValidator.current.showMessageFor("idCode")
                                                   }}
                                                   className="form-control" id="validationCustom04"
                                                   placeholder="شماره شناسنامه را وارد کنید..." required/>
                                        </div>
                                        {formValidator.current.message("idCode",idCode,"min:2|max:10")}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom05">شماره ملی </label>
                                            <input type="number"
                                                   name={melliCode}
                                                   onChange={(e)=>{
                                                       console.log(e.target.value.length)
                                                       if(e.target.value.length===0){
                                                            setMelliCode(e.target.value)
                                                           setIsMelliCodeValid(false)
                                                           return;
                                                       }
                                                       if(e.target.value.length>10)
                                                           return
                                                       setMelliCode(e.target.value)
                                                       if(!melliCodeValidator(e.target.value)){
                                                           setIsMelliCodeValid(true)
                                                       }else{
                                                           setIsMelliCodeValid(false)
                                                       }

                                                   }}
                                                   value={melliCode}
                                                   className="form-control" id="validationCustom05"
                                                   placeholder="شماره ملی را وارد کنید..." required/>
                                            {isMelliCodeValid?(
                                                <p style={{color:"red"}}>شماره ملی نامعتبر است</p>
                                            ):null}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom04">تاریخ تولد {birthday}</label>
                                            {/*<input type="text"
                                                   name={"birthday"}
                                                   value={birthday}
                                                   onChange={(e)=>{
                                                       setBirthday(e.target.value)
                                                   }}
                                                   className="form-control" id="validationCustom04"
                                                   placeholder="تاریخ تولد را وارد کنید..." required/>*/}
                                            <PersianDatePickerComponent value={birthday} onSelect={(moment)=>{
                                                const miladiDate = moment.format("MM/DD/YYYY")
                                                const persianDate = moment.format("jYYYY/jMM/jDD")
                                                console.log(persianDate)
                                                console.log(miladiDate)
                                                setBirthday(persianDate)
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div>
                                                <label>انتخاب جنسیت</label>
                                                <select className="custom-select" onChange={(e)=>{
                                                    setGender(e.target.value)
                                                    formValidator.current.showMessageFor("gender")
                                                }}>
                                                    <option value={""} name={""}>انتخاب کنید</option>
                                                    <option value={"man"} name={"man"}>آقا</option>
                                                    <option value={"woman"} name={"woman"}>خانم</option>
                                                </select>
                                            </div>
                                            {formValidator.current.message("gender",gender,"required|min:3|max:5")}
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
export default UpsertPersonDialog
