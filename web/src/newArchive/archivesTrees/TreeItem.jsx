import React, { useContext, useState } from "react";
import { ArchiveTreeItem } from "./archiveTree.styled";
import { Col, Image, Row } from "antd";
import CustomText from "../../styled/components/CustomText";
import CustomDialog from "../../styled/components/CustomDialog";
import CustomButton from "../../styled/components/CustomButton";
import CustomSmallButton from "../../styled/components/CustomSmallButton";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import {
  CenterVerticalStyled,
  CustomCursor,
  SpaceStyled,
} from "../../styled/global";
import { grayColor, lightGreenColor, orangeColor } from "../../app/appColor";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import ArchiveTreeSettingDialog from "../../ArchiveTree/dialog/ArchiveTreeSettingDialog";
import InsertFileComponent from "../../ArchiveTree/files/InsertFileComponent";
import Auth from "../../auth/Auth";
const TreeItem = ({ tree, addTree }) => {
  const { changeTreeTitle, deleteArchiveTree, reload, setMainTree, mainTree } =
    useContext(ArchiveTreeContext);
  return (
    <ArchiveTreeItem>
      <Row justify="space-between" align="middle">
        <Col span={2}>
          <CenterVerticalStyled>
            <Image
              preview={false}
              src="http://192.168.2.25:3000/assets/icon-archive.png"
            />
          </CenterVerticalStyled>
        </Col>
        <Col span={6}>
          <CustomText
            editable={{
              icon: (
                <Auth accessList={["مدیریت درخت"]}>
                  <Image
                    preview={false}
                    src="http://192.168.2.25:3000/assets/edit-vector.png"
                  />
                </Auth>
              ),

              tooltip: "ویرایش عنوان قفسه",
              onChange: (text) => {
                changeTreeTitle(tree._id, text);
              },
            }}
            color={"black"}
          >
            <CustomCursor
              onClick={() => {
                if (tree.isMain) {
                  setMainTree(tree);
                }
                addTree(tree);
              }}
            >
              {tree.title}
            </CustomCursor>
          </CustomText>
        </Col>
        <Col span={3}>
          <CustomText>تعداد پرونده ها</CustomText>
          <CustomText>{tree.totalFileCount}</CustomText>
        </Col>
        <Col span={13}>
          <Row justify="end">
            <Col>
              <SpaceStyled left={5}>
                <Auth accessList={["ویرایش پرونده"]}>
                  <CustomDialog
                    title={"پرونده"}
                    render={
                      <InsertFileComponent
                        inTree={false}
                        tree={tree}
                        mainTree={mainTree}
                      />
                    }
                    width={"60%"}
                    actionRender={
                      <CustomSmallButton
                        color={lightGreenColor}
                        icon={
                          <Image
                            preview={false}
                            src="http://192.168.2.25:3000/assets/plus-vector.png"
                          />
                        }
                      >
                        افزودن پرونده به قفسه
                      </CustomSmallButton>
                    }
                  />
                </Auth>
              </SpaceStyled>
            </Col>
            <Col>
              <SpaceStyled left={5}>
                <Auth accessList={["مدیریت درخت"]}>
                  <CustomPopConfirm
                    onDelete={() => deleteArchiveTree(tree._id)}
                    render={
                      <CustomSmallButton
                        color={grayColor}
                        icon={
                          <Image
                            preview={false}
                            src="http://192.168.2.25:3000/assets/delete-vector.png"
                          />
                        }
                      >
                        حذف قفسه
                      </CustomSmallButton>
                    }
                  />
                </Auth>
              </SpaceStyled>
            </Col>
            <Col>
              <SpaceStyled left={5}>
                <Auth accessList={["مدیریت درخت"]}>
                  <CustomDialog
                    width={"60%"}
                    title={"تنظیمات قفسه"}
                    render={
                      <ArchiveTreeSettingDialog tree={tree} reload={reload} />
                    }
                    actionRender={
                      <CustomSmallButton
                        color={orangeColor}
                        icon={
                          <Image
                            preview={false}
                            src="http://192.168.2.25:3000/assets/setting-vector.png"
                          />
                        }
                      >
                        تنظیمات قفسه
                      </CustomSmallButton>
                    }
                  />
                </Auth>
              </SpaceStyled>
            </Col>
          </Row>
        </Col>
      </Row>
    </ArchiveTreeItem>
  );
};
export default TreeItem;
