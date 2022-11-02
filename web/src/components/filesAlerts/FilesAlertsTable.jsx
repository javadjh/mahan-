import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import { Table } from "antd";
const FilesAlertsTable = (props) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "بایگانی",
      key: "archiveId",
      render: (item) => <span>{item.archiveId.title}</span>,
    },
    {
      title: "پرونده",
      key: "fileId",
      render: (item) => <span>{item.fileId.title}</span>,
    },
    {
      title: "عنوان",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "ایجاد کننده",
      key: "creator",
      render: (item) => (
        <span>
          {item.creator.firstName} {item.creator.lastName} (
          {item.creator.position}){" "}
        </span>
      ),
    },
    {
      title: "انقضا",
      key: "registerDate",
      render: (item) => (
        <span style={{ color: alert.isExpired ? "red" : "green" }}>
          {item.alertDate}
        </span>
      ),
    },
    {
      title: "ایجاد",
      key: "createDate",
      dataIndex: "createDate",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={props.filesAlerts}
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
export default FilesAlertsTable;
