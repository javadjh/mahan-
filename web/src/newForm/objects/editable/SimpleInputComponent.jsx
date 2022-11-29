import React, { Fragment } from "react";
import { Col, Collapse, Input, Row } from "antd";
import { CustomCollapse } from "../../forms.styled";
import { CustomCursor, SpaceStyled } from "../../../styled/global";
import CustomCheckbox from "../../../styled/components/CustomCheckbox";
import { useContext } from "react";
import { FormContext } from "../../../context/form/FormContext";
import CustomText from "../../../styled/components/CustomText";
import { darkBlueColor } from "../../../app/appColor";
const SimpleInputComponent = ({ item }) => {
  const { setLabel, setMax, setMin, setRequired } = useContext(FormContext);
  return (
    <Fragment>
      <SpaceStyled left={20} bottom={20}>
        <CustomCursor>
          <CustomCollapse>
            <Collapse.Panel
              header={
                <>
                  <SpaceStyled vertical={10}>
                    <CustomText color={darkBlueColor}>متن ساده</CustomText>
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
                <Col span={16}>
                  {!item.pattern && (
                    <Row>
                      <Col span={11}>
                        <Input
                          value={item.min}
                          placeholder="حداقل"
                          onChange={(e) => setMin(item.uiId, e?.target?.value)}
                        />
                      </Col>
                      <Col span={12} offset={1}>
                        <Input
                          value={item.max}
                          placeholder="حداکثر"
                          onChange={(e) => setMax(item.uiId, e?.target?.value)}
                        />
                      </Col>
                    </Row>
                  )}
                </Col>
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
        </CustomCursor>
      </SpaceStyled>
    </Fragment>
  );
};
export default SimpleInputComponent;
