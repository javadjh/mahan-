import styled from "styled-components";
import { darkBlueColor } from "../app/appColor";
export const BlueBackground = styled.div`
  background-color: ${darkBlueColor};
`;
export const CardStyled = styled.div`
  box-sizing: border-box;
  padding: 30px;
  background: #ffffff;
  box-shadow: 90px 85px 70px -28px rgba(82, 94, 102, 0.04),
    inset 41px 42px 71px -77px #e0e6ee;
  border-radius: 16px;
`;

export const SpaceStyled = styled.div`
  margin-top: ${(props) => (props.vertical ? props.vertical : props.top)}px;
  margin-bottom: ${(props) =>
    props.vertical ? props.vertical : props.bottom}px;
  margin-right: ${(props) =>
    props.horizontal ? props.horizontal : props.right}px;
  margin-left: ${(props) =>
    props.horizontal ? props.horizontal : props.left}px;
`;

export const TextAlignStyled = styled.div`
  text-align: ${(props) => props.align};
`;

export const CenterStyled = styled.div`
  justify-content: center;
  display: flex;
  align-content: center;
  width: 100%;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
export const CenterVerticalStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
