import { Col, Form, Image, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkBlueColor, redColor } from "../app/appColor";
import {
  setUsersProfileImageAction,
  updateProfileAction,
  usersProfileAction,
} from "../stateManager/actions/UsersAction";
import CustomCard from "../styled/components/CustomCard";
import CustomText from "../styled/components/CustomText";
import CustomButton from "../styled/components/CustomButton";
import { CenterStyled, CustomCursor, SpaceStyled } from "../styled/global";
import { validatorSP } from "../utility/formValidator";
import { just_persian } from "../utility/inputValidators";
import ResetPasswordDialog from "../dialog/ResetPasswordDialog";
import CustomDialog from "../styled/components/CustomDialog";
import {
  emailForm,
  maxForm,
  minForm,
  requiredForm,
} from "../config/formValidator";
const centerStyle = {
  color: "white",
  position: "absolute",
  bottom: 0,
  right: "25%",
  width: "60px",
  textAlign: "center",
  fontSize: "18px",
};
const imageStyle = {
  width: "250px",
  height: "250px",
  borderRadius: 200,
};
const UsersProfileComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formValidatorProfile = useRef(validatorSP());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [, setReload] = useState();
  const userProfile = useSelector((state) => state.userProfile);
  const [isFormDisable, setIsFormDisable] = useState(true);
  const [isResetPasswordDialogShow, setIsResetPasswordDialogShow] =
    useState(false);

  useEffect(() => {
    setFirstName(userProfile.firstName);
    setLastName(userProfile.lastName);
    setEmail(userProfile.email);
    setPhoneNumber(userProfile.phoneNumber);
    form.setFieldsValue(userProfile);
  }, [userProfile, isEditable]);

  const onUpdateProfileHandle = async (formData) => {
    await dispatch(
      updateProfileAction({
        ...formData,
        ...{ userName: undefined, createDate: undefined },
      })
    );
    setIsFormDisable(true);
  };

  const setUsersProfileImage = async (files) => {
    const file = new FormData();
    file.append("file", files[0]);
    await dispatch(setUsersProfileImageAction(file));
  };
  return (
    <CustomCard>
      <CenterStyled>
        <label htmlFor="input-url-profile">
          <Image
            preview={false}
            style={{
              borderRadius: 1000,
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
            width={256}
            src={
              userProfile.profileImage
                ? `http://localhost:5000/${userProfile._id}/${userProfile.profileImage}`
                : "./assets/avatar.png"
            }
          />
        </label>
        <SpaceStyled vertical={10}>
          <CustomDialog
            title={"تغییر کلمه ی عبور"}
            render={
              <ResetPasswordDialog
                setIsResetPasswordDialogShow={setIsResetPasswordDialogShow}
              />
            }
            actionRender={
              <CustomCursor>
                <CustomText color={redColor}>تغییر رمز عبور</CustomText>
              </CustomCursor>
            }
            isShow={isResetPasswordDialogShow}
          />
          <CenterStyled>
            {isFormDisable ? (
              <SpaceStyled vertical={20}>
                <CustomCursor
                  onClick={() => {
                    setIsFormDisable(false);
                  }}
                >
                  <CustomText color={darkBlueColor}>ویرایش پروفایل</CustomText>
                </CustomCursor>
              </SpaceStyled>
            ) : (
              <SpaceStyled vertical={20}>
                <CustomCursor
                  onClick={() => {
                    form.setFieldsValue(userProfile);
                    setIsFormDisable(true);
                  }}
                >
                  <CustomText color={redColor}>انصراف</CustomText>
                </CustomCursor>
              </SpaceStyled>
            )}
          </CenterStyled>
        </SpaceStyled>
      </CenterStyled>
      <Form
        form={form}
        onFinish={onUpdateProfileHandle}
        disabled={isFormDisable}
      >
        <Row>
          <Col span={11} offset={1}>
            <Form.Item
              rules={[requiredForm, minForm(2), maxForm(50)]}
              name={"firstName"}
            >
              <Input placeholder="نام را وارد کنید" />
            </Form.Item>
          </Col>

          <Col span={11} offset={1}>
            <Form.Item
              rules={[requiredForm, minForm(2), maxForm(50)]}
              name={"lastName"}
            >
              <Input placeholder="نام خانوادگی را وارد کنید" />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              rules={[requiredForm, emailForm("email")]}
              name={"email"}
            >
              <Input placeholder="ایمیل را وارد کنید" />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              rules={[requiredForm, minForm(11), maxForm(11)]}
              name={"phoneNumber"}
            >
              <Input placeholder="شماره تماس را وارد کنید" />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item name={"userName"} disabled>
              <Input placeholder="نام کاربری را وارد کنید" />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item name={"createDate"} disabled>
              <Input placeholder="تاریخ ثبت را وارد کنید" />
            </Form.Item>
          </Col>
          {!isFormDisable && (
            <Col span={11} offset={1}>
              <CustomButton htmlType={"submit"}>ثبت</CustomButton>
            </Col>
          )}
        </Row>
      </Form>
      <input
        type="file"
        id="input-url-profile"
        multiple="multiple"
        name={"imageUrl"}
        onChange={(e) => {
          setUsersProfileImage(e.target.files);
        }}
        style={{ visibility: "hidden" }}
        aria-describedby="imageUrl"
      />
    </CustomCard>
  );
};
export default UsersProfileComponent;
