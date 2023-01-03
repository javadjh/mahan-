import { Form, Input } from "antd";
import React, { Fragment, useState } from "react";
import { lightGreenColor } from "../../app/appColor";
import { minForm, requiredForm } from "../../config/formValidator";
import CustomButton from "../../styled/components/CustomButton";
import CustomInput from "../../styled/components/CustomInput";
const InsertApplicantDialog = ({ sendData }) => {
  const [form] = Form.useForm();
  return (
    <Fragment>
      <Form
        form={form}
        onFinish={async (formData) => {
          await sendData(formData);
          form.resetFields();
        }}
      >
        <p>افزودن سمت سازمانی</p>
        <Form.Item
          label="عنوان"
          name={"title"}
          rules={[requiredForm, minForm(3)]}
        >
          <Input placeholder={"عنوان را وارد کنید..."} />
        </Form.Item>
        <CustomButton color={lightGreenColor} htmlType="submit">
          ثبت
        </CustomButton>
      </Form>
    </Fragment>
  );
};
export default InsertApplicantDialog;
