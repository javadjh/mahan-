import React, { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { validatorSP } from "../utility/formValidator";
import { changePasswordAction } from "../stateManager/actions/UsersAction";
import { just_persian } from "../utility/inputValidators";
import { Form, Input } from "antd";
import CustomButton from "../styled/components/CustomButton";
import { passwordRule, requiredForm } from "../config/formValidator";
import CustomInput from "../styled/components/CustomInput";
const ResetPasswordDialog = ({ setIsResetPasswordDialogShow }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const changePasswordHandle = async (formData) => {
    await dispatch(changePasswordAction(formData));
    setIsResetPasswordDialogShow(false);
    form.resetFields();
  };
  return (
    <Fragment>
      <Form layout="vertical" form={form} onFinish={changePasswordHandle}>
        <Form.Item rules={[requiredForm]} name={"oldPassword"}>
          <Input type="password" placeholder="کلمه ی عبور فعلی" />
        </Form.Item>
        <Form.Item rules={[requiredForm, passwordRule]} name={"newPassword"}>
          <Input type="password" placeholder="کلمه ی عبور جدید" />
        </Form.Item>
        <CustomButton htmlType={"submit"}>ثبت</CustomButton>
      </Form>
    </Fragment>
  );
};
export default ResetPasswordDialog;
