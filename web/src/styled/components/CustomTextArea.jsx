import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { labelColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
const CustomTextArea = (props) => {
  let CustomTextAreaStyled = styled(Input.TextArea)``;
  let CustomTextAreaLabelStyled = styled.span`
    color: ${labelColor};
  `;
  return (
    <Input.TextAreaStyled
      {...props}
      onChange={props.onChange}
      value={props.value}
    />
  );
};
export default CustomTextArea;
