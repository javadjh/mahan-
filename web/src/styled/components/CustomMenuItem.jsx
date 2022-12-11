import { CaretLeftOutlined, DashboardOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Dropdown, Row } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { darkBlueColor, whiteColor } from "../../app/appColor";
import { SpaceStyled } from "../global";
import CustomText from "./CustomText";
import { Link, useLocation } from "react-router-dom";
import { FRONT_IP } from "../../config/ip";

const CustomMenuItem = ({ title, icon, href, onClick, dropdown }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const location = useLocation();
  let MenuItemContainer = styled.div`
    ${location.pathname === href
      ? `background-image: url(${FRONT_IP}/assets/btn-hover.png);`
      : ""};

    background-color: ${location.pathname === href ? darkBlueColor : "none"};
    color: #fff;
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
                <CustomText color={"#fff"}>{title}</CustomText>
              </Col>
            </Row>
          </Col>
          <Col>
            <CaretLeftOutlined style={{ color: "#fff" }} />
          </Col>
        </Row>
      </MenuItemContainer>
      <Divider
        style={{ margin: 0, padding: 0, backgroundColor: "#1b446a" }}
      ></Divider>
    </>
  );
  return (
    <>
      {dropdown ? (
        <>
          <div onClick={() => setIsOpenDropdown(!isOpenDropdown)}>{render}</div>
        </>
      ) : (
        <>
          {href ? (
            <Link to={href}>{render}</Link>
          ) : (
            <>
              <div onClick={onClick}>{render}</div>
            </>
          )}
        </>
      )}

      {isOpenDropdown && <SpaceStyled right={30}>{dropdown}</SpaceStyled>}
    </>
  );
};
export default CustomMenuItem;
