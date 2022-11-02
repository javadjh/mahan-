import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import { Table } from "antd";
import { SpaceStyled } from "../../styled/global";
const ArchivesTableComponent = ({
  archives,
  upsertArchiveHandle,
  deleteArchive,
}) => {
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
      title: "سازنده",
      key: "creator",
      render: (item) => (
        <span>{item.creator ? item.creator.userName : ""}</span>
      ),
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
          <CustomPopConfirm
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
          </CustomButton>
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={archives} pagination={false} />
    </>
  );
};
export default ArchivesTableComponent;
