import { Col, Form, Input, Row } from "antd";
import React, { useContext } from "react";
import CustomCard from "../../styled/components/CustomCard";
import CustomButton from "../../styled/components/CustomButton";
import { SpaceStyled } from "../../styled/global";
import { UpsertRoleContext } from "./UpsertRoleContext";
import { maxForm, minForm, requiredForm } from "../../config/formValidator";
import CustomInput from "../../styled/components/CustomInput";
import CustomTextArea from "../../styled/components/CustomTextArea";
const BaseInformationUpsertRoleComponent = ({ insertRoleHandle }) => {
  const { title, setTitle, description, setDescription, formValidator, form } =
    useContext(UpsertRoleContext);

  return (
    <div style={{ height: 450 }}>
      <CustomCard>
        <h4>اطلاعات پایه</h4>
        <p>در این قسمت باید اطلاعات کلی نقش را وارد نمایید</p>
        <Form layout="vertical" form={form} onFinish={insertRoleHandle}>
          <div>
            <div>
              <Col span={24}>
                <Form.Item
                  name={"title"}
                  label="عنوان نقش"
                  rules={[minForm(2), maxForm(150), requiredForm]}
                >
                  <Input placeholder={"عنوان نقش را وارد کنید..."} />
                </Form.Item>
              </Col>
            </div>
          </div>
          <SpaceStyled top={20}>
            <Col span={24}>
              <Form.Item
                label="توضیحات نقش"
                name={"description"}
                rules={[minForm(2), maxForm(500)]}
              >
                <Input.TextArea
                  rows="4"
                  placeholder={"توضیحات نقش را وارد کنید..."}
                />
              </Form.Item>

              <SpaceStyled top={30}>
                <Row justify="end">
                  <Col span={8}>
                    <CustomButton block type="button" htmlType={"submit"}>
                      ثبت
                    </CustomButton>
                  </Col>
                </Row>
              </SpaceStyled>
            </Col>
          </SpaceStyled>
        </Form>
      </CustomCard>
    </div>
  );
};
export default BaseInformationUpsertRoleComponent;
