import React from "react";
import { Image } from "antd";
import styled from "styled-components";
import { lightGreenColor, whiteColor } from "../../app/appColor";
import { CenterStyled, CenterVerticalStyled } from "../../styled/global";
import CustomText from "../../styled/components/CustomText";

const AddShelfComponent = () => {
  const Block = styled.div`
    background: ${lightGreenColor};
    border: 1.2px solid #eef2f5;
    box-shadow: 0px 7px 17px -3px rgba(77, 89, 107, 0.05);
    border-radius: 8px;
    padding: 0px 20px;
    width: 160px;
    margin: 0px 10px;
    height: 98%;
    cursor: pointer;
  `;
  return (
    <Block>
      <CenterVerticalStyled>
        <CenterStyled>
          <Image preview={false} src="/assets/svg/add_wave.svg" />
          <CustomText color={whiteColor}>افزودن پوشه جدید</CustomText>
        </CenterStyled>
      </CenterVerticalStyled>
    </Block>
  );
};
export default AddShelfComponent;
