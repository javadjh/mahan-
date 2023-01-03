import { Col, Form, Input, message, Row } from "antd";
import React, { Fragment } from "react";
import CustomButton from "../../styled/components/CustomButton";
import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
import CustomMediumButton from "../../styled/components/CustomMediumButton";
import { darkBlueColor, grayColor, lightGreenColor } from "../../app/appColor";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";
import { useContext } from "react";
import { FormContext } from "../../context/form/FormContext";
import { maxForm, minForm, requiredForm } from "../../config/formValidator";
import CustomDialog from "../../styled/components/CustomDialog";
import FormViewerRoot from "../objects/view/FormViewerRoot";
import CustomInput from "../../styled/components/CustomInput";
import CustomTextArea from "../../styled/components/CustomTextArea";
const FormOptionsComponent = () => {
  const { form, child, sendData } = useContext(FormContext);
  return (
    <Fragment>
      <div>
        <Row justify="space-between">
          <Col span={11}>
            <CustomButton
              block
              onClick={() => {
                if (child.length == 0) {
                  message.error("عناصر فرم را انتخاب کنید");
                  return;
                } else {
                  form.submit();
                }
              }}
              color={lightGreenColor}
              icon={<AiOutlinePlus style={{ fontSize: 13 }} />}
            >
              ثبت فرم
            </CustomButton>
          </Col>
          <Col span={12} offset={1}>
            <CustomDialog
              title={"پیشنمایش"}
              render={<FormViewerRoot onSubmit={() => {}} child={child} />}
              actionRender={
                <CustomButton
                  block
                  color={grayColor}
                  icon={<AiOutlineEye style={{ fontSize: 13 }} />}
                >
                  پیشنمایش
                </CustomButton>
              }
            />
          </Col>
        </Row>
        <SpaceStyled top={20}>
          <Form layout="vertical" form={form} onFinish={sendData}>
            <SpaceStyled vertical={10}>
              <CustomText color={darkBlueColor}>اطلاعات فرم</CustomText>
            </SpaceStyled>
            <Form.Item
              label="عنوان"
              name={"title"}
              rules={[requiredForm, minForm(2), maxForm(80)]}
            >
              <Input placeholder="عنوان فرم را وارد کنید" />
            </Form.Item>
            <Form.Item label="توضیحات" name={"description"}>
              <Input.TextArea rows={5} placeholder="توضیحات فرم را وارد کنید" />
            </Form.Item>
          </Form>
        </SpaceStyled>
      </div>
    </Fragment>
  );
};
export default FormOptionsComponent;
