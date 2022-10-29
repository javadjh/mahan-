import { BlueHeader } from "./style";
import React from "react";
import { Col, Image, Row } from "antd";
const AdminLayoutComponent = () => {
  return (
    <div>
      <BlueHeader>
        <Image src="/assets/logo.png" preview={false} />
      </BlueHeader>
      <Row>
        <Col span={7}></Col>
        <Col span={17}></Col>
      </Row>
    </div>
  );
};
export default AdminLayoutComponent;
