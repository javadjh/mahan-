import React from "react";
import { Table } from "antd";
import { convertToJalali } from "../../utility/dateUtil";

const CorrespondenceTable = ({ correspondence }) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "تاریخ",
      key: "createDate",
      dataIndex: "createDate",
      render: (createDate) => <span>{convertToJalali(createDate)}</span>,
    },
    {
      title: "فرستنده",
      key: "sender",
      render: (item) => (
        <span>
          {item?.isSupervisor ? "ناظر " : "ایجاد کننده"}{" "}
          {item?.creator?.firstName} {item?.creator?.lastName}
        </span>
      ),
    },
    {
      title: "توضیحات",
      key: "message",
      dataIndex: "message",
    },
  ];
  return (
    <Table columns={columns} dataSource={correspondence} pagination={false} />
  );
};
export default CorrespondenceTable;
