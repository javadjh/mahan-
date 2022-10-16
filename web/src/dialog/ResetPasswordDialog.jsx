import React, {Fragment, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {validatorSP} from "../utility/formValidator";
import {changePasswordAction} from "../stateManager/actions/UsersAction";
import {just_persian} from "../utility/inputValidators";
const ResetPasswordDialog = ()=>{
    const dispatch = useDispatch()
    const formValidator = useRef(validatorSP())
    const [oldInputType,setOldInputType] = useState("password")
    const [newInputType,setNewInputType] = useState("password")
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')

    const changePasswordHandle = async ()=>{
        if(formValidator.current.allValid()){
            await dispatch(changePasswordAction({
                oldPassword,
                newPassword
            },setOldPassword, setNewPassword))
        }
        window.$('#resetPasswordDialog').modal('hide')
    }
    return(
        <Fragment>
            <div className="modal fade" id="resetPasswordDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div  style={{marginRight:5,marginLeft:1}}>
                            <div className={"col-lg-12"}>
                                <p className={"m-0 p-0"}>کلمه عبور فعلی</p>
                                <div className="input-group">

                                    <input type={oldInputType}
                                           onChange={(e)=> {
                                               if (!just_persian(e.target.value.substr(e.target.value.length-1,e.target.value.length)) || e.target.value.length === 0){
                                                   formValidator.current.showMessageFor("oldPassword")
                                                   setOldPassword(e.target.value)
                                               }
                                           }}
                                           aria-describedby="validationTooltipUsernamePrepend"
                                           value={oldPassword}
                                           className="form-control col-lg-12 " id="validationCustom05"
                                           placeholder="کلمه عبور فعلی..." required/>
                                    <div className="input-group-prepend" style={{marginRight:-1}}>
                                              <span className="input-group-text"
                                                    id="validationTooltipUsernamePrepend">
                                                  <i className="mdi mdi-eye " style={{fontSize:14,color:"#7c7c7c",cursor:"pointer"}} onClick={()=>{
                                                      setOldInputType(oldInputType==="text"?"password":"text")
                                                  }}/>
                                              </span>
                                    </div>
                                </div>
                                {formValidator.current.message("oldPassword",oldPassword,"required|min:6|max:32")}
                            </div>
                            <div className={"col-lg-12"}>
                                <p className={"m-0 p-0"}>کلمه عبور جدید</p>
                                <div className="input-group">

                                    <input type={newInputType}
                                           onChange={(e)=> {
                                               if (!just_persian(e.target.value.substr(e.target.value.length-1,e.target.value.length)) || e.target.value.length === 0){
                                                   formValidator.current.showMessageFor("newPassword")
                                                   setNewPassword(e.target.value)
                                               }
                                           }}
                                           aria-describedby="validationTooltipUsernamePrepend"
                                           value={newPassword}
                                           className="form-control col-lg-12 " id="validationCustom05"
                                           placeholder="کلمه عبور جدید..." required/>
                                    <div className="input-group-prepend" style={{marginRight:-1}}>
                                              <span className="input-group-text"
                                                    id="validationTooltipUsernamePrepend">
                                                  <i className="mdi mdi-eye " style={{fontSize:14,color:"#7c7c7c",cursor:"pointer"}} onClick={()=>{
                                                      setNewInputType(newInputType==="text"?"password":"text")
                                                  }}/>
                                              </span>
                                    </div>
                                </div>
                                <label style={{fontSize:11}}>کلمه عبور باید حداقل حاوی ۶ کارکتر، شامل حروف کوچک و بزرگ انگلیسی، عدد و نماد باشد.
                                </label>

                                    {formValidator.current.message("newPassword",newPassword    ,"required|min:6|max:32")}
                            </div>
                            <button className={"btn btn-primary btn-block col-lg-4 mt-4"} onClick={changePasswordHandle}>ثبت</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ResetPasswordDialog
