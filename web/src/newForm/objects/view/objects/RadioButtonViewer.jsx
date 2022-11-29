import { Form, Radio } from "antd";
import React, { Fragment } from "react";
import { darkBlueColor } from "../../../../app/appColor";
import CustomText from "../../../../styled/components/CustomText";
import { SpaceStyled } from "../../../../styled/global";
import { validator } from "../validator";
const RadioButtonViewer = ({ item }) => {
  return (
    <Fragment>
      <SpaceStyled botton={8}>
        <CustomText color={darkBlueColor}>{item.label}</CustomText>
      </SpaceStyled>
      <Form.Item name={item.uiId} rules={validator(item)}>
        <Radio.Group>
          {item?.values?.map((val) => (
            <Radio key={val} value={val}>
              {val}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Fragment>
  );
};
export default RadioButtonViewer;
