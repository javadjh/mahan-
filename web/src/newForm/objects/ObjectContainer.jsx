import { Col, Image, Row } from "antd";
import React, { Fragment } from "react";
import { useContext } from "react";
import { FormContext } from "../../context/form/FormContext";
import { CustomCursor, SpaceStyled } from "../../styled/global";

const ObjectContainer = ({ children, item }) => {
  const { deleteObject } = useContext(FormContext);
  return (
    <Fragment>
      <SpaceStyled right={10}>
        <Row justify="center" align="middle">
          <Col align={"middle"} span={2}>
            <CustomCursor
              onClick={() => {
                deleteObject(item.uiId);
              }}
            >
              <Image
                preview={false}
                src="/assets/icons/delete.svg"
                width={30}
                height={30}
              />
            </CustomCursor>
          </Col>
          <Col span={22}>{children}</Col>
        </Row>
      </SpaceStyled>
    </Fragment>
  );
};
export default ObjectContainer;
