import React from "react";
import { Col, Divider, Row } from "antd";
import { Fragment } from "react";
import CustomIcon from "../../styled/components/CustomIcon";
import { SpaceStyled, Vr } from "../../styled/global";
import CustomText from "../../styled/components/CustomText";
import { darkBlueColor, titleColor } from "../../app/appColor";

const OptionItemComponent = ({ keyName, valueName, icon }) => {
  return (
    <Fragment>
      <SpaceStyled vertical={20}>
        <Row justify="space-between" align="middle">
          <Col align="start" span={12}>
            <Row>
              <Col>
                <CustomIcon icon={icon} />
              </Col>
              <Col>
                <Vr />
              </Col>
              <Col>
                <CustomText color={darkBlueColor}>{keyName}</CustomText>
              </Col>
            </Row>
          </Col>
          <Col align="end" span={12}>
            <CustomText color={titleColor}>{valueName}</CustomText>
          </Col>
        </Row>
        <Divider />
      </SpaceStyled>
    </Fragment>
  );
};
export default OptionItemComponent;
