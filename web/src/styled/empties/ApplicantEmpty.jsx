import { Col, Empty, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CustomSmallButton from "../components/CustomSmallButton";
import { SpaceStyled } from "../global";
const ApplicantEmpty = () => {
  return (
    <Empty>
      <SpaceStyled vertical={10}>
        <Row justify="center" align="middle">
          <Col>
            <Link to={"/applicants"} target="_blank">
              <CustomSmallButton>افزودن سمت سازمانی</CustomSmallButton>
            </Link>
          </Col>
        </Row>
      </SpaceStyled>
    </Empty>
  );
};
export default ApplicantEmpty;
