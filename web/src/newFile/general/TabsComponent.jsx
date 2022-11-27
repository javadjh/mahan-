import React from "react";
import { Tabs } from "antd";
import DocumentsTable from "../document/DocumentsTable";
import FilesLogTable from "./FilesLogTable";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
import FileStatisticComponent from "./FileStatisticComponent";
import DeletedDocsTable from "../document/DeletedDocsTable";
const TabsComponent = () => {
  const { setTabState } = useContext(FileContext);
  return (
    <Tabs
      onChange={(e) => {
        setTabState(e);
      }}
    >
      <Tabs.TabPane tab=" لیست اسناد " key={"docs"}>
        <DocumentsTable />
      </Tabs.TabPane>
      <Tabs.TabPane tab="تاریخچه اسناد " key={"log"}>
        <FilesLogTable />
      </Tabs.TabPane>
      <Tabs.TabPane tab="آمار پرونده " key={"statistic"}>
        <FileStatisticComponent />
      </Tabs.TabPane>
      <Tabs.TabPane tab="اسناد حذف شده " key={"deleted"}>
        <DeletedDocsTable />
      </Tabs.TabPane>
      <Tabs.TabPane tab="روکش پرونده" key={"form"}></Tabs.TabPane>
    </Tabs>
  );
};
export default TabsComponent;
