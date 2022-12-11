import React, { useEffect, useRef, useState } from "react";
import { validatorSP } from "../utility/formValidator";
import { useDispatch } from "react-redux";
import {
  loginAction,
  userForgetPasswordAction,
} from "../stateManager/actions/UsersAction";
import { useCookies } from "react-cookie";
import { appStatusService } from "../service/AppSettingService";
import { doneToast } from "../utility/ShowToast";
import axiosConfig from "../service/axiosConfig";
import LoadingComponent from "../RootComponent/LoadingComponent";
import { CardStyled, SpaceStyled } from "../styled/global";
import { Col, Form, Input, Row } from "antd";
import { BackgroundWave, LeftSideStyled } from "../styled/login";
import CustomText from "../styled/components/CustomText";
import CustomButton from "../styled/components/CustomButton";
import { darkBlueColor, lightGreenColor, whiteColor } from "../app/appColor";
import CustomNasq from "../styled/components/CustomNasq";
import { maxForm, minForm, requiredForm } from "../config/formValidator";
import CustomMediumButton from "../styled/components/CustomMediumButton";
import { SERVER_IP } from "../config/ip";
const LoginComponent = () => {
  const [isInitState, setIsInitState] = useState(true);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
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
    const { status } = await axiosConfig.get(`${SERVER_IP}/init/${license}`);
    if (status === 200) {
      doneToast("با موفقیت ارسال شد");
      window.location.reload();
    }
  };
  return (
    <LoadingComponent isLoaded={isLoadData}>
      <div style={{ width: "100%" }}>
        <Row>
          <Col span={16}>
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
              <CardStyled style={{ minWidth: 400 }}>
                <SpaceStyled horizontal={20}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <CustomText color={whiteColor} size={17}>
                        فرم حساب کاربری
                      </CustomText>
                    </Col>
                    <Col>
                      <CustomText size={11} color={whiteColor}>
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
                                  className="login-input"
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
                                  className="login-input"
                                  type={"email"}
                                  placeholder={"ایمیل خود را وارد کنید"}
                                />
                              </Form.Item>
                            </SpaceStyled>
                            <SpaceStyled top={40}>
                              <CustomMediumButton
                                color={lightGreenColor}
                                htmlType={"submit"}
                                height={70}
                                block
                              >
                                ارسال ایمیل
                              </CustomMediumButton>
                              <SpaceStyled top={10}>
                                <CustomMediumButton
                                  height={70}
                                  textColor={whiteColor}
                                  block
                                  isBordred={true}
                                  color={"rgba(255, 255, 255, 0.15)"}
                                  onClick={() =>
                                    setIsForgetPassword(!isForgetPassword)
                                  }
                                >
                                  {isForgetPassword
                                    ? "کلمه ی عبور یادم اومد"
                                    : "رمز عبورم رو فراموش کردم"}
                                </CustomMediumButton>
                              </SpaceStyled>
                            </SpaceStyled>
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
                                  className="login-input"
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
                                  className="login-input"
                                  type={"password"}
                                  placeholder={"گذرواژه خود را وارد کنید"}
                                />
                              </Form.Item>
                            </SpaceStyled>
                            <SpaceStyled top={40}>
                              <CustomMediumButton
                                color={lightGreenColor}
                                htmlType={"submit"}
                                height={70}
                                block
                              >
                                ورود به حساب کاربری
                              </CustomMediumButton>
                              <SpaceStyled top={10}>
                                <CustomMediumButton
                                  height={70}
                                  textColor={whiteColor}
                                  block
                                  isBordred={true}
                                  color={"rgba(255, 255, 255, 0.15)"}
                                  onClick={() =>
                                    setIsForgetPassword(!isForgetPassword)
                                  }
                                >
                                  {isForgetPassword
                                    ? "کلمه ی عبور یادم اومد"
                                    : "رمز عبورم رو فراموش کردم"}
                                </CustomMediumButton>
                              </SpaceStyled>
                            </SpaceStyled>
                          </Form>
                        </span>
                      )}
                    </SpaceStyled>
                  ) : (
                    <Form onFinish={checkLicenseCode}>
                      <SpaceStyled vertical={15}>
                        <Form.Item name={"license"} rules={[requiredForm]}>
                          <Input
                            className="login-input"
                            placeholder={"کد لایسنس را وارد کنید"}
                          />
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
          <Col span={8}>
            <LeftSideStyled></LeftSideStyled>
          </Col>
        </Row>
      </div>
    </LoadingComponent>
  );
};
export default LoginComponent;
