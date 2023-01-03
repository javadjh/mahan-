import RSelect from "react-select";
import React from "react";
import { Select } from "antd";
import styled from "styled-components";
import { labelColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
const CustomRSelect = (props) => {
  let CustomRSelectStyled = styled(RSelect)``;
  let CustomRSelectLabelStyled = styled.span`
    color: ${labelColor};
  `;
  return (
    <CustomRSelectStyled
      onChange={props.onChange}
      value={props.value}
      {...props}
    />
  );
};
export default CustomRSelect;
{
  /* <>
      <SpaceStyled bottom={-5}>
        <CustomRSelectLabelStyled>
          {props.label ? props.label : props?.placeholder?.replace("...", "")}
        </CustomRSelectLabelStyled>
      </SpaceStyled>
      <CustomRSelectStyled {...props} />
    </> */
}
