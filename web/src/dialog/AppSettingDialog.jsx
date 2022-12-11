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
import CustomButton from "../styled/components/CustomButton";
import { CenterStyled, CustomCursor, SpaceStyled } from "../styled/global";
import { lightGreenColor } from "../app/appColor";
import { FRONT_IP, SERVER_IP } from "../config/ip";
import CustomEXShower from "../styled/components/CustomEXShower";
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
export const AppSettingDialog = ({ setIsShowAppSetting }) => {
  const dispatch = useDispatch();
  const [illegalFormats, setIllegalFormats] = useState([]);
  const appSetting = useSelector((state) => state.appSetting);
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [isSupervisorActive, setIsSupervisorActive] = useState(false);
  const [, setReloadForm] = useState();
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
    setIllegalFormats(
      appSetting?.illegalFormats ? appSetting?.illegalFormats : []
    );
    setIsSupervisorActive(appSetting.isSupervisorActive);
    form.setFieldsValue(appSetting);
  }, [appSetting]);

  const getData = async () => {
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
                        ? `${SERVER_IP}/${appInfo.logo}`
                        : "/assets/avatar.png"
                    }
                  />
                </label>
              </CenterStyled>
            </SpaceStyled>

            <div className="custom-control custom-checkbox col-lg-13 mx-0 my-4">
              <div className="custom-control custom-checkbox col-lg-13 mx-0 p-0"></div>
            </div>

            <SpaceStyled horizontal={20}>
              <Divider></Divider>
              <SpaceStyled vertical={10}>
                <Row justify="center" align="middle">
                  <Col span={19} align="middle">
                    <Input
                      maxLength={4}
                      name={"value"}
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      placeholder="متن فرمت ممنوعه را وارد کنید"
                    />
                  </Col>
                  <Col span={5} align="middle">
                    <SpaceStyled horizontal={10}>
                      <CustomButton
                        onClick={addToIllegalFormats}
                        className="btn btn-primary btn-block waves-effect waves-light mb-1 mt-4"
                      >
                        افزودن این فرمت
                      </CustomButton>
                    </SpaceStyled>
                  </Col>
                </Row>
                <SpaceStyled vertical={10}>
                  <Row>
                    {illegalFormats.map((i) => (
                      <Col>
                        <SpaceStyled horizontal={5}>
                          <CustomEXShower ex={i} />
                        </SpaceStyled>
                        <CenterStyled>
                          <CustomCursor>
                            <Image
                              onClick={() => {
                                deleteItemOfIllegalFormats(i);
                              }}
                              preview={false}
                              src={`${FRONT_IP}/assets/icons/remove.svg`}
                            />
                          </CustomCursor>
                        </CenterStyled>
                      </Col>
                    ))}
                  </Row>
                </SpaceStyled>
              </SpaceStyled>
            </SpaceStyled>
            <SpaceStyled top={20}>
              <CustomButton
                isLeft={true}
                color={lightGreenColor}
                htmlType="submit"
              >
                ثبت
              </CustomButton>
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
