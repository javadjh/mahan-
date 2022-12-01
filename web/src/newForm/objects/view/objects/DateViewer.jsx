import { Checkbox, Form, Radio, Select } from "antd";

import React, { Fragment } from "react";
import { darkBlueColor } from "../../../../app/appColor";
import CustomDatePicker from "../../../../styled/components/CustomDatePicker";
import CustomText from "../../../../styled/components/CustomText";
import { SpaceStyled } from "../../../../styled/global";
import { validator } from "../validator";
const DateViewer = ({ item }) => {
  return (
    <Fragment>
      <SpaceStyled botton={8}>
        <CustomText color={darkBlueColor}>{item.label}</CustomText>
      </SpaceStyled>
      <Form.Item name={item.uiId} rules={validator(item)}>
        <CustomDatePicker value={item.answer} />
      </Form.Item>
    </Fragment>
  );
};
export default DateViewer;
