import React from "react";
import { Col, Image, Row } from "antd";
import CustomSmallButton from "../../styled/components/CustomSmallButton";
import CustomDialog from "../../styled/components/CustomDialog";
import {
  CenterVerticalStyled,
  CustomCursor,
  SpaceStyled,
} from "../../styled/global";
import {
  ArchiveItem,
  LabelArchiveText,
  TitleArchiveText,
} from "./archives.styled";
import InsertMoreSettingDialog from "../../ArchiveTree/dialog/InsertMoreSettingDialog";
import { useState } from "react";
import {
  getSingleArchiveAction,
  setArchiveState,
} from "../../stateManager/actions/ArchiveAction";
import { useDispatch } from "react-redux";
const ArchiveItemComponent = ({ archive }) => {
  const dispatch = useDispatch();
  const [isShowMoreSettingDialog, setIsShowMoreSettingDialog] = useState(false);
  return (
    <ArchiveItem>
      <Row justify="space-between">
        <Col span={3}>
          <CenterVerticalStyled>
            <Image
              height={50}
              preview={false}
              src="http://localhost:3000/assets/icon-archive.png"
            />
          </CenterVerticalStyled>
        </Col>
        <Col
          onClick={async () => {
            await dispatch(setArchiveState(archive.archiveId._id));
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
          span={5}
        >
          <CustomCursor>
            <LabelArchiveText>نام بایگانی</LabelArchiveText>
            <TitleArchiveText>{archive?.archiveId?.title}</TitleArchiveText>
          </CustomCursor>
        </Col>
        <Col span={12}>
          {archive?.archiveId?.description && (
            <Row>
              <Col>
                <Image
                  preview={false}
                  src="http://localhost:3000/assets/description-vector.png"
                />
              </Col>
              <Col>
                <SpaceStyled right={10}>
                  <LabelArchiveText>نام بایگانی</LabelArchiveText>
                  <TitleArchiveText>
                    {archive?.archiveId?.description}
                  </TitleArchiveText>
                </SpaceStyled>
              </Col>
            </Row>
          )}
        </Col>
        <Col span={4}>
          <CustomDialog
            title={"تنظیمات بایگانی"}
            render={<InsertMoreSettingDialog />}
            actionRender={
              <CustomSmallButton
                onClick={async () => {
                  await dispatch(getSingleArchiveAction(archive.archiveId._id));
                  setIsShowMoreSettingDialog(true);
                }}
              >
                تنظیمات بایگانی
              </CustomSmallButton>
            }
            isShow={isShowMoreSettingDialog}
          />
        </Col>
      </Row>
    </ArchiveItem>
  );
};
export default ArchiveItemComponent;
