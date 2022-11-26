import React from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import DocumentsTable from "../document/DocumentsTable";
const TabsComponent = () => {
  return (
    <Tabs>
      <Tabs.TabPane tab=" لیست اسناد " key={"docs"}>
        <DocumentsTable />
      </Tabs.TabPane>
      <Tabs.TabPane tab="تاریخچه اسناد " key={"history"}></Tabs.TabPane>
      <Tabs.TabPane tab="آمار پرونده " key={"statistic"}></Tabs.TabPane>
      <Tabs.TabPane tab="اسناد حذف شده " key={"deleted"}></Tabs.TabPane>
      <Tabs.TabPane tab="روکش پرونده" key={"form"}></Tabs.TabPane>
    </Tabs>
  );
};
export default TabsComponent;
