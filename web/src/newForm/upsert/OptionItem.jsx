import React from "react";
import { BiSitemap } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { Col, Row } from "antd";
import styled from "styled-components";
import {
  darkBlueColor,
  lightBlueColor,
  lightColor,
  lightGreenColor,
} from "../../app/appColor";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";
import { useState } from "react";

const OptionItem = ({ children, onClick }) => {
  const [isHovered, setIsHoverd] = useState(false);
  const OptionContainer = styled.div`
    padding: 15px;
    background: #f6f8fb;
    border-radius: 6px;
    margin: 10px 0px;
    cursor: pointer;
    :hover {
      background-color: ${darkBlueColor};
      color: white;
    }
  `;
  return (
    <OptionContainer
      onClick={onClick}
      onMouseEnter={() => {
        setIsHoverd(true);
      }}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Row>
            <Col>
              <BiSitemap
                style={{
                  color: isHovered ? "white" : darkBlueColor,
                  fontSize: 15,
                  marginTop: 5,
                }}
              />
            </Col>
            <Col>
              <SpaceStyled right={10}>
                <CustomText color={isHovered ? "white" : darkBlueColor}>
                  {children}
                </CustomText>
              </SpaceStyled>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <CustomText color={isHovered ? "white" : lightBlueColor}>
                افزودن
              </CustomText>
            </Col>
            <Col>
              <FiPlus
                style={{ color: lightGreenColor, fontSize: 15, marginTop: 5 }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </OptionContainer>
  );
};
export default OptionItem;
