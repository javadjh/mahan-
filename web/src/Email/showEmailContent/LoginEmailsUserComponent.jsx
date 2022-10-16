import React, {useRef, useState} from 'react'
import MainLayout from "../../RootComponent/MainLayout";
import useWindowDimensions from "../../utility/useWindowDimensions";
import {validatorSP} from "../../utility/formValidator";
import {getEmailAction} from "../../stateManager/actions/EmailAction";
import {useDispatch, useSelector} from "react-redux";
import ShowEmailContentRoot from "./ShowEmailContentRoot";
import {getDocumentsFileEmailService} from "../../service/EmailService";
import { saveAs } from 'file-saver';


const LoginEmailsUserComponent = ({match})=>{
    const email = useSelector(state => state.email)
    const dispatch = useDispatch()
    const formValidator = useRef(validatorSP())
    const emailId = match.params.id
    const {width} = useWindowDimensions()
    const [userName,setUserName] = useState()
    const [password,setPassword] = useState()

    const getDocumentsFileEmailHandle = async (documentId,title,ex)=>{
        const {data,status} = await getDocumentsFileEmailService({
            documentId,emailId: email._id,
            password,userName
        })
        if(status===200){
            if(ex==="png"||ex==="jpg"||ex==="jpge"||ex==="docx"||ex==="xlsm" || ex==="xlsx"||ex==="txt")
                ex = "pdf"
            saveAs(data,title + "." + ex)
        }
    }
    const sendDataAndGet = async ()=>{
        await dispatch(getEmailAction({
            id:emailId,
            password,
            userName
        }))
    }

    return(
        <MainLayout title={"نام کاربری و رمز عبور موقت "}>
            {email._id?(
                <ShowEmailContentRoot getDocumentsFileEmailHandle={getDocumentsFileEmailHandle}/>
            ):(
                <div className="account-pages my-5 ">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card overflow-hidden">
                                    <div className="bg-login text-center">
                                        <div className="bg-login-overlay"></div>
                                        <div className="position-relative">
                                            <h5 className="text-white font-size-20">جهت نمایش وارد شوید</h5>
                                            <p className="text-white-50 mb-0">نام کاربری و رمز عبور موقت ارسال شده در ایمیل را در پایین وارد کنید</p>
                                            <a href="index.html" className="logo logo-admin mt-4">
                                                <img src="assets/images/logo-sm-dark.png" alt="" height="30"/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body pt-5">
                                        <div className="p-2">

                                            <div className="form-group">
                                                <label htmlFor="username">نام کاربری</label>

                                                <input type="text" className="form-control"
                                                       value={userName}
                                                       onChange={(e)=>{
                                                           setUserName(e.target.value)
                                                           formValidator.current.showMessageFor("userName")
                                                       }}
                                                       id="username"
                                                       placeholder="نام کاربری را وارد کنید"/>
                                                {formValidator.current.message("userName",userName,"required|min:6|max:80")}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="userpassword">رمز عبور</label>
                                                <input type="password" value={password} className="form-control" id="userpassword"
                                                       onChange={(e)=>{
                                                           formValidator.current.showMessageFor("password")
                                                           setPassword(e.target.value)
                                                       }}
                                                       placeholder="رمز عبور را وارد کنید"/>
                                                {formValidator.current.message("password",password,"required|min:10|max:32")}
                                            </div>

                                            <div className="mt-3">
                                                <button
                                                    onClick={sendDataAndGet}
                                                    className="btn btn-primary btn-block waves-effect waves-light">نمایش اسناد
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            )}

        </MainLayout>
    )
}
export default LoginEmailsUserComponent
