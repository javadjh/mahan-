import { Col, Image, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { darkBlueColor } from "../../app/appColor";
const CustomLabel = (props) => {
  const Container = styled.div`
    background: ${darkBlueColor};
    border-radius: 6px;
    padding: 20px;
    color: white;
  `;
  return (
    <Container>
      <Row justify="space-between" align="middle">
        <Col>{props.title}</Col>
        {props.icon && (
          <Col>
            <Image
              preview={false}
              src={`/assets/icons/${props.icon}.svg`}
              width={20}
              height={20}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default CustomLabel;
