import React from "react";
import { Image } from "antd";

const CustomIcon = ({ icon, style = {} }) => {
  return (
    <Image preview={false} style={style} src={`/assets/icons/${icon}.svg`} />
  );
};
export default CustomIcon;
