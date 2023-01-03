import React from "react";
import { Col, Form, Image, Input, Row } from "antd";
import CustomButton from "../../styled/components/CustomButton";
import { lightGreenColor } from "../../app/appColor";
import { useContext } from "react";
import { DocumentContext } from "../../context/document/DocumentContext";
import { minForm, requiredForm } from "../../config/formValidator";
import CustomTextArea from "../../styled/components/CustomTextArea";

const InsertDocumentsNoteComponent = () => {
  const { addNewNoteForDocument } = useContext(DocumentContext);
  const [form] = Form.useForm();
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={(formData) => {
        addNewNoteForDocument(formData);
        form.resetFields();
      }}
    >
      <Row align="middle">
        <Col span={19}>
          <Form.Item
            label="متن یادداشت"
            name={"description"}
            rules={[requiredForm, minForm(2)]}
          >
            <Input.TextArea rows={4} placeholder="متن یادداشت را تایپ کنید" />
          </Form.Item>
        </Col>
        <Col span={4} offset={1}>
          <CustomButton
            htmlType={"submit"}
            // icon={<Image src="/assets/icons/plus.svg" preview={false} />}
            color={lightGreenColor}
          >
            ثبت یادداشت
          </CustomButton>
        </Col>
        <Col></Col>
      </Row>
    </Form>
  );
};
export default InsertDocumentsNoteComponent;
