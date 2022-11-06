import { Typography } from "antd";
import styled from "styled-components";
import { darkBlueColor, grayColor, lightGreenColor } from "../../app/appColor";
import CustomText from "../../styled/components/CustomText";

export const ArchiveItem = styled.div`
  box-sizing: border-box;
  background: white;
  box-shadow: 0px 8px 21px rgba(6, 67, 124, 0.07);
  border-radius: 6px;
  padding: 15px 20px;
  margin-bottom: 10px;
  background: ${lightGreenColor};
  background: rgb(14, 197, 164);
  background: linear-gradient(
    90deg,
    rgba(14, 197, 164, 1) 0%,
    rgba(15, 110, 147, 1) 50%,
    rgba(6, 67, 124, 1) 100%
  );
`;
export const LabelArchiveText = styled.div`
  color: rgba(255, 255, 255, 0.48) !important;
`;
export const TitleArchiveText = styled.div`
  color: #ffffff !important;
`;
export const ArchiveIconStyled = styled.div`
  background-repeat: no-repeat;
  height: 100%;
  padding: -20px;
  background-image: url("http://localhost:3000/assets/bg-wave.png");
`;
