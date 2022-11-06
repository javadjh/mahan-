import { Typography } from "antd";
import React from "react";
import { lightBlueColor } from "../../app/appColor";
const CustomText = (props) => {
  let style = {
    color: props.color ? props.color : lightBlueColor,
    padding: "5px !important",
    margin: "0px ",
  };
  if (props?.color) {
    style = { ...style, ...{ color: props.color } };
  }
  if (props.size) {
    style = { ...style, ...{ fontSize: props.size } };
  }
  return (
    <Typography.Paragraph style={style} {...props}>
      {props.children}
    </Typography.Paragraph>
  );
};
export default CustomText;
