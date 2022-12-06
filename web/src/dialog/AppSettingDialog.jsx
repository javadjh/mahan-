import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Col, Divider, Form, Image, Input, Modal, Row } from "antd";
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
import {
  emailForm,
  maxForm,
  minForm,
  requiredForm,
} from "../config/formValidator";
import CustomButton from "../styled/components/CustomButton";
import { CenterStyled, SpaceStyled } from "../styled/global";
import { lightGreenColor } from "../app/appColor";
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
export const AppSettingDialog = ({
  visible,
  setVisible,
  setIsShowAppSetting,
}) => {
  const dispatch = useDispatch();
  const [illegalFormats, setIllegalFormats] = useState([]);
  const appSetting = useSelector((state) => state.appSetting);
  const [form] = Form.useForm();
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
    return () => {
      setIsShowAppSetting(false);
    };
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
    form.setFieldsValue(appSetting);
  }, [appSetting]);

  const getData = async () => {
    if (!handleHide("مدیریت اطلاعات پایه"))
      await dispatch(getAppSettingAction());
  };

  const sendData = async (formData) => {
    await dispatch(
      updateAppSettingAction({
        ...formData,
        ...{
          isSupervisorActive,
          illegalFormats,
        },
      })
    );
    setIsShowAppSetting(false);
  };
  const setUsersProfileImage = async (files) => {
    const file = new FormData();
    file.append("file", files[0]);
    await dispatch(changeAppSettingLogoAction(file));
  };
  return (
    <>
      <Form form={form} onFinish={sendData}>
        <div>
          <div>
            <SpaceStyled vertical={20}>
              <CenterStyled>
                <label htmlFor="input-url-logo">
                  <Image
                    width={256}
                    style={{
                      borderRadius: 1000,
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                    preview={false}
                    src={
                      appInfo.logo
                        ? `http://192.168.2.25:5000/${appInfo.logo}`
                        : "./assets/avatar.png"
                    }
                  />
                </label>
              </CenterStyled>
            </SpaceStyled>

            <div className="custom-control custom-checkbox col-lg-13 mx-0 my-4">
              <div className="custom-control custom-checkbox col-lg-13 mx-0 p-0"></div>
            </div>

            <Row>
              <Col span={11} offset={1}>
                <Form.Item name={"mailHost"} rules={[requiredForm]}>
                  <Input
                    dir={"ltr"}
                    placeholder="آدرس هاست سرویس ایمیل را وارد کنید..."
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item name={"mailPort"} rules={[requiredForm]}>
                  <Input
                    dir={"ltr"}
                    type="number"
                    placeholder="پورت سرویس ایمیل را وارد کنید..."
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name={"mailUser"}
                  rules={[requiredForm, emailForm("email")]}
                >
                  <Input
                    dir={"ltr"}
                    placeholder="ایمیل ارسال کننده را وارد کنید..."
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name={"mailPassword"}
                  rules={[requiredForm, minForm(8), maxForm(50)]}
                >
                  <Input placeholder="رمز عبور ایمیل را وارد کنید..." />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name={"mail"}
                  rules={[requiredForm, emailForm("email")]}
                >
                  <Input dir={"ltr"} placeholder="ایمیل را وارد کنید..." />
                </Form.Item>
              </Col>
            </Row>

            <div>
              <Divider></Divider>
              <SpaceStyled vertical={10}>
                <Row justify="center" align="middle">
                  <Col span={19} align="middle">
                    <Input
                      name={"value"}
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      placeholder="متن فرمت ممنوعه را وارد کنید"
                    />
                  </Col>
                  <Col span={5} align="middle">
                    <CustomButton
                      onClick={addToIllegalFormats}
                      className="btn btn-primary btn-block waves-effect waves-light mb-1 mt-4"
                    >
                      افزودن این فرمت
                    </CustomButton>
                  </Col>
                </Row>
                <SpaceStyled vertical={10}>
                  {illegalFormats.map((i) => (
                    <CustomButton
                      style={{ marginLeft: 10, marginBottom: 10 }}
                      onClick={() => {
                        deleteItemOfIllegalFormats(i);
                      }}
                    >
                      {i}
                    </CustomButton>
                  ))}
                </SpaceStyled>
              </SpaceStyled>
            </div>
            <SpaceStyled top={20}>
              <Row justify="end">
                <Col span={8}>
                  <CustomButton block color={lightGreenColor} htmlType="submit">
                    ثبت
                  </CustomButton>
                </Col>
              </Row>
            </SpaceStyled>
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
      </Form>
    </>
  );
};
export default AppSettingDialog;
