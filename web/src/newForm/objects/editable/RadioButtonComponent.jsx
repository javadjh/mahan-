import React, { Fragment } from "react";
import { Col, Collapse, Divider, Form, Input, Radio, Row, Space } from "antd";
import { CustomCollapse } from "../../forms.styled";
import { SpaceStyled } from "../../../styled/global";
import CustomCheckbox from "../../../styled/components/CustomCheckbox";
import { useContext } from "react";
import { FormContext } from "../../../context/form/FormContext";
import CustomText from "../../../styled/components/CustomText";
import { maxForm, minForm, requiredForm } from "../../../config/formValidator";
import { darkBlueColor, redColor } from "../../../app/appColor";
import CustomMediumButton from "../../../styled/components/CustomMediumButton";
import CustomButton from "../../../styled/components/CustomButton";
const RadioButtonComponent = ({ item }) => {
  const [form] = Form.useForm();
  const { setLabel, setRequired, setValues, deleteValue } =
    useContext(FormContext);
  return (
    <Fragment>
      <SpaceStyled left={20} bottom={20}>
        <CustomCollapse>
          <Collapse.Panel
            header={
              <>
                <SpaceStyled vertical={10}>
                  <CustomText color={darkBlueColor}>
                    دریافت یک گزینه از چند گزینه
                  </CustomText>
                </SpaceStyled>
                <Input
                  rows={5}
                  value={item.label}
                  placeholder="عنوان / برچسب"
                  onChange={(e) => setLabel(item.uiId, e?.target?.value)}
                />
              </>
            }
            key="1"
          >
            <Row justify="space-between">
              <Col span={16}></Col>
              <Col span={8}>
                <CustomCheckbox
                  checked={item.isRequired}
                  onChange={(e) => setRequired(item.uiId, e)}
                >
                  اجباری
                </CustomCheckbox>
              </Col>
            </Row>
            <Divider />
            <SpaceStyled>
              <Row>
                <Col span={24}>
                  <Form
                    form={form}
                    onFinish={(formData) => {
                      setValues(item.uiId, formData.text);
                      form.resetFields();
                    }}
                  >
                    <Row>
                      <Col span={20}>
                        <SpaceStyled left={10}>
                          <Form.Item
                            name={"text"}
                            rules={[requiredForm, minForm(1), maxForm(60)]}
                          >
                            <Input placeholder="متن گزینه" />
                          </Form.Item>
                        </SpaceStyled>
                      </Col>
                      <Col span={4}>
                        <SpaceStyled top={5}>
                          <CustomButton
                            block
                            onClick={() => {
                              form.submit();
                            }}
                          >
                            افزودن
                          </CustomButton>
                        </SpaceStyled>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col span={24}>
                  <Radio.Group>
                    <Space direction="vertical">
                      {item?.values?.map((val) => (
                        <Radio key={val} value={val}>
                          <Row>
                            <Col>
                              <CustomText>{val}</CustomText>
                            </Col>
                            <Col>
                              <SpaceStyled right={5}>
                                <CustomText
                                  onClick={() => {
                                    deleteValue(item.uiId, val);
                                  }}
                                  color={redColor}
                                >
                                  حذف
                                </CustomText>
                              </SpaceStyled>
                            </Col>
                          </Row>
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Col>
              </Row>
            </SpaceStyled>
          </Collapse.Panel>
        </CustomCollapse>
      </SpaceStyled>
    </Fragment>
  );
};
export default RadioButtonComponent;
