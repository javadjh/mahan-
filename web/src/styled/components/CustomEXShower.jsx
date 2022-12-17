import React from "react";
import { Image } from "antd";
import { FRONT_IP } from "../../config/ip";
import styled from "styled-components";
import { useState } from "react";
import CustomText from "./CustomText";
import { CenterStyled, SpaceStyled } from "../global";
import { whiteColor } from "../../app/appColor";

const CustomEXShower = ({ ex }) => {
  const [isError, setIsError] = useState(false);
  return (
    <>
      <Image
        src={`${FRONT_IP}/assets/icons/ex/${ex?.toUpperCase()}.svg`}
        fallback={`${FRONT_IP}/assets/icons/paper.svg`}
        preview={false}
        onError={() => {
          setIsError(true);
        }}
      />
      {isError && (
        <SpaceStyled top={-32}>
          <CenterStyled>
            <CustomText
              color={whiteColor}
              style={{ zIndex: 999999, color: "white" }}
            >
              {ex}
            </CustomText>
          </CenterStyled>
        </SpaceStyled>
      )}
    </>
  );
};
export default CustomEXShower;
