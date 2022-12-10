import React from "react";
import { Tabs } from "antd";
import DocumentsTable from "../document/DocumentsTable";
import FilesLogTable from "./FilesLogTable";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
import FileStatisticComponent from "./FileStatisticComponent";
import DeletedDocsTable from "../document/DeletedDocsTable";
import FilesFormComponent from "./FilesFormComponent";
import MergeAlertComponent from "./MergeAlertComponent";
import CustomText from "../../styled/components/CustomText";
import {
  darkBlueColor,
  lightGreenColor,
  orangeColor,
  redColor,
} from "../../app/appColor";
import CorrespondenceRoot from "./CorrespondenceRoot";
import Auth from "../../auth/Auth";
const TabsComponent = () => {
  const { setTabState, fileStatistic } = useContext(FileContext);
  const nazerTab = () => {
    if (fileStatistic?.file?.isConfirm)
      return <CustomText color={lightGreenColor}>ناظر (تایید شده)</CustomText>;
    if (fileStatistic?.file?.isReject)
      return <CustomText color={redColor}>ناظر (مرجوع شده)</CustomText>;
    if (fileStatistic?.file?.isWaiting)
      return <CustomText color={orangeColor}>ناظر (در انتظار)</CustomText>;

    return <CustomText color={darkBlueColor}>ناظر (بدون عملیات)</CustomText>;
  };
  return (
    <Tabs
      defaultActiveKey="alert"
      onChange={(e) => {
        setTabState(e);
      }}
    >
      <Tabs.TabPane tab="روکش پرونده" key={"form"}>
        <Auth accessList={["ویرایش روکش پرونده"]}>
          <FilesFormComponent />
        </Auth>
      </Tabs.TabPane>
      <Tabs.TabPane tab=" لیست اسناد " key={"docs"}>
        <Auth
          accessList={[
            "ایجاد سند",
            "ویرایش سند",
            "حذف سند",
            "نمایش سندها",
            "دریافت سند",
          ]}
        >
          <DocumentsTable />
        </Auth>
      </Tabs.TabPane>
      <Tabs.TabPane tab="تاریخچه اسناد " key={"log"}>
        <Auth accessList={["تاریخچه تغییرات سند"]}>
          <FilesLogTable />
        </Auth>
      </Tabs.TabPane>

      <Tabs.TabPane tab="آمار پرونده " key={"statistic"}>
        <FileStatisticComponent />
      </Tabs.TabPane>
      <Tabs.TabPane tab="اسناد حذف شده " key={"deleted"}>
        <Auth accessList={["مدیریت اسناد حذف شده"]}>
          <DeletedDocsTable />
        </Auth>
      </Tabs.TabPane>
      <Tabs.TabPane tab="هشدار ها" key={"alerts"}>
        <MergeAlertComponent />
      </Tabs.TabPane>
      <Tabs.TabPane tab={nazerTab()} key={"nazer"}>
        <CorrespondenceRoot />
      </Tabs.TabPane>
    </Tabs>
  );
};
export default TabsComponent;
