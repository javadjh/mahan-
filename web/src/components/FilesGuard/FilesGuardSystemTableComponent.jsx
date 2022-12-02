import React from "react";
import CustomButton from "../../styled/components/CustomButton";
import {
  darkBlueColor,
  grayColor,
  lightGreenColor,
  redColor,
} from "../../app/appColor";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import { Table } from "antd";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { fileConfirmAction } from "../../stateManager/actions/FileAction";
import CustomDialog from "../../styled/components/CustomDialog";
import FileGuardSystemActionDialog from "../../dialog/FileGuardSystemActionDialog";
import { SpaceStyled } from "../../styled/global";

const FilesGuardSystemTableComponent = ({ files, setPageId, setReload }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const columns = [
    {
      title: "شماره",
      key: "index",
      render: (item, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "شماره پرونده",
      key: "fileCode",
      dataIndex: "fileCode",
    },
    {
      title: "عنوان",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "وضعیت",
      key: "fileStatus",
      dataIndex: "fileStatus",
    },
    {
      title: "نوع",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "ایجاد کننده",
      key: "creator",
      render: (item) => (
        <span>
          {item?.creator?.firstName} {item?.creator?.lastName}
        </span>
      ),
    },
    {
      title: "عملیات",
      key: "action",
      width: "45%",
      render: (item) => (
        <>
          <CustomButton
            onClick={() => {
              history.push("/file/" + item._id);
            }}
            color={darkBlueColor}
            style={{ marginLeft: 10 }}
          >
            نمایش
          </CustomButton>
          <CustomDialog
            title={"تایید پرونده"}
            render={
              <FileGuardSystemActionDialog
                item={item}
                isReject={false}
                setReload={setReload}
              />
            }
            actionRender={
              <CustomButton color={lightGreenColor}>تایید پرونده</CustomButton>
            }
          />
          <CustomDialog
            title={"رد پرونده"}
            render={
              <FileGuardSystemActionDialog
                item={item}
                isReject={true}
                setReload={setReload}
              />
            }
            actionRender={
              <CustomButton
                style={{ marginRight: 10, marginLeft: 10 }}
                color={redColor}
              >
                رد پرونده
              </CustomButton>
            }
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={files.files}
        pagination={{
          onChange: (page) => {
            setPageId(page);
          },
          defaultCurrent: files.pageId,
          total: files.total,
          current: files.pageId,
          pageSize: files.eachPerPage,
        }}
      />
    </>
  );
};
export default FilesGuardSystemTableComponent;
