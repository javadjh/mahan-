import React from "react";
import { Col, Row } from "antd";
import { BsArrowRightShort } from "react-icons/bs";
import { useHistory } from "react-router";
import { CustomCursor, SpaceStyled } from "../global";
const CustomBackButton = () => {
  const history = useHistory();
  const onBackPress = () => {
    history.goBack();
  };
  return (
    <SpaceStyled bottom={10}>
      <CustomCursor>
        <div onClick={onBackPress}>
          <Row>
            <Col>
              <BsArrowRightShort style={{ fontSize: 25 }} />
            </Col>
            <Col>بازگشت</Col>
          </Row>
        </div>
      </CustomCursor>
    </SpaceStyled>
  );
};
export default CustomBackButton;
