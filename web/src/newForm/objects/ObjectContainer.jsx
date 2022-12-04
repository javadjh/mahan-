import { Col, Image, Row, Space } from "antd";
import React, { Fragment } from "react";
import { useContext } from "react";
import { FormContext } from "../../context/form/FormContext";
import { CustomCursor, SpaceStyled } from "../../styled/global";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { grayColor } from "../../app/appColor";

const ObjectContainer = ({ children, item }) => {
  const { deleteObject, upAction, downAction } = useContext(FormContext);
  return (
    <Fragment>
      <SpaceStyled right={10}>
        <Row justify="center" align="middle">
          <Col align={"middle"} span={2}>
            <Space direction="vertical">
              <CustomCursor
                onClick={() => {
                  upAction(item);
                }}
              >
                <BsArrowUp style={{ fontSize: 20, color: grayColor }} />
              </CustomCursor>
              <CustomCursor
                onClick={() => {
                  deleteObject(item);
                }}
              >
                <Image
                  preview={false}
                  src="/assets/icons/delete.svg"
                  width={30}
                  height={30}
                />
              </CustomCursor>
              <CustomCursor
                onClick={() => {
                  downAction(item);
                }}
              >
                <BsArrowDown style={{ fontSize: 20, color: grayColor }} />
              </CustomCursor>
            </Space>
          </Col>
          <Col span={22}>{children}</Col>
        </Row>
      </SpaceStyled>
    </Fragment>
  );
};
export default ObjectContainer;
