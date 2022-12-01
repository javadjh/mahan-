import { useContext } from "react";
import React from "react";
import { Table } from "antd";
import { FileContext } from "../../context/file/FileContext";
import { convertToJalali } from "../../utility/dateUtil";

const CorrespondenceTable = () => {
  const { fileStatistic } = useContext(FileContext);
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
    <Table
      columns={columns}
      dataSource={fileStatistic?.file?.correspondence}
      pagination={false}
    />
  );
};
export default CorrespondenceTable;
