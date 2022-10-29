import React from "react";
import { Input } from "antd";
import styled from "styled-components";

const CustomInput = (props) => {
  let CustomInputStyled = styled(Input)`
    background: #f9fafc;
    border-radius: 8px;
    border: none;
    padding: 20px;
  `;
  return <CustomInputStyled {...props} />;
};
export default CustomInput;
