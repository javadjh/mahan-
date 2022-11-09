import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Form, Input, Row } from "antd";
import CustomButton from "../../styled/components/CustomButton";
import { maxForm, minForm, requiredForm } from "../../config/formValidator";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import { CenterVerticalStyled, SpaceStyled } from "../../styled/global";

const AddTreeDialog = ({ setIsShowInsertTreeDialog }) => {
  const { insertTree } = useContext(ArchiveTreeContext);
  return (
    <Fragment>
      <Form
        onFinish={(formData) => {
          setIsShowInsertTreeDialog(false);
          insertTree(formData);
        }}
      >
        <Row>
          <Col span={17}>
            <Form.Item
              name={"title"}
              rules={[requiredForm, minForm(1), maxForm(250)]}
            >
              <Input placeholder={"عنوان قفسه را وارد کنید..."} />
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <SpaceStyled top={10}>
              <CustomButton block htmlType="submit">
                ثبت
              </CustomButton>
            </SpaceStyled>
          </Col>
        </Row>
        <Form.Item
          name={"id"}
          style={{ width: 0, height: 0, margin: 0, padding: 0 }}
        ></Form.Item>
      </Form>
    </Fragment>
  );
};
export default AddTreeDialog;
