import React, { Fragment } from "react";
import { Col, Collapse, Input, Row } from "antd";
import { CustomCollapse } from "../../forms.styled";
import { SpaceStyled } from "../../../styled/global";
import CustomCheckbox from "../../../styled/components/CustomCheckbox";
import { useContext } from "react";
import { FormContext } from "../../../context/form/FormContext";
import CustomText from "../../../styled/components/CustomText";
import { darkBlueColor } from "../../../app/appColor";
const DatePickerComponent = ({ item }) => {
  const { setLabel, setRequired } = useContext(FormContext);
  return (
    <Fragment>
      <SpaceStyled left={20} bottom={20}>
        <CustomCollapse>
          <Collapse.Panel
            header={
              <>
                <SpaceStyled vertical={10}>
                  <CustomText color={darkBlueColor}>
                    دریافت تاریخ(جلالی)
                  </CustomText>
                </SpaceStyled>
                <Input
                  value={item.label}
                  placeholder="عنوان / برچسب"
                  onChange={(e) => setLabel(item.uiId, e?.target?.value)}
                />
              </>
            }
            key="1"
          >
            <Row justify="space-between">
              <Col span={16}></Col>
              <Col span={8}>
                <CustomCheckbox
                  checked={item.isRequired}
                  onChange={(e) => setRequired(item.uiId, e)}
                >
                  اجباری
                </CustomCheckbox>
              </Col>
            </Row>
          </Collapse.Panel>
        </CustomCollapse>
      </SpaceStyled>
    </Fragment>
  );
};
export default DatePickerComponent;
