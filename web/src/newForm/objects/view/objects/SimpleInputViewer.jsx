import { Form, Input } from "antd";
import React, { Fragment } from "react";
import { darkBlueColor } from "../../../../app/appColor";
import CustomText from "../../../../styled/components/CustomText";
import { SpaceStyled } from "../../../../styled/global";
import { validator } from "../validator";

const SimpleInputViewer = ({ item }) => {
  console.log(item);
  return (
    <Fragment>
      <SpaceStyled botton={8}>
        <CustomText color={darkBlueColor}>{item.label}</CustomText>
      </SpaceStyled>
      <Form.Item name={item.uiId} rules={validator(item)}>
        <Input value={item.answer} placeholder={`${item?.label || ""}...`} />
      </Form.Item>
    </Fragment>
  );
};
export default SimpleInputViewer;
