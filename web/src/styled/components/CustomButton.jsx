import { Button, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { darkBlueColor, lightColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
const CustomButton = (props) => {
  const CustomButtonStyled = styled(Button)`
    background-color: ${props.color ? props.color : darkBlueColor} !important;
    margin-top: 10px;
    color: ${props.textColor
      ? props.textColor
      : props.color === "#fff"
      ? "#92A2B0"
      : "white"} !important;
    padding: 0px 30px !important;
    min-height: 50px !important;
    border-radius: 8px !important;
    text-align: center !important;
    border: ${props.color === "#fff" ? "2px solid #EEF2F5" : "none"} !important;
    box-shadow: 0px 15px 24px rgba(6, 67, 124, 0.08) !important;
  `;
  let editProps = { ...props, ...{ icon: undefined } };
  return (
    <>
      {props?.isLeft ? (
        <Row justify="space-between">
          <Col></Col>
          <Col>
            <CustomButtonStyled {...editProps}>
              <Row>
                <Col span={!props.icon && 24}>{props.children}</Col>
                <Col>
                  {props.icon && (
                    <SpaceStyled right={5} top={5}>
                      {props.icon}
                    </SpaceStyled>
                  )}
                </Col>
              </Row>
            </CustomButtonStyled>
          </Col>
        </Row>
      ) : (
        <CustomButtonStyled {...editProps}>
          <Row justify="space-between" align="middle">
            <Col span={!props.icon && 24}>{props.children}</Col>
            <Col>
              {props.icon && (
                <SpaceStyled right={5} top={5}>
                  {props.icon}
                </SpaceStyled>
              )}
            </Col>
          </Row>
        </CustomButtonStyled>
      )}
    </>
  );
};
export default CustomButton;
