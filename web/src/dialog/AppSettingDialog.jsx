import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Modal } from "antd";
import { validatorSP } from "../utility/formValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAppSettingLogoAction,
  getAppSettingAction,
  updateAppSettingAction,
} from "../stateManager/actions/AppSettingAction";
import { RootContext } from "../RootComponent/RootContext";
import { useHistory } from "react-router";
import { just_persian } from "../utility/inputValidators";
import { setUsersProfileImageAction } from "../stateManager/actions/UsersAction";
import { AppInfoReducer } from "../stateManager/reducers/AppInfoReducer";
const centerStyle = {
  color: "white",
  position: "absolute",
  bottom: 0,
  right: "20%",
  width: "60px",
  textAlign: "center",
  fontSize: "18px",
};
const imageStyle = {
  width: "250px",
  height: "250px",
  marginRight: 90,
  borderRadius: 200,
};
// updateAppSettingDialog
export const AppSettingDialog = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const [illegalFormats, setIllegalFormats] = useState([]);
  const appSetting = useSelector((state) => state.appSetting);
  const formValidator = useRef(validatorSP());
  const [mailHost, setMailHost] = useState("");
  const [mailPort, setMailPort] = useState("");
  const [mailUser, setMailUser] = useState("");
  const [value, setValue] = useState("");
  const [mailPassword, setMailPassword] = useState("");
  const [mail, setMail] = useState("");
  const [isSupervisorActive, setIsSupervisorActive] = useState(false);
  const [, setReloadForm] = useState();
  const { access, handleHide } = useContext(RootContext);
  const [inputType, setInputType] = useState("password");
  const appInfo = useSelector((state) => state.appInfo);

  const openDialog = () => {
    setVisible(true);
  };
  const closeDialog = () => {
    setVisible(false);
  };

  const addToIllegalFormats = () => {
    if (value.trim().length <= 1) return;
    let illegalFormatsCopy = illegalFormats;
    illegalFormatsCopy.push(value);
    setIllegalFormats(illegalFormatsCopy);
    setValue(``);
  };

  const deleteItemOfIllegalFormats = (item) => {
    let illegalFormatsCopy = illegalFormats;
    illegalFormatsCopy = illegalFormatsCopy.filter((i) => i !== item);
    setIllegalFormats(illegalFormatsCopy);
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setMailHost(appSetting.mailHost);
    setMailPort(appSetting.mailPort);
    setMailUser(appSetting.mailUser);
    setIllegalFormats(
      appSetting?.illegalFormats ? appSetting?.illegalFormats : []
    );
    setMailPassword(appSetting.mailPassword);
    setMail(appSetting.mail);
    setIsSupervisorActive(appSetting.isSupervisorActive);
  }, [appSetting]);

  const getData = async () => {
    if (!handleHide("مدیریت اطلاعات پایه"))
      await dispatch(getAppSettingAction());
  };

  const sendData = async () => {
    if (formValidator.current.allValid()) {
      await dispatch(
        updateAppSettingAction({
          mailHost,
          mailPort: Number(mailPort),
          mailUser,
          mailPassword,
          mail,
          isSupervisorActive,
          illegalFormats,
        })
      );
      closeDialog();
    } else {
      formValidator.current.showMessages();
      setReloadForm(1);
    }
  };
  const setUsersProfileImage = async (files) => {
    const file = new FormData();
    file.append("file", files[0]);
    await dispatch(changeAppSettingLogoAction(file));
  };
  return (
    <Modal
      style={{ top: 10 }}
      visible={visible}
      onCancel={closeDialog}
      width={"50%"}
      onOk={closeDialog}
      footer={[]}
    >
      <div>
        <div>
          <h3>تنظیمات عمومی</h3>
          <p>
            با استفاده از این فرم میتوانید اطلاعات پایه سامانه را ویرایش کنید
          </p>

          <div style={{ position: "relative" }}>
            <img
              src={
                appInfo.logo
                  ? `http://localhost:5000/${appInfo.logo}`
                  : "./assets/images/profile.png"
              }
              style={imageStyle}
              alt="Cinque Terre"
              width="100"
              height="100"
            />
            <label
              htmlFor="input-url-logo"
              style={centerStyle}
              className={"custom-cursor"}
            >
              <div style={{ height: "3.0rem", width: "3.0rem" }}>
                <span className="avatar-title rounded-circle">
                  <i className="mdi mdi-image-edit" style={{ fontSize: 20 }} />
                </span>
              </div>
            </label>
          </div>

          <div className="custom-control custom-checkbox col-lg-13 mx-0 my-4">
            <div className="custom-control custom-checkbox col-lg-13 mx-0 p-0"></div>
          </div>

          <div className={"row"}>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="validationCustom04">
                  آدرس هاست سرویس ایمیل
                </label>
                <input
                  dir={"ltr"}
                  type="text"
                  name={"mailHost"}
                  value={mailHost}
                  onChange={(e) => {
                    setMailHost(e.target.value);
                    formValidator.current.showMessageFor("mailHost");
                  }}
                  className="form-control"
                  id="validationCustom04"
                  placeholder="آدرس هاست سرویس ایمیل را وارد کنید..."
                  required
                />
                {formValidator.current.message(
                  "mailHost",
                  mailHost,
                  "required|min:2|max:80"
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="validationCustom04">پورت سرویس ایمیل</label>
                <input
                  dir={"ltr"}
                  type="number"
                  name={"mailPort"}
                  value={mailPort}
                  onChange={(e) => {
                    setMailPort(e.target.value);
                  }}
                  className="form-control"
                  id="validationCustom04"
                  placeholder="پورت سرویس ایمیل را وارد کنید..."
                  required
                />
              </div>
            </div>
          </div>
          <div className={"row"}>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="validationCustom04">ایمیل ارسال کننده </label>
                <input
                  dir={"ltr"}
                  type="text"
                  name={"mailUser"}
                  value={mailUser}
                  onChange={(e) => {
                    setMailUser(e.target.value);
                    formValidator.current.showMessageFor("mailUser");
                  }}
                  className="form-control"
                  id="validationCustom04"
                  placeholder="ایمیل ارسال کننده را وارد کنید..."
                  required
                />
                {formValidator.current.message(
                  "mailUser",
                  mailUser,
                  "required|email"
                )}
              </div>
            </div>
            {/*<div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="validationCustom04">رمز عبور ایمیل</label>
                                        <input
                                            dir={"ltr"}
                                            name={"mailPassword"}
                                            value={mailPassword}
                                            onChange={(e)=>{
                                                setMailPassword(e.target.value)
                                                formValidator.current.showMessageFor("mailPassword")
                                            }}
                                            className="form-control" id="validationCustom04"
                                            placeholder="رمز عبور ایمیل را وارد کنید..." required/>
                                        {formValidator.current.message("mailPassword",mailPassword,"required|min:8|max:50")}
                                    </div>
                                </div>*/}
            <div className={"col-lg-6"}>
              <label htmlFor="validationCustom04">رمز عبور ایمیل</label>
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
                      setMailPassword(e.target.value);
                      formValidator.current.showMessageFor("mailPassword");
                    }
                  }}
                  aria-describedby="validationTooltipUsernamePrepend"
                  value={mailPassword}
                  className="form-control "
                  id="validationCustom05"
                  placeholder="رمز عبور ایمیل را وارد کنید..."
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
                          inputType === "text" ? "password" : "text"
                        );
                      }}
                    />
                  </span>
                </div>
              </div>

              {formValidator.current.message(
                "mailPassword",
                mailPassword,
                "required|min:8|max:50"
              )}
            </div>
          </div>
          <div className={"row"}>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="validationCustom04">ایمیل</label>
                <input
                  dir={"ltr"}
                  type="text"
                  name={"mail"}
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                    formValidator.current.showMessageFor("mail");
                  }}
                  className="form-control"
                  id="validationCustom04"
                  placeholder="ایمیل را وارد کنید..."
                  required
                />
                {formValidator.current.message("mail", mail, "required|email")}
              </div>
            </div>
          </div>
          <div>
            <hr />
            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <label htmlFor="validationCustom04">
                    فرمت های ممنوع را وارد کنید
                  </label>
                  <input
                    type="text"
                    name={"value"}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    className="form-control"
                    id="validationCustom04"
                    placeholder="متن فرمت ممنوعه را وارد کنید"
                    required
                  />
                </div>
              </div>
              <div className="col-md-3 mt-1">
                <div className="form-group">
                  <button
                    type="button"
                    onClick={addToIllegalFormats}
                    className="btn btn-primary btn-block waves-effect waves-light mb-1 mt-4"
                  >
                    افزودن این فرمت
                  </button>
                </div>
              </div>
            </div>
            {illegalFormats.map((i) => (
              <button
                type="button"
                onClick={() => {
                  deleteItemOfIllegalFormats(i);
                }}
                className="btn btn-info waves-effect waves-light m-1"
              >
                {i}
              </button>
            ))}
          </div>
          <button
            closeDialog
            className={"btn btn-success px-5"}
            onClick={sendData}
          >
            ثبت
          </button>
        </div>
        <input
          type="file"
          id="input-url-logo"
          multiple="multiple"
          name={"imageUrl"}
          onChange={(e) => {
            setUsersProfileImage(e.target.files);
          }}
          style={{ visibility: "hidden" }}
          aria-describedby="imageUrl"
        />
      </div>
    </Modal>
  );
};
export default AppSettingDialog;
