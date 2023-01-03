import styled from "styled-components";
import { darkBlueColor } from "../app/appColor";
export const BlueBackground = styled.div`
  background-color: ${darkBlueColor};
`;
export const CardStyled = styled.div`
  box-sizing: border-box;
  padding: 30px;
  background: #06437c;
  box-shadow: 0px 13px 33px rgba(6, 67, 124, 0.13);
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
export const Vr = styled.div`
  border-left: 1px solid #d5dfe8;
  margin: 0px 10px;

  height: 100%;
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
export const CustomCursor = styled.span`
  cursor: pointer;
`;
export const colourStyles = {
  control: (styles) => ({
    ...styles,
    ...{
      border: "1.1px solid #e4eaef",
      borderRadius: "8px",
      padding: "10px ",
      color: "black ",
      backgroundColor: "#fdfdfd",
      marginTop: 10,
    },
  }),
};
export const HorizontalScroll = styled.div`
  overflow-x: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;
