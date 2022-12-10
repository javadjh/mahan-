import { Typography } from "antd";
import styled from "styled-components";
import {
  darkBlueColor,
  grayColor,
  lightGreenColor,
  whiteColor,
} from "../../app/appColor";
import CustomText from "../../styled/components/CustomText";

export const ArchiveItem = styled.div`
  background: ${(props) => (props.isSelected ? darkBlueColor : whiteColor)};
  border: 1.2px solid #eef2f5;

  box-shadow: 0px 7px 17px -3px rgba(77, 89, 107, 0.03);
  border-radius: 8px;
  min-width: 250px;
  height: 90px;
  background-image: url("http://localhost:3000/assets/archive.png");
  background-repeat: no-repeat;
  background-position: right;
  cursor: pointer;
  margin-bottom: 10px;
  padding-right: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
