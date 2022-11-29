import { Checkbox, Form, Radio, Select } from "antd";
import React, { Fragment } from "react";
import { darkBlueColor } from "../../../../app/appColor";
import CustomText from "../../../../styled/components/CustomText";
import { SpaceStyled } from "../../../../styled/global";
import { validator } from "../validator";
const SelectorViewer = ({ item }) => {
  return (
    <Fragment>
      <SpaceStyled botton={8}>
        <CustomText color={darkBlueColor}>{item.label}</CustomText>
      </SpaceStyled>
      <Form.Item name={item.uiId} rules={validator(item)}>
        <Select placeholder={item.label} style={{ width: "100%" }}>
          {item?.values?.map((val) => (
            <Select.Option key={val} value={val}>
              {val}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Fragment>
  );
};
export default SelectorViewer;
