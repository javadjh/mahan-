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
  const OptionContainer = styled.div`
    padding: 15px;
    background: ${darkBlueColor};
    border-radius: 6px;
    margin: 10px 0px;
    color: white;
    cursor: pointer;
  `;
  return (
    <OptionContainer onClick={onClick}>
      <Row justify="space-between" align="middle">
        <Col>
          <Row>
            <Col>
              <BiSitemap
                style={{
                  color: "white",
                  fontSize: 15,
                  marginTop: 5,
                }}
              />
            </Col>
            <Col>
              <SpaceStyled right={10}>
                <CustomText color={"white"}>{children}</CustomText>
              </SpaceStyled>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <CustomText color={"white"}>افزودن</CustomText>
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
