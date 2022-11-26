import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";

const DocumentsTable = () => {
  const { documentsFilterHandle } = useContext(FileContext);
  const documents = useSelector((state) => state.documents);
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
      title: "حجم",
      key: "documentSize",
      dataIndex: "documentSize",
    },
    {
      title: "فرمت",
      key: "ex",
      dataIndex: "ex",
    },
    {
      title: "تاریخ ایجاد",
      key: "createDate",
      dataIndex: "createDate",
    },

    {
      title: "عملیات",
      key: "action",
      width: "20%",
      render: (item) => (
        <>
          {/* <CustomPopConfirm
            onDelete={() => {
              deleteArchive(item._id);
            }}
            render={<CustomButton color={grayColor}>حذف</CustomButton>}
          />
          <CustomButton
            style={{ marginRight: 5 }}
            onClick={() => upsertArchiveHandle(item)}
            color={darkBlueColor}
          >
            ویرایش
          </CustomButton> */}
        </>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={documents.documents}
      pagination={{
        onChange: (page) => {
          documentsFilterHandle({ pageId: page });
        },
        defaultCurrent: documents.pageId,
        total: documents.total,
        current: documents.pageId,
        pageSize: documents.eachPerPage,
      }}
    />
  );
};
export default DocumentsTable;
