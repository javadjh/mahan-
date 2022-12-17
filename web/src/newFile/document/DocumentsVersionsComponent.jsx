import { Col, Divider, Row, Table } from "antd";
import React, { Fragment } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { blueColor, dertyBlue, redColor } from "../../app/appColor";
import { DocumentContext } from "../../context/document/DocumentContext";
import CustomText from "../../styled/components/CustomText";
const DocumentsVersionsComponent = () => {
  const {
    document: { versions },
  } = useContext(DocumentContext);

  const BlueText = styled(CustomText).attrs({
    color: blueColor,
  })``;
  const columns = [
    {
      title: <BlueText>بارگذاری توسط</BlueText>,
      key: "creator",
      dataIndex: "creator",
      render: (creator) => (
        <CustomText>
          {creator?.firstName} {creator?.lastName}
        </CustomText>
      ),
    },

    {
      title: <BlueText>تاریخ</BlueText>,
      key: "createDate",
      dataIndex: "createDate",
      render: (createDate) => <CustomText>{createDate}</CustomText>,
    },
    {
      title: <BlueText>نام سند</BlueText>,
      key: "title",
      render: ({ title, version }) => (
        <BlueText underline>
          {title} - ورژن {version}
        </BlueText>
      ),
    },
  ];
  return (
    <Fragment>
      <Divider orientation="right">نسخه های دیگر سند</Divider>
      <Table pagination={false} columns={columns} dataSource={versions} />
    </Fragment>
  );
};
export default DocumentsVersionsComponent;
