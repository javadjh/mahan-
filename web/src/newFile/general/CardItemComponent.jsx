import { Col, Row } from "antd";
import React from "react";
import { darkBlueColor, titleColor } from "../../app/appColor";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";
import { FileCardStyled } from "../file.style";
const CardItemComponent = ({ title, value, dirPosition = "space-between" }) => {
  return (
    <SpaceStyled horizontal={10} vertical={10}>
      <FileCardStyled>
        <Row justify={dirPosition} align="middle">
          <Col>
            <CustomText color={darkBlueColor}>{title}</CustomText>
          </Col>
          <Col align="middle">
            <SpaceStyled top={10}>
              <CustomText color={titleColor} size={16}>
                {value}
              </CustomText>
            </SpaceStyled>
          </Col>
        </Row>
      </FileCardStyled>
    </SpaceStyled>
  );
};
export default CardItemComponent;
