import { Table } from "antd";
import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import CustomText from "../../styled/components/CustomText";
const LendsTableComponent = ({ lends, history }) => {
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "پرونده",
      key: "title",
      render: (item) => <span>{item.fileId.title}</span>,
    },
    {
      title: "وضعیت پرونده",
      key: "fileStatus",
      render: (item) => <span>{item.fileId.fileStatus}</span>,
    },
    {
      title: "نوع",
      key: "type",
      render: (item) => <span>{item.fileId.type}</span>,
    },
    {
      title: "فرستنده",
      key: "creator",
      render: (item) => (
        <span>
          {item?.creator?.firstName} {item?.creator?.lastName} (
          {item?.creator?.position})
        </span>
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
    {
      title: "پایان",
      key: "expireDate",
      render: (item) => (
        <CustomButton
          onClick={() => {
            history.push({
              pathname: "/file/" + item?.fileId?._id + "/0",
              state: {
                isLend: true,
              },
            });
          }}
        >
          نمایش پرونده
        </CustomButton>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={lends} pagination={false} />
    </>
  );
};
export default LendsTableComponent;
