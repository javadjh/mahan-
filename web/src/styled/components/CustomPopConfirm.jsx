import React from "react";
import { Popconfirm } from "antd";

const CustomPopConfirm = ({ render, onDelete }) => {
  return (
    <Popconfirm
      title="آیا از انجام این عملیات اطمینان دارید؟"
      onConfirm={onDelete}
      okText="بله"
      cancelText="خیر"
    >
      {render}
    </Popconfirm>
  );
};
export default CustomPopConfirm;
