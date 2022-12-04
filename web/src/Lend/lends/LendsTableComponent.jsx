import { Table } from "antd";
import React from "react";
import CustomText from "../../styled/components/CustomText";
const LendsTableComponent = ({ lends }) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "پرونده",
      key: "title",
      render: (item) => <CustomText>{item.fileId.title}</CustomText>,
    },
    {
      title: "وضعیت پرونده",
      key: "fileStatus",
      render: (item) => <CustomText>{item.fileId.fileStatus}</CustomText>,
    },
    {
      title: "نوع",
      key: "type",
      render: (item) => <CustomText>{item.fileId.type}</CustomText>,
    },
    {
      title: "فرستنده",
      key: "creator",
      render: (item) => (
        <CustomText>
          {item?.creator?.firstName} {item?.creator?.lastName} (
          {item?.creator?.position})
        </CustomText>
      ),
    },
    {
      title: "شروع",
      key: "createDate",
      dataIndex: "createDate",
    },
    {
      title: "پایان",
      key: "expireDate",
      dataIndex: "expireDate",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={lends.lends} pagination={false} />
    </>
  );
};
export default LendsTableComponent;
