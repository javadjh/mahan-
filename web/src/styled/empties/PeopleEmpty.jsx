import { Col, Empty, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CustomSmallButton from "../components/CustomSmallButton";
import { SpaceStyled } from "../global";
const PeopleEmpty = () => {
  return (
    <Empty>
      <SpaceStyled vertical={10}>
        <Row justify="space-between" align="middle">
          <Col>
            <Link to={"/people"} target="_blank">
              <CustomSmallButton>افزودن شخص حقیقی</CustomSmallButton>
            </Link>
          </Col>
          <Col>
            <Link to={"/legal-people"} target="_blank">
              <CustomSmallButton>افزودن شخص حقوقی</CustomSmallButton>
            </Link>
          </Col>
        </Row>
      </SpaceStyled>
    </Empty>
  );
};
export default PeopleEmpty;
