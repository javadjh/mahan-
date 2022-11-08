import { Table } from "antd";
import React from "react";
const FilesTableComponent = (props) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "عنوان پرونده",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "نوع",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "وضعیت",
      key: "fileStatus",
      dataIndex: "fileStatus",
    },
    {
      title: "شماره پرونده",
      key: "fileCode",
      dataIndex: "fileCode",
    },
    {
      title: "تاریخ",
      key: "fileDate",
      dataIndex: "fileDate",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={props.files}
        pagination={{
          onChange: (page) => {
            props.setPageId(page);
          },
          defaultCurrent: props.pageId,
          total: props.total,
          current: props.pageId,
          pageSize: props.eachPerPage,
        }}
      />
    </>
  );
};
export default FilesTableComponent;
