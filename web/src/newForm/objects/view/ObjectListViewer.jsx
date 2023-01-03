import React, { Fragment, useEffect } from "react";
import { useContext } from "react";
import { Button, Col, Form, Row } from "antd";
import { FormViewerContext } from "../../../context/form/FormViewerContext";
import SimpleInputViewer from "./objects/SimpleInputViewer";
import TextAreaViewer from "./objects/TextAreaViewer";
import RadioButtonViewer from "./objects/RadioButtonViewer";
import CheckboxViewer from "./objects/CheckboxViewer";
import SelectorViewer from "./objects/SelectorViewer";
import DateViewer from "./objects/DateViewer";
import CustomButton from "../../../styled/components/CustomButton";
import Auth from "../../../auth/Auth";

const ObjectListViewer = () => {
  const [form] = Form.useForm();
  const { child, onFinishForm } = useContext(FormViewerContext);
  const itemSwitcher = (item) => {
    switch (item.type) {
      case "input":
        return <SimpleInputViewer item={item} />;
      case "textArea":
        return <TextAreaViewer item={item} />;
      case "radio":
        return <RadioButtonViewer item={item} />;
      case "checkBox":
        return <CheckboxViewer item={item} />;
      case "selector":
        return <SelectorViewer item={item} />;
      case "date":
        return <DateViewer item={item} />;
    }
  };
  useEffect(() => {
    let data = {};
    child.map((itm) => {
      data[itm.uiId] = itm.answer;
    });
    form.setFieldsValue(data);
  }, []);
  return (
    <Fragment>
      <Form layout="vertical" onFinish={onFinishForm} form={form}>
        <Row>
          {child.map((item, index) => (
            <Col
              span={index % 2 == 0 ? 12 : 11}
              offset={index % 2 == 0 ? 0 : 1}
            >
              <>{itemSwitcher(item)}</>
            </Col>
          ))}
        </Row>

        <Auth accessList={["ویرایش روکش پرونده"]}>
          <CustomButton block isLeft={true} htmlType="submit">
            ثبت
          </CustomButton>
        </Auth>
      </Form>
    </Fragment>
  );
};
export default ObjectListViewer;
