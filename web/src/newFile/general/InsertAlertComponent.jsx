import { Form, Input } from "antd";
import React, { Fragment, useContext } from "react";
import { lightGreenColor } from "../../app/appColor";
import { maxForm, minForm, requiredForm } from "../../config/formValidator";
import { FileContext } from "../../context/file/FileContext";
import CustomButton from "../../styled/components/CustomButton";
import CustomDatePicker from "../../styled/components/CustomDatePicker";
import CustomLabel from "../../styled/components/CustomLabel";
import { SpaceStyled } from "../../styled/global";

const InsertAlertComponent = () => {
  const [form] = Form.useForm();
  const { insertFilesAlert } = useContext(FileContext);
  return (
    <Fragment>
      <CustomLabel title="افزودن هشدار جدید" icon="file" />
      <SpaceStyled top={40}>
        <Form
          form={form}
          onFinish={(formData) => {
            insertFilesAlert(formData);
            form.resetFields();
          }}
        >
          <Form.Item
            name={"title"}
            rules={[requiredForm, minForm(2), maxForm(80)]}
          >
            <Input placeholder="عنوان هشدار را وارد کنید" />
          </Form.Item>

          <Form.Item name={"alertDate"}>
            <CustomDatePicker />
          </Form.Item>

          <Form.Item name={"description"} rules={[requiredForm, minForm(2)]}>
            <Input.TextArea rows={4} placeholder="متن هشدار را تایپ کنید" />
          </Form.Item>
          <CustomButton htmlType="submit" color={lightGreenColor} isLeft={true}>
            ثبت اطلاعات
          </CustomButton>
        </Form>
      </SpaceStyled>
    </Fragment>
  );
};
export default InsertAlertComponent;
