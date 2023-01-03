import React from "react";
import { Select } from "antd";
import styled from "styled-components";
import { labelColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
const CustomSelect = (props) => {
  let CustomSelectStyled = styled(Select)`
    width: 100%;
  `;
  let CustomSelectLabelStyled = styled.span`
    color: ${labelColor};
  `;
  return <Select {...props} onChange={props.onChange} value={props.value} />;
};
export default CustomSelect;
{
  /* <>
      <SpaceStyled bottom={5}>
        <SelectLabelStyled>
          {props.label ? props.label : props?.placeholder?.replace("...", "")}
        </CustomSelectLabelStyled>
      </SpaceStyled>
      <div style={{ width: "100%" }}>
        <SelectStyled {...props} />
      </div>
    </> */
}
