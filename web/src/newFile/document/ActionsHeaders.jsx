import { Col, ConfigProvider, Divider, Row } from "antd";
import React from "react";
import { useContext } from "react";
import { blueColor, titleColor } from "../../app/appColor";
import { DocumentContext } from "../../context/document/DocumentContext";
import CustomEXShower from "../../styled/components/CustomEXShower";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";
const ActionsHeader = () => {
  const { document } = useContext(DocumentContext);
  return (
    <Row align="middle" justify="space-between">
      <Col span={2}>
        <CustomText color={titleColor}>نام سند</CustomText>
      </Col>
      <Col span={11}>
        <SpaceStyled horizontal={10}>
          <Divider />
        </SpaceStyled>
      </Col>
      <Col span={11}>
        <Row align={"middle"} justify="end">
          <Col span={19} align="end">
            <CustomText ellipsis underline color={blueColor}>
              {document?.document?.title}
            </CustomText>
          </Col>
          <Col span={5} align="end">
            <CustomEXShower ex={document?.document?.ex} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ActionsHeader;
