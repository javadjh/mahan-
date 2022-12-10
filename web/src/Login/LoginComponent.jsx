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
import LoadingComponent from "../RootComponent/LoadingComponent";
import {
  BlueBackground,
  CardStyled,
  CenterStyled,
  CenterVerticalStyled,
  SpaceStyled,
} from "../styled/global";
import { Col, Form, Image, Input, Row } from "antd";
import { BackgroundWave, LeftSideStyled } from "../styled/login";
import CustomText from "../styled/components/CustomText";
import CustomInput from "../styled/components/CustomInput";
import CustomButton from "../styled/components/CustomButton";
import { CaretLeftOutlined } from "@ant-design/icons";
import { darkBlueColor, lightGreenColor, whiteColor } from "../app/appColor";
import CustomNasq from "../styled/components/CustomNasq";
import {
  maxForm,
  minForm,
  passwordRule,
  requiredForm,
} from "../config/formValidator";
const LoginComponent = () => {
  const formValidator = useRef(validatorSP());
  const [isInitState, setIsInitState] = useState(true);
  const [isLoadData, setIsLoadData] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  const [, setValidationReload] = useState();
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [cookies, setCookie] = useCookies(["isLogin"]);
  const dispatch = useDispatch();
  const sendData = async (formData) => {
    if (isForgetPassword) await dispatch(userForgetPasswordAction(formData));
    else await dispatch(loginAction(formData, setCookie));
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
  const checkLicenseCode = async ({ license }) => {
    console.log(license);
    const { status } = await axiosConfig.get(
      `http://localhost:5000/init/${license}`
    );
    if (status === 200) {
      doneToast("با موفقیت ارسال شد");
      window.location.reload();
    }
  };
  return (
    <LoadingComponent isLoaded={isLoadData}>
      <div style={{ width: "100%" }}>
        <Row>
          <Col span={17}>
            <BackgroundWave>
              <Row justify="center" align="middle">
                <Col>
                  <CustomNasq size={60} color={darkBlueColor}>
                    ماهان
                  </CustomNasq>
                </Col>
                <Col>
                  <SpaceStyled right={20} top={-20}>
                    <CustomText>سامــانــه</CustomText>
                    <CustomText>مدیریت اسناد</CustomText>
                  </SpaceStyled>
                </Col>
              </Row>
              <CardStyled style={{ minWidth: 500 }}>
                <SpaceStyled vertical={20} horizontal={20}>
                  <Row justify="space-between">
                    <Col>
                      <CustomText size={17}>فرم حساب کاربری</CustomText>
                    </Col>
                    <Col>
                      <CustomText>
                        برای ورود اطلاعات خود را وارد کنید
                      </CustomText>
                    </Col>
                  </Row>
                  {isInitState ? (
                    <SpaceStyled vertical={20}>
                      {isForgetPassword ? (
                        <span>
                          <Form onFinish={sendData}>
                            <SpaceStyled vertical={15}>
                              <Form.Item
                                name={"userName"}
                                rules={[maxForm(11), minForm(3)]}
                              >
                                <Input
                                  placeholder={"نام کاربری خود را وارد کنید"}
                                />
                              </Form.Item>
                            </SpaceStyled>
                            <SpaceStyled vertical={15}>
                              <Form.Item
                                name={"email"}
                                rules={[maxForm(80), minForm(6)]}
                              >
                                <Input
                                  type={"email"}
                                  placeholder={"ایمیل خود را وارد کنید"}
                                />
                              </Form.Item>
                            </SpaceStyled>
                            <Row>
                              <Col span={12}>
                                <CustomButton htmlType={"submit"} block>
                                  ارسال ایمیل
                                </CustomButton>
                              </Col>
                              <Col span={12}>
                                <SpaceStyled right={10}>
                                  <CustomButton
                                    block
                                    onClick={() =>
                                      setIsForgetPassword(!isForgetPassword)
                                    }
                                    color={lightGreenColor}
                                  >
                                    {isForgetPassword
                                      ? "کلمه ی عبور یادم اومد"
                                      : "رمز عبورم رو فراموش کردم"}
                                  </CustomButton>
                                </SpaceStyled>
                              </Col>
                            </Row>
                          </Form>
                        </span>
                      ) : (
                        <span>
                          <Form onFinish={sendData}>
                            <SpaceStyled vertical={15}>
                              <Form.Item
                                name={"userName"}
                                rules={[maxForm(11), minForm(3)]}
                              >
                                <Input
                                  placeholder={"نام کاربری خود را وارد کنید"}
                                />
                              </Form.Item>
                            </SpaceStyled>
                            <SpaceStyled vertical={15}>
                              <Form.Item
                                name={"password"}
                                rules={[maxForm(80), minForm(6)]}
                              >
                                <Input
                                  type={"password"}
                                  placeholder={"گذرواژه خود را وارد کنید"}
                                />
                              </Form.Item>
                            </SpaceStyled>
                            <Row>
                              <Col span={12}>
                                <CustomButton htmlType={"submit"} block>
                                  ورود به حساب کاربری
                                </CustomButton>
                              </Col>
                              <Col span={12}>
                                <SpaceStyled right={10}>
                                  <CustomButton
                                    block
                                    onClick={() =>
                                      setIsForgetPassword(!isForgetPassword)
                                    }
                                    color={lightGreenColor}
                                  >
                                    {isForgetPassword
                                      ? "کلمه ی عبور یادم اومد"
                                      : "رمز عبورم رو فراموش کردم"}
                                  </CustomButton>
                                </SpaceStyled>
                              </Col>
                            </Row>
                          </Form>
                        </span>
                      )}
                    </SpaceStyled>
                  ) : (
                    <Form onFinish={checkLicenseCode}>
                      <SpaceStyled vertical={15}>
                        <Form.Item name={"license"} rules={[requiredForm]}>
                          <Input placeholder={"کد لایسنس را وارد کنید"} />
                        </Form.Item>
                      </SpaceStyled>

                      <CustomButton htmlType={"submit"} block>
                        کد لایسنس
                      </CustomButton>
                    </Form>
                  )}
                </SpaceStyled>
              </CardStyled>
            </BackgroundWave>
          </Col>
          <Col span={7}>
            <LeftSideStyled></LeftSideStyled>
          </Col>
        </Row>
      </div>
    </LoadingComponent>
  );
};
export default LoginComponent;
