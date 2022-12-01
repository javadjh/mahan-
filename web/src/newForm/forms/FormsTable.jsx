import { Table } from "antd";
import CustomButton from "../../styled/components/CustomButton";
import React from "react";
const FormsTable = ({ forms, history }) => {
  forms.map((item) => {
    item.children = undefined;
  });
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "عنوان",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "توضیحات",
      key: "description",
      width: "40%",
      dataIndex: "description",
    },
    {
      title: "تاریخ ایجاد",
      key: "createDate",
      dataIndex: "createDate",
    },
    {
      title: "عملیات",
      key: "action",
      render: (item) => (
        <CustomButton
          onClick={() => {
            history.push("/forms/upsert/form/" + item._id);
          }}
        >
          ویرایش
        </CustomButton>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={forms} pagination={false} />
    </>
  );
};
export default FormsTable;
