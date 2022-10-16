import React, { useEffect, useRef, useState } from "react";
import { validatorSP } from "../utility/formValidator";
import { useDispatch } from "react-redux";
import {
  loginAction,
  userForgetPasswordAction,
} from "../stateManager/actions/UsersAction";
import {
  just_english_and_digit,
  just_password,
  just_persian,
} from "../utility/inputValidators";
import { useCookies } from "react-cookie";
import { appStatusService } from "../service/AppSettingService";
import { doneToast, errorToast } from "../utility/ShowToast";
import axiosConfig from "../service/axiosConfig";
const LoginComponent = () => {
  const formValidator = useRef(validatorSP());
  const [isInitState, setIsInitState] = useState(true);
  const [isLoadData, setIsLoadData] = useState(false);
  const [license, setLicense] = useState();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  const [, setValidationReload] = useState();
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [cookies, setCookie] = useCookies(["isLogin"]);
  const dispatch = useDispatch();
  const sendData = async () => {
    if (formValidator.current.allValid()) {
      if (isForgetPassword)
        await dispatch(userForgetPasswordAction({ userName, email }));
      else if (!password || !userName) {
        errorToast("نام کاربری و یا رمز عبور را وارد کنید");
        return;
      }
      await dispatch(loginAction({ password, userName }, setCookie));
    } else {
      formValidator.current.showMessages();
      setValidationReload(1);
    }
  };
  useEffect(() => {
    isInit();
  }, []);
  const isInit = async () => {
    const { data, status } = await appStatusService();
    if (status === 200) {
      setIsInitState(data);
      setIsLoadData(true);
    }
  };
  const checkLicenseCode = async () => {
    if (license) {
      const { status } = await axiosConfig.get(
        `http://localhost:5000/init/${license}`
      );
      if (status === 200) {
        doneToast("با موفقیت ارسال شد");
        window.location.reload();
      }
    }
  };
  return (
    <div className="account-pages my-5 ">
      {isLoadData ? (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">
                      سامانه مدیریت اسناد ماهان
                    </h5>
                    <p className="text-white-50 mb-0">
                      شرکت لیلو هوشمندسازان اروند
                    </p>
                    <a href="index.html" className="logo logo-admin mt-4">
                      <img src="./assets/images/logo.png" alt="" height="50" />
                    </a>
                  </div>
                </div>
                <div className="card-body pt-5 text-left">
                  {isInitState ? (
                    <div className="p-2">
                      <div className="form-group">
                        <label htmlFor="username">نام کاربری</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userName}
                          onChange={(e) => {
                            if (just_english_and_digit(e.target.value)) {
                              setUserName(e.target.value);
                              formValidator.current.showMessageFor("userName");
                            } else {
                              setUserName(userName);
                            }
                          }}
                          id="username"
                          placeholder="نام کاربری را وارد کنید"
                        />
                        {formValidator.current.message(
                          "userName",
                          userName,
                          "required|min:3|max:80"
                        )}
                      </div>
                      {isForgetPassword ? (
                        <>
                          <div className="form-group">
                            <label htmlFor="userpassword">ایمیل</label>
                            <input
                              type="text"
                              className="form-control"
                              value={email}
                              id="userpassword"
                              onChange={(e) => {
                                formValidator.current.showMessageFor("email");
                                setEmail(e.target.value);
                              }}
                              placeholder="رمز عبور را وارد کنید"
                            />
                            {formValidator.current.message(
                              "email",
                              email,
                              "email"
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group">
                            <label htmlFor="userpassword">رمز عبور</label>
                            {/*<input type="password" value={password} className="form-control" id="userpassword"
                                                       onChange={(e)=>{
                                                           formValidator.current.showMessageFor("password")
                                                           setPassword(e.target.value)
                                                       }}
                                                       placeholder="رمز عبور را وارد کنید"/>
                                                {formValidator.current.message("password",password,"min:8|max:32")}*/}
                            <div className={"row"}>
                              <div className={"col-lg-12"}>
                                <div className="input-group">
                                  <input
                                    type={inputType}
                                    onChange={(e) => {
                                      if (
                                        !just_persian(
                                          e.target.value.substr(
                                            e.target.value.length - 1,
                                            e.target.value.length
                                          )
                                        ) ||
                                        e.target.value.length === 0
                                      ) {
                                        formValidator.current.showMessageFor(
                                          "password"
                                        );
                                        setPassword(e.target.value);
                                      }
                                    }}
                                    aria-describedby="validationTooltipUsernamePrepend"
                                    value={password}
                                    className="form-control "
                                    id="validationCustom05"
                                    placeholder="کلمه عبور را وارد کنید..."
                                    required
                                  />
                                  <div
                                    className="input-group-prepend"
                                    style={{ marginRight: -1 }}
                                  >
                                    <span
                                      className="input-group-text"
                                      id="validationTooltipUsernamePrepend"
                                    >
                                      <i
                                        className="mdi mdi-eye "
                                        style={{
                                          fontSize: 14,
                                          color: "#7c7c7c",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          setInputType(
                                            inputType === "text"
                                              ? "password"
                                              : "text"
                                          );
                                        }}
                                      />
                                    </span>
                                  </div>
                                </div>

                                {formValidator.current.message(
                                  "password",
                                  password,
                                  "min:6|max:32|password"
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="mt-3">
                        <button
                          onClick={sendData}
                          className="btn btn-primary btn-block waves-effect waves-light"
                        >
                          {isForgetPassword ? "ارسال ایمیل" : "ورود"}
                        </button>
                        <p
                          style={{ color: "royalblue" }}
                          className={"custom-cursor mt-2 mb-0"}
                          onClick={() => {
                            setIsForgetPassword(!isForgetPassword);
                          }}
                        >
                          {isForgetPassword ? "بازگشت" : "فراموشی رمز عبور"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="form-group">
                        <label htmlFor="username">کد لایسنس</label>
                        <input
                          type="text"
                          className="form-control"
                          value={license}
                          onChange={(e) => {
                            setLicense(e.target.value);
                          }}
                          id="username"
                          placeholder="کد لایسنس را وارد نمایید..."
                        />
                        {formValidator.current.message(
                          "userName",
                          userName,
                          "required|min:3|max:80"
                        )}
                      </div>
                      <button
                        onClick={checkLicenseCode}
                        className="btn btn-primary btn-block waves-effect waves-light"
                      >
                        ثبت
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default LoginComponent;
