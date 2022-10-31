import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import { darkBlueColor, grayColor } from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import { Table } from "antd";
const ApplicantTableComponent = ({
  applicants,

  deleteApplicantsHandle,
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
      width: "70%",
    },
    {
      title: "عملیات",
      key: "action",
      width: "20%",
      render: (item) => (
        <>
          <CustomPopConfirm
            onDelete={() => {
              deleteApplicantsHandle(item._id);
            }}
            render={<CustomButton color={grayColor}>حذف</CustomButton>}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={applicants} pagination={false} />
    </>
  );
};
export default ApplicantTableComponent;
