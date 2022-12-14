import { Col, Row } from "antd";
import React from "react";
import GeneralDocumentInformationComponent from "./GeneralDocumentInformationComponent";
const MergeDocumentComponent = () => {
  return (
    <Row>
      <Col span={8}>
        <GeneralDocumentInformationComponent />
      </Col>
      <Col span={16}></Col>
    </Row>
  );
};
export default MergeDocumentComponent;
