import React from "react";
import { Table } from "antd";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { FileContext } from "../../context/file/FileContext";

const FilesLogTable = () => {
  const { filesLogFilterHandle } = useContext(FileContext);
  const fileLogs = useSelector((state) => state.fileLogs);
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
      dataIndex: "description",
    },
    {
      title: "کاربر",
      key: "user",
      render: (item) => (
        <span>
          {item.creator.firstName} {item.creator.lastName}
        </span>
      ),
    },
    {
      title: "تاریخ ایجاد",
      key: "date",
      dataIndex: "date",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={fileLogs.logs}
      pagination={{
        onChange: (page) => {
          filesLogFilterHandle({ pageId: page });
        },
        defaultCurrent: fileLogs.pageId,
        total: fileLogs.total,
        current: fileLogs.pageId,
        pageSize: fileLogs.eachPerPage,
      }}
    />
  );
};
export default FilesLogTable;
