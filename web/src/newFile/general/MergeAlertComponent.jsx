import { Col, Row } from "antd";
import React, { Fragment } from "react";
import InsertAlertComponent from "./InsertAlertComponent";
import ShowAlertsComponent from "./ShowAlertsComponent";
const MergeAlertComponent = () => {
  return (
    <Fragment>
      <Row>
        <Col span={14}>
          <ShowAlertsComponent />
        </Col>
        <Col span={9} offset={1}>
          <InsertAlertComponent />
        </Col>
      </Row>
    </Fragment>
  );
};
export default MergeAlertComponent;
