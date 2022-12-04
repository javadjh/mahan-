import { Table } from "antd";
import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import Auth from "../../auth/Auth";
const PeopleTableComponent = (props) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "نام و نام خانوادگی",
      key: "fullName",
      render: (item) => (
        <span>
          {item.firstName} {item.lastName}
        </span>
      ),
    },
    {
      title: "پدر",
      key: "fathersName",
      dataIndex: "fathersName",
    },
    {
      title: "شناسنامه",
      key: "idCode",
      dataIndex: "idCode",
    },
    {
      title: "تولد",
      key: "birthday",
      dataIndex: "birthday",
    },
    {
      title: "شماره ملی",
      key: "melliCode",
      dataIndex: "melliCode",
    },
    {
      title: "جنسیت",
      key: "index",
      render: (item) => <span>{item.gender === "man" ? "آقا" : "خانم"}</span>,
    },
    {
      title: "عملیات",
      key: "action",
      width: "30%",
      render: (item) => (
        <Auth accessList={["مدیریت اشخاص حقیقی"]}>
          <CustomButton
            onClick={() => {
              props.editPersonHandle(item);
            }}
            color={darkBlueColor}
            style={{ marginLeft: 10 }}
          >
            ویرایش
          </CustomButton>
          <CustomPopConfirm
            onDelete={() => {
              props.deletePersonHandle(item._id);
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
        dataSource={props.people}
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
export default PeopleTableComponent;
