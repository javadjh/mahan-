import styled from "styled-components";
import leftImage from "../assets/login-left.png";
import { darkBlueColor, darkBlueOpacityColor } from "../app/appColor";
export const LeftSideStyled = styled.div`
  background-color: ${darkBlueOpacityColor};
  height: 100vh;
  background-image: url("/assets/login-left.png");
  background-size: cover;
  position: relative;
  bottom: 0px;
`;
export const BackgroundWave = styled.div`
  display: flex;
  background-repeat: no-repeat;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;
