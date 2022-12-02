import React from "react";

import { Table } from "antd";
const LogsTableComponent = ({ logs, setPageId }) => {
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
      title: "ip",
      key: "ip",
      dataIndex: "ip",
    },
    {
      title: "شماره ثبت",
      key: "method",
      dataIndex: "method",
      render: (method) => (
        <span>
          {method === "GET"
            ? "دریافت"
            : method === "POST"
            ? "ثبت"
            : method === "DELETE"
            ? "حذف"
            : method === "PUT"
            ? "بروزرسانی"
            : "غیره"}
        </span>
      ),
    },
    {
      title: "بخش",
      key: "department",
      dataIndex: "department",
    },
    {
      title: "کاربر",
      key: "department",
      render: (item) => (
        <span>
          {item?.creator?.firstName} {item?.creator?.lastName}
        </span>
      ),
    },
    {
      title: "تاریخ",
      key: "date",
      dataIndex: "date",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={logs.logs}
        pagination={{
          onChange: (page) => {
            setPageId(page);
          },
          defaultCurrent: logs.pageId,
          total: logs.total,
          current: logs.pageId,
          pageSize: logs.eachPerPage,
        }}
      />
    </>
  );
};
export default LogsTableComponent;
