import React, { Fragment } from "react";
import { useContext } from "react";
import { Button, Col, Form, Row } from "antd";
import { FormViewerContext } from "../../../context/form/FormViewerContext";
import SimpleInputViewer from "./objects/SimpleInputViewer";
import TextAreaViewer from "./objects/TextAreaViewer";
import RadioButtonViewer from "./objects/RadioButtonViewer";
import CheckboxViewer from "./objects/CheckboxViewer";
import SelectorViewer from "./objects/SelectorViewer";
import DateViewer from "./objects/DateViewer";

const ObjectListViewer = () => {
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
  return (
    <Fragment>
      <Form onFinish={onFinishForm}>
        <Row>
          {child.map((item) => (
            <Col span={12}>
              <>{itemSwitcher(item)}</>
            </Col>
          ))}
        </Row>

        <Button htmlType="submit">ssdcsd</Button>
      </Form>
    </Fragment>
  );
};
export default ObjectListViewer;
