import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor, orangeColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import { Table } from "antd";
import ChangeUsersPasswordAdminDialog from "../../dialog/ChangeUsersPasswordAdminDialog";
import CustomDialog from "../../styled/components/CustomDialog";
const UsersTableComponent = ({
  users,
  deleteHandle,
  upsertIntent,
  isShowResetPasswordDialog,
}) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "نام",
      key: "name",
      render: (item) => (
        <span>
          {item.firstName} {item.lastName}
        </span>
      ),
    },
    {
      title: "تلفن",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "نام کاربری",
      key: "userName",
      dataIndex: "userName",
    },
    {
      title: "سمت",
      key: "position",
      dataIndex: "position",
    },
    {
      title: "عملیات",
      key: "action",

      render: (item) => (
        <>
          <CustomPopConfirm
            onDelete={() => {
              deleteHandle(item._id);
            }}
            render={
              <CustomButton style={{ marginLeft: 10 }} color={grayColor}>
                حذف
              </CustomButton>
            }
          />
          <CustomButton
            style={{ marginLeft: 10 }}
            onClick={() => {
              upsertIntent(item);
            }}
            color={darkBlueColor}
          >
            ویرایش
          </CustomButton>
          <CustomDialog
            title={"تغییر کلمه ی عبور"}
            render={<ChangeUsersPasswordAdminDialog user={item} />}
            actionRender={
              <CustomButton color={orangeColor}>تغییر کلمه عبور</CustomButton>
            }
            isShow={isShowResetPasswordDialog}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={users} pagination={false} />
    </>
  );
};
export default UsersTableComponent;
