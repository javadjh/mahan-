import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import { Table } from "antd";
import Auth from "../../auth/Auth";
const LegalPeopleTableComponent = (props) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "شرکت",
      key: "companyName",
      dataIndex: "companyName",
    },
    {
      title: "مدیر عامل",
      key: "ceo",
      dataIndex: "ceo",
    },
    {
      title: "تاریخ ثبت",
      key: "registerDate",
      dataIndex: "registerDate",
    },
    {
      title: "شماره ثبت",
      key: "registerCode",
      dataIndex: "registerCode",
    },
    {
      title: "عملیات",
      key: "action",
      width: "30%",
      render: (item) => (
        <Auth accessList={["مدیریت اشخاص حقوقی"]}>
          حقوقی
          <CustomButton
            onClick={() => {
              props.onClickEditLegalPerson(item);
            }}
            color={darkBlueColor}
            style={{ marginLeft: 10 }}
          >
            ویرایش
          </CustomButton>
          <CustomPopConfirm
            onDelete={() => {
              props.deleteLegalPerson(item._id);
            }}
            render={<CustomButton color={grayColor}>حذف</CustomButton>}
          />
        </Auth>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={props.legalPeople}
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
export default LegalPeopleTableComponent;
