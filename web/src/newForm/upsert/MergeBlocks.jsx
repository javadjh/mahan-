import { Col, Row } from "antd";
import React, { Fragment } from "react";
import FormOptionsComponent from "./FormOptionsComponent";
import ObjectsUtilitiesBlock from "./ObjectsUtilitiesBlock";
import ShowObjectsListComponent from "./ShowObjectsListComponent";

const MergeBlocks = () => {
  return (
    <Fragment>
      <Row>
        <Col span={7}>
          <FormOptionsComponent />
          <ObjectsUtilitiesBlock />
        </Col>
        <Col span={17}>
          <ShowObjectsListComponent />
        </Col>
      </Row>
    </Fragment>
  );
};
export default MergeBlocks;
