import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, redColor } from "../../app/appColor";
import CustomDialog from "../../styled/components/CustomDialog";
import ShowSingleDocumentDialog from "../../ArchiveTree/dialog/ShowSingleDocumentDialog";

const DocumentsTable = () => {
  const { documentsFilterHandle, deleteDocHandler, history } =
    useContext(FileContext);
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
      width: "40%",
      render: (item) => (
        <>
          <CustomPopConfirm
            onDelete={() => {
              deleteDocHandler(item._id);
            }}
            render={<CustomButton color={redColor}>حذف</CustomButton>}
          />
          <CustomDialog
            width={"100%"}
            title={"سند"}
            render={<ShowSingleDocumentDialog doc={item} />}
            actionRender={
              <CustomButton style={{ marginRight: 5 }} color={darkBlueColor}>
                نمایش
              </CustomButton>
            }
          />
          {(item.ex === "png" ||
            item.ex === "jpg" ||
            item.ex === "PNG" ||
            item.ex === "jpge") && (
            <CustomButton
              onClick={() => {
                history.push(`/edit-${item._id}-${item.lastDocumentId}`);
              }}
              style={{ marginRight: 5 }}
              color={darkBlueColor}
            >
              ویرایشگر
            </CustomButton>
          )}
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
