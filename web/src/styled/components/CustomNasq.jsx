import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { darkBlueColor } from "../../app/appColor";

const CustomNasq = (props) => {
  let CustomNasqStyled = styled(Typography.Paragraph)`
    font-size: ${props.size ? props.size : 12}px;
    font-family: iran-nastaliq;
    color: ${props.color ? props.color : darkBlueColor} !important;
    padding: 0px !important;
    margin: 0px !important;
  `;
  return <CustomNasqStyled>{props.children}</CustomNasqStyled>;
};
export default CustomNasq;
