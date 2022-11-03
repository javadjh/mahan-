import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { lightGreenColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
const CustomCheckbox = (props) => {
  const [checked, setChecked] = useState(props.checked);
  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);
  return (
    <CheckboxContainerStyled
      checked={checked}
      onClick={() => {
        setChecked(!checked);
        props.onChange(!checked);
      }}
    >
      <SpaceStyled left={20}>
        <span>{props.children}</span>
      </SpaceStyled>
      {checked ? (
        <CheckCircleFilled style={iconStyle(checked)} />
      ) : (
        <CheckCircleOutlined style={iconStyle(checked)} />
      )}
    </CheckboxContainerStyled>
  );
};
export default CustomCheckbox;
export const CheckboxContainerStyled = styled.div`
  border: 1px solid ${(props) => (props.checked ? "#d5edd3" : "#F0F4F8")};
  padding: 10px 15px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  min-width: 140px;
  align-items: center;
`;
export const iconStyle = (checked) => {
  return {
    color: checked ? lightGreenColor : "#DFE7ED",
    fontSize: "20px",
  };
};
