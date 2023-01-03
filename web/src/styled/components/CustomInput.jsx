import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { labelColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
import { useState } from "react";
const CustomInput = (props) => {
  let CustomInputStyled = styled(Input)``;
  let CustomInputLabelStyled = styled.span`
    color: ${labelColor};
  `;

  return <Input {...props} />;
};
export default CustomInput;
