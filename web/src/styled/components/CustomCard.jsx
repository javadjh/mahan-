import React from "react";
import styled from "styled-components";

const CustomCard = ({ children }) => {
  let CustomCardStyled = styled.div`
    background: #ffffff;
    box-shadow: 0px 0px 70px rgba(88, 96, 103, 0.02);
    border-radius: 4px;
    padding: 20px;
  `;
  return <CustomCardStyled>{children}</CustomCardStyled>;
};
export default CustomCard;
