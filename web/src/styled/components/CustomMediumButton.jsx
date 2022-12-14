import { Button, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import {
  darkBlueColor,
  lightColor,
  transeparentColor,
} from "../../app/appColor";
import { SpaceStyled } from "../global";
const CustomMediumButton = (props) => {
  const CustomMediumButtonStyled = styled(Button)`
    background-color: ${props.color ? props.color : darkBlueColor} !important;
    text-align: center !important;
    color: ${props.textColor
      ? props.textColor
      : props.color === "#fff"
      ? "#92A2B0"
      : "white"} !important;
    padding: 0px 20px !important;
    min-height: ${props.height ? props.height : 43}px !important;
    border-radius: 7px !important;
    text-align: center !important;
    border: ${props.color === "#fff" ? "2px solid #EEF2F5" : "none"} !important;
    box-shadow: 0px 15px 24px rgba(6, 67, 124, 0.08) !important;
  `;
  const CustomMediumButtonTranseparentStyled = styled(Button)`
    text-align: center !important;
    background-color: ${transeparentColor} !important;
    color: ${props.textColor ? props.textColor : props.color} !important;
    padding: 0px 20px !important;
    min-height: ${props.height ? props.height : 43}px !important;
    border-radius: 7px !important;
    text-align: center !important;
    border: 1px solid ${props.color} !important;
    box-shadow: 0px 15px 24px rgba(6, 67, 124, 0.08) !important;
  `;

  let editProps = { ...props, ...{ icon: undefined } };
  return (
    <>
      {props.isBordred ? (
        <CustomMediumButtonTranseparentStyled {...editProps}>
          <Row>
            <Col>{props.children}</Col>
            <Col>
              {props.icon && <SpaceStyled right={5}>{props.icon}</SpaceStyled>}
            </Col>
          </Row>
        </CustomMediumButtonTranseparentStyled>
      ) : (
        <CustomMediumButtonStyled {...editProps}>
          <Row>
            <Col>{props.children}</Col>
            <Col>
              {props.icon && <SpaceStyled right={5}>{props.icon}</SpaceStyled>}
            </Col>
          </Row>
        </CustomMediumButtonStyled>
      )}
    </>
  );
};
export default CustomMediumButton;
