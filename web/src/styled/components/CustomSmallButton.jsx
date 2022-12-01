import { Button, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { darkBlueColor, lightColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
const CustomSmallButton = (props) => {
  const CustomSmallButtonStyled = styled(Button)`
    background-color: ${props.color ? props.color : darkBlueColor} !important;
    color: ${props.color === "#fff" ? "#92A2B0" : "white"} !important;
    padding: 0px 20px !important;
    min-height: 43px !important;
    border-radius: 50px !important;
    text-align: center !important;
    border: ${props.color === "#fff" ? "2px solid #EEF2F5" : "none"} !important;
    box-shadow: 0px 15px 24px rgba(6, 67, 124, 0.08) !important;
  `;

  let editProps = { ...props, ...{ icon: undefined } };
  return (
    <CustomSmallButtonStyled {...editProps}>
      <Row>
        <Col>{props.children}</Col>
        <Col>
          {props.icon && <SpaceStyled right={5}>{props.icon}</SpaceStyled>}
        </Col>
      </Row>
    </CustomSmallButtonStyled>
  );
};
export default CustomSmallButton;
