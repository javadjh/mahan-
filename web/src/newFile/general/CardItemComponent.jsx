import { Col, Row } from "antd";
import React from "react";
import { darkBlueColor, titleColor } from "../../app/appColor";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";
import { FileCardStyled } from "../file.style";
const CardItemComponent = ({ title, value }) => {
  return (
    <SpaceStyled horizontal={10} vertical={10}>
      <FileCardStyled>
        <Row justify="space-between" align="middle">
          <Col>
            <CustomText color={darkBlueColor}>{title}</CustomText>
          </Col>
          <Col>
            <CustomText color={titleColor}>{value}</CustomText>
          </Col>
        </Row>
      </FileCardStyled>
    </SpaceStyled>
  );
};
export default CardItemComponent;
