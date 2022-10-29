import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { darkBlueColor, lightColor } from "../../app/appColor";
const CustomButton = (props) => {
  console.log(props.color);
  const CustomButtonStyled = styled(Button)`
    background-color: ${props.color ? props.color : darkBlueColor} !important;
    color: ${props.color === "#fff" ? "#92A2B0" : "white"} !important;
    padding: 20px 30px !important;
    min-height: 65px !important;
    border-radius: 8px !important;
    text-align: center !important;
    border: ${props.color === "#fff" ? "2px solid #EEF2F5" : "none"} !important;
    box-shadow: 0px 15px 24px rgba(6, 67, 124, 0.08) !important;
  `;
  return <CustomButtonStyled {...props}>{props.children}</CustomButtonStyled>;
};
export default CustomButton;
