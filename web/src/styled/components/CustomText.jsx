import { Typography } from "antd";
import React from "react";
import { lightBlueColor } from "../../app/appColor";
const CustomText = ({ children, props, size, color }) => {
  let style = {
    color: color ? color : lightBlueColor,
    padding: "5px !important",
    margin: "0px ",
  };
  if (props?.color) {
    style = { ...style, ...{ color: props.color } };
  }
  if (size) {
    style = { ...style, ...{ fontSize: size } };
  }
  return (
    <Typography.Paragraph style={style} {...props}>
      {children}
    </Typography.Paragraph>
  );
};
export default CustomText;
