import React from "react";
import { Button, Col, Dropdown, Image, Menu, Row } from "antd";
import CustomDialog from "../../styled/components/CustomDialog";
import CustomMediumButton from "../../styled/components/CustomMediumButton";
import { AiOutlinePlus, AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import {
  blueColor,
  darkBlueColor,
  lightGreenColor,
  redColor,
  transeparentColor,
} from "../../app/appColor";
import ScanDialog from "../../dialog/scan/components/ScanDialog";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
import { useHistory } from "react-router";
import { SpaceStyled } from "../../styled/global";
import InsertFileComponent from "../../ArchiveTree/files/InsertFileComponent";
import CustomSmallButton from "../../styled/components/CustomSmallButton";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import ShareFile from "./ShareFile";
import Auth from "../../auth/Auth";
const iconStyle = { fontSize: 17, marginTop: 5 };
const FileGlobalActionsComponenets = ({ history }) => {
  history = useHistory();
  const { onImageChange, fileId, deleteFileHandler, downloadGroupDocuments } =
    useContext(FileContext);
  const menu = (
    <Menu>
      <Menu.Item>
        <label
          htmlFor="input-url"
          className={"mb-0 pb-0"}
          style={{
            cursor: "pointer",
          }}
        >
          انتخاب اسناد
        </label>
      </Menu.Item>
      <Menu.Item>
        <label
          htmlFor="getFolder"
          className={"mb-0 pb-0"}
          style={{
            cursor: "pointer",
          }}
        >
          انتخاب پوشه
        </label>
      </Menu.Item>
      <Menu.Item>کازیو</Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            localStorage.setItem("file", fileId);
            history.push({
              pathname: "/edit",
            });
          }}
        >
          <label
            className={"mb-0 pb-0"}
            style={{
              cursor: "pointer",
            }}
          >
            بارگذاری پیشرفته تصویر
          </label>
        </span>
      </Menu.Item>
      <Menu.Item>
        <ScanDialog
          onScannedListener={(fileScanned) => {
            onImageChange([fileScanned]);
          }}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <Row>
      <Auth accessList={["ویرایش پرونده"]}>
        <Col>
          <SpaceStyled horizontal={5}>
            <CustomDialog
              title={"پرونده"}
              render={<InsertFileComponent isUpdate={true} fileId={fileId} />}
              width={"60%"}
              actionRender={
                <CustomMediumButton
                  icon={<FiEdit style={iconStyle} />}
                  isBordred={true}
                  color={blueColor}
                >
                  ویرایش پرونده
                </CustomMediumButton>
              }
            />
          </SpaceStyled>
        </Col>
      </Auth>

      <Auth accessList={["دریافت سند"]}>
        <Col>
          <CustomMediumButton
            icon={<HiOutlineDownload style={iconStyle} />}
            isBordred={true}
            color={blueColor}
            onClick={downloadGroupDocuments}
          >
            دریافت
          </CustomMediumButton>
        </Col>
      </Auth>
      <Auth accessList={["حذف پرونده"]}>
        <Col>
          <SpaceStyled horizontal={5}>
            <CustomPopConfirm
              onDelete={deleteFileHandler}
              render={
                <CustomMediumButton
                  icon={<MdOutlineDelete style={iconStyle} />}
                  isBordred={true}
                  color={blueColor}
                >
                  حذف پرونده
                </CustomMediumButton>
              }
            />
          </SpaceStyled>
        </Col>
      </Auth>
      <Auth accessList={["اشتراک گذاری"]}>
        <Col>
          <CustomDialog
            title={"پرونده"}
            render={<ShareFile fileId={fileId} />}
            width={"60%"}
            actionRender={
              <CustomMediumButton
                icon={<AiOutlineShareAlt style={iconStyle} />}
                isBordred={true}
                color={blueColor}
              >
                اشتراک گذاری
              </CustomMediumButton>
            }
          />
        </Col>
      </Auth>
      <Auth accessList={["ایجاد سند"]}>
        <Col>
          <SpaceStyled horizontal={5}>
            <Dropdown overlay={menu}>
              <CustomMediumButton
                color={lightGreenColor}
                icon={<AiOutlinePlus style={iconStyle} />}
              >
                افزودن سند
              </CustomMediumButton>
            </Dropdown>
          </SpaceStyled>
        </Col>
      </Auth>
    </Row>
  );
};
export default FileGlobalActionsComponenets;
