import { Table } from "antd";
import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
const RolesTableComponent = ({ roles, upsertRoleHandle, deleteHandle }) => {
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
      title: "دسترسی ها",
      key: "fathersName",
      render: (item, record, index) => <span>{item.accessList.length}</span>,
    },
    {
      title: "عملیات",
      key: "action",
      width: "30%",
      render: (item) => (
        <>
          <CustomButton
            onClick={() => {
              upsertRoleHandle(item);
            }}
            color={darkBlueColor}
            style={{ marginLeft: 10 }}
          >
            ویرایش
          </CustomButton>
          <CustomPopConfirm
            onDelete={() => {
              deleteHandle(item._id);
            }}
            render={<CustomButton color={grayColor}>حذف</CustomButton>}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={roles} pagination={false} />
    </>
  );
};
export default RolesTableComponent;
