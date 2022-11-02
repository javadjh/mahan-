import { Table } from "antd";
import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor, orangeColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import styled from "styled-components";
const ReportTableComponent = ({
  setSortBy,
  sortBy,
  files,
  pageId,
  eachPerPage,
  total,
  setPageId,
}) => {
  const OrangeTextStyle = styled.span`
    color: ${(props) =>
      sortBy === props.sortBy ? orangeColor : darkBlueColor};
    cursor: pointer;
  `;
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },

    {
      title: (
        <OrangeTextStyle onClick={() => setSortBy("title")} sortBy={"title"}>
          عنوان
        </OrangeTextStyle>
      ),
      key: "title",
      dataIndex: "title",
      render: (title) => (
        <OrangeTextStyle onClick={() => setSortBy("title")} sortBy={"title"}>
          {title}
        </OrangeTextStyle>
      ),
    },
    {
      title: (
        <OrangeTextStyle
          onClick={() => setSortBy("archiveTreeId.title")}
          sortBy={"archiveTreeId.title"}
        >
          قفسه ها
        </OrangeTextStyle>
      ),
      key: "idCode",
      render: (item) => (
        <OrangeTextStyle
          onClick={() => setSortBy("archiveTreeId.title")}
          sortBy={"archiveTreeId.title"}
        >
          {item.archiveTreeId.title}
        </OrangeTextStyle>
      ),
    },
    {
      title: (
        <OrangeTextStyle
          onClick={() => setSortBy("fileDate")}
          sortBy={"fileDate"}
        >
          تاریخ
        </OrangeTextStyle>
      ),
      key: "fileDate",
      dataIndex: "fileDate",
      render: (fileDate) => (
        <OrangeTextStyle
          onClick={() => setSortBy("fileDate")}
          sortBy={"fileDate"}
        >
          {fileDate}
        </OrangeTextStyle>
      ),
    },
    {
      title: (
        <OrangeTextStyle
          onClick={() => setSortBy("fileStatus")}
          sortBy={"fileStatus"}
        >
          وضعیت
        </OrangeTextStyle>
      ),
      key: "fileStatus",
      dataIndex: "fileStatus",
      render: (fileStatus) => (
        <OrangeTextStyle
          onClick={() => setSortBy("fileStatus")}
          sortBy={"fileStatus"}
        >
          {fileStatus}
        </OrangeTextStyle>
      ),
    },
    {
      title: (
        <OrangeTextStyle onClick={() => setSortBy("type")} sortBy={"type"}>
          نوع
        </OrangeTextStyle>
      ),
      key: "type",
      dataIndex: "type",
      render: (type) => (
        <OrangeTextStyle onClick={() => setSortBy("type")} sortBy={"type"}>
          {type}
        </OrangeTextStyle>
      ),
    },
    {
      title: (
        <OrangeTextStyle
          onClick={() => setSortBy("fileCode")}
          sortBy={"fileCode"}
        >
          شماره
        </OrangeTextStyle>
      ),
      key: "fileCode",
      dataIndex: "fileCode",
      render: (fileCode) => (
        <OrangeTextStyle
          onClick={() => setSortBy("fileCode")}
          sortBy={"fileCode"}
        >
          {fileCode}
        </OrangeTextStyle>
      ),
    },
    {
      title: (
        <OrangeTextStyle
          onClick={() => setSortBy("creator.lastName")}
          sortBy={"creator.lastName"}
        >
          ایجاد کننده
        </OrangeTextStyle>
      ),
      key: "creator",
      render: (item) => (
        <OrangeTextStyle
          onClick={() => setSortBy("creator.lastName")}
          sortBy={"creator.lastName"}
        >
          {item.creator.firstName} {item.creator.lastName}
        </OrangeTextStyle>
      ),
    },
    {
      title: (
        <OrangeTextStyle
          onClick={() => setSortBy("createDate")}
          sortBy={"createDate"}
        >
          ایجاد
        </OrangeTextStyle>
      ),
      key: "createDate",
      dataIndex: "createDate",
      render: (createDate) => (
        <OrangeTextStyle
          onClick={() => setSortBy("createDate")}
          sortBy={"createDate"}
        >
          {createDate}
        </OrangeTextStyle>
      ),
    },
    {
      title: "وضعیت",
      key: "status",
      render: (item) => (
        <span
          style={{
            color: item.isConfirm
              ? "green"
              : item.isReject
              ? "red"
              : "royalblue",
          }}
        >
          {item.isConfirm
            ? "تایید شده"
            : item.isReject
            ? "مرجوع شده"
            : "در انتظار"}
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={files}
        pagination={{
          onChange: (page) => {
            setPageId(page);
          },
          defaultCurrent: pageId,
          total,
          current: pageId,
          pageSize: eachPerPage,
        }}
      />
    </>
  );
};
export default ReportTableComponent;
