import { Col, Collapse, Row } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../styled/components/CustomLabel";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";
const ShowAlertsComponent = () => {
  const fileAlerts = useSelector((state) => state.fileAlerts);

  return (
    <Fragment>
      <CustomLabel title={"هشدار های ایجاد شده قبلی"} icon={"alert"} />
      {fileAlerts?.length > 0 &&
        fileAlerts?.map((item) => (
          <SpaceStyled vertical={10}>
            <Collapse expandIconPosition={"end"}>
              <Collapse.Panel
                header={
                  <Row justify="space-between">
                    <Col>{item.title}</Col>
                    <Col>
                      <Row>
                        <Col>
                          <SpaceStyled horizontal={10}>
                            <CustomText>تاریخ انقضا</CustomText>
                          </SpaceStyled>
                        </Col>
                        <Col>{item.alertDate}</Col>
                      </Row>
                    </Col>
                  </Row>
                }
                key={item._id}
              >
                <p>{item.description}</p>
              </Collapse.Panel>
            </Collapse>
          </SpaceStyled>
        ))}
    </Fragment>
  );
};
export default ShowAlertsComponent;
