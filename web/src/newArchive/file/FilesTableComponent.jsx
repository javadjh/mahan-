import { Table } from "antd";
import React from "react";
import { lightGreenColor } from "../../app/appColor";
import CustomButton from "../../styled/components/CustomButton";
import CustomText from "../../styled/components/CustomText";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import Auth from "../../auth/Auth";
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
      render: (item) => (
        <span>
          {item.title}{" "}
          <span style={{ color: lightGreenColor }}>
            ( {item.documentCount} )
          </span>
        </span>
      ),
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
    {
      title: "عملیات",
      key: "action",
      render: (item) => (
        <Auth
          accessList={[
            "ویرایش پرونده",
            "حذف پرونده",
            "ویرایش روکش پرونده",
            "مخاطبین پرونده",
          ]}
        >
          <Link to={`/file/${item._id}/0`}>
            <CustomButton color={lightGreenColor}>نمایش</CustomButton>
          </Link>
        </Auth>
      ),
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
