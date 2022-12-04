import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
import { darkBlueColor } from "../../app/appColor";
import CustomButton from "../../styled/components/CustomButton";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import Auth from "../../auth/Auth";
const DeletedDocsTable = () => {
  const { documentsFilterHandle, restoreDocHandler } = useContext(FileContext);
  const deActivateDocuments = useSelector((state) => state.deActivateDocuments);

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
        <Auth accessList={["مدیریت اسناد حذف شده"]}>
          <CustomPopConfirm
            onDelete={() => {
              restoreDocHandler(item._id);
            }}
            render={
              <CustomButton color={darkBlueColor}>بازگردانی</CustomButton>
            }
          />
          {/* <CustomButton
            style={{ marginRight: 5 }}
            onClick={() => upsertArchiveHandle(item)}
            color={darkBlueColor}
          >
            ویرایش
          </CustomButton> */}
        </Auth>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={deActivateDocuments.documents}
      pagination={{
        onChange: (page) => {
          documentsFilterHandle({ pageId: page });
        },
        defaultCurrent: deActivateDocuments.pageId,
        total: deActivateDocuments.total,
        current: deActivateDocuments.pageId,
        pageSize: deActivateDocuments.eachPerPage,
      }}
    />
  );
};
export default DeletedDocsTable;
