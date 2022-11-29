import { Checkbox, Form, Radio } from "antd";
import React, { Fragment } from "react";
import { darkBlueColor } from "../../../../app/appColor";
import CustomText from "../../../../styled/components/CustomText";
import { SpaceStyled } from "../../../../styled/global";
import { validator } from "../validator";
const CheckboxViewer = ({ item }) => {
  return (
    <Fragment>
      <SpaceStyled botton={8}>
        <CustomText color={darkBlueColor}>{item.label}</CustomText>
      </SpaceStyled>
      <Form.Item name={item.uiId} rules={validator(item)}>
        <Checkbox.Group>
          {item?.values?.map((val) => (
            <Checkbox key={val} value={val}>
              {val}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </Fragment>
  );
};
export default CheckboxViewer;
