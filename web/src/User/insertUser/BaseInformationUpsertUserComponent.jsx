import React, {useContext, useState} from 'react'
import {UpsertUserContext} from "./UpsertUserContext";
import {just_english, just_english_and_digit, just_persian, melliCodeValidator} from "../../utility/inputValidators";
const BaseInformationUpsertUserComponent = ()=>{
    const [inputType,setInputType] = useState("password")
    const {
        firstName,setFirstName,
        lastName,setLastName,
        phoneNumber,setPhoneNumber,
        userName,setUserName,
        password,setPassword,
        email,setEmail,
        position,setPosition,
        showMelliCodeError,setShowMelliCodeError,
        id,
        formValidator
    } = useContext(UpsertUserContext)
    return(
        <div className="card col-lg-6">
            <div className="card-body">
                <h4 className="card-title">مشخصات کاربر</h4>
                <p className="card-title-desc">در این قسمت باید اطلاعات کلی کاربر را وارد نمایید</p>
                <form className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validationCustom03">نام</label>
                                <input type="text" className="form-control" id="validationCustom03"
                                       value={firstName}
                                       name={"firstName"}
                                       onChange={(e)=>{
                                           if(just_persian(e.target.value) || e.target.value.length===0){
                                               formValidator.current.showMessageFor("firstName")
                                               setFirstName(e.target.value)
                                           }
                                       }}
                                       placeholder="نام را وارد کنید..." required/>
                                {formValidator.current.message("firstName",firstName,"required|min:2|max:80")}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validationCustom04">نام خانوادگی</label>
                                <input type="text"
                                       value={lastName}
                                       name={"lastName"}
                                       onChange={(e)=>{
                                           if(just_persian(e.target.value) || e.target.value.length===0){
                                               formValidator.current.showMessageFor("lastName")
                                               setLastName(e.target.value)
                                           }
                                       }}
                                       className="form-control" id="validationCustom04"
                                       placeholder="نام خانوادگی را وارد کنید..." required/>
                                {formValidator.current.message("lastName",lastName,"required|min:2|max:80")}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validationCustom05">شماره تماس</label>
                                <input type="number"
                                       name={phoneNumber}
                                       onChange={(e)=>{
                                           if(e.target.value.length>11)
                                               return
                                           formValidator.current.showMessageFor("phoneNumber")
                                           setPhoneNumber(e.target.value)
                                       }}
                                       value={phoneNumber}
                                       className="form-control" id="validationCustom05"
                                       placeholder="شماره تماس را وارد کنید..." required/>
                                {formValidator.current.message("phoneNumber",phoneNumber,"required|min:11|max:11")}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validationCustom05">شماره ملی (نام کاربری)</label>
                                <input type="number"
                                       disabled={id}
                                       name={userName}
                                       onChange={(e)=>{
                                           if(e.target.value.length>10)
                                               return
                                           setUserName(e.target.value)
                                           if(!melliCodeValidator(e.target.value)){
                                               setShowMelliCodeError(true)
                                           }else{
                                               setShowMelliCodeError(false)
                                           }

                                       }}
                                       value={userName}
                                       className="form-control" id="validationCustom05"
                                       placeholder="شماره ملی را وارد کنید..." required/>
                                {showMelliCodeError?(
                                    <p style={{color:"red"}}>شماره ملی نامعتبر است</p>
                                ):null}
                            </div>
                        </div>
                    </div>
                    {id?null:(
                      <div>
                          <hr/>
                          <div className="row">
                              <div className="form-group col-md-6">
                                  <div className={"row"}>
                                      <label htmlFor="validationCustom05">کلمه عبور</label>

                                  </div>
                                  <div className={"row"}>
                                      <div className={"col-lg-12"} >
                                          <div className="input-group">

                                              <input type={inputType}
                                                     onChange={(e)=> {
                                                         formValidator.current.showMessageFor("password")
                                                         if (!just_persian(e.target.value.substr(e.target.value.length-1,e.target.value.length)) || e.target.value.length === 0){
                                                             setPassword(e.target.value)
                                                         }
                                                     }}
                                                     aria-describedby="validationTooltipUsernamePrepend"
                                                     value={password}
                                                     className="form-control " id="validationCustom05"
                                                     placeholder="کلمه عبور را وارد کنید..." required/>
                                              <div className="input-group-prepend" style={{marginRight:-1}}>
                                                  <span className="input-group-text"
                                                        id="validationTooltipUsernamePrepend">
                                                      <i className="mdi mdi-eye " style={{fontSize:14,color:"#7c7c7c",cursor:"pointer"}} onClick={()=>{
                                                          setInputType(inputType==="text"?"password":"text")
                                                      }}/>
                                                  </span>
                                              </div>
                                          </div>

                                          <label style={{fontSize:11}}>کلمه عبور باید حداقل حاوی ۶ کارکتر، شامل حروف کوچک و بزرگ انگلیسی، عدد و نماد باشد.
                                          </label>
                                          {formValidator.current.message("password",password,"min:6|max:32|password|required")}
                                      </div>


                                  </div>
                              </div>
                              <div className="form-group col-md-6">
                                  <label htmlFor="validationCustom05">ایمیل</label>
                                  <input type="text"
                                         onChange={(e)=>{
                                             formValidator.current.showMessageFor("email")
                                             setEmail(e.target.value)
                                         }}
                                         value={email}
                                         className="form-control" id="validationCustom05"
                                         placeholder="ایمیل کاربر را وارد کنید" required/>
                                  {formValidator.current.message("email",email,"required|email")}
                              </div>
                          </div>
                      </div>
                    )}
                    <hr/>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="validationCustom05">سمت / عنوان شغلی</label>
                            <input type="text"
                                   onChange={(e)=>{
                                       formValidator.current.showMessageFor("position")
                                       setPosition(e.target.value)
                                   }}
                                   value={position}
                                   className="form-control" id="validationCustom05"
                                   placeholder="سمت کاربر را وارد کنید" required/>
                            {formValidator.current.message("position",position,"required|min:2|max:100")}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default BaseInformationUpsertUserComponent
