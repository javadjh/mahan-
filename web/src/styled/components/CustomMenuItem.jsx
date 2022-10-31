import { CaretLeftOutlined, DashboardOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { darkBlueColor, whiteColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
import CustomText from "./CustomText";
import { Link, useLocation } from "react-router-dom";
const CustomMenuItem = ({ title, icon, href, onClick }) => {
  const location = useLocation();
  let MenuItemContainer = styled.div`
    background-color: ${location.pathname === href ? darkBlueColor : "white"};
    color: ${location.pathname === href ? "white" : darkBlueColor};
    width: 100%;
    border-radius: 30px;
    padding: 15px 30px;
    cursor: pointer;
    margin: 5px;
  `;
  let render = (
    <>
      <MenuItemContainer>
        <Row align="middle" justify="space-between">
          <Col>
            <Row>
              <Col>
                <SpaceStyled horizontal={10}>{icon}</SpaceStyled>
              </Col>
              <Col>
                <CustomText
                  color={location.pathname === href ? "white" : darkBlueColor}
                >
                  {title}
                </CustomText>
              </Col>
            </Row>
          </Col>
          <Col>
            <CaretLeftOutlined style={{ color: "#DBE5EC" }} />
          </Col>
        </Row>
      </MenuItemContainer>
      <Divider style={{ margin: 0, padding: 0 }}></Divider>
    </>
  );
  return (
    <>
      {href ? (
        <Link to={href}>{render}</Link>
      ) : (
        <div onClick={onClick}>{render}</div>
      )}
    </>
  );
};
export default CustomMenuItem;
