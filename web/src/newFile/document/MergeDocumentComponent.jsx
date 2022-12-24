import { Col, Row } from "antd";
import React from "react";
import CustomBackButton from "../../styled/components/CustomBackButton";
import DocumentsActionsComponent from "./DocumentsActionComponent";
import GeneralDocumentInformationComponent from "./GeneralDocumentInformationComponent";
const MergeDocumentComponent = () => {
  return (
    <>
      <CustomBackButton />
      <Row>
        <Col span={7}>
          <GeneralDocumentInformationComponent />
        </Col>
        <Col span={17}>
          <DocumentsActionsComponent />
        </Col>
      </Row>
    </>
  );
};
export default MergeDocumentComponent;
