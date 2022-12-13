import { Col, Row } from "antd";
import React, { Fragment } from "react";
import Auth from "../../auth/Auth";
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
          <Auth accessList={["ویرایش پرونده"]}>
            <InsertAlertComponent />
          </Auth>
        </Col>
      </Row>
    </Fragment>
  );
};
export default MergeAlertComponent;
