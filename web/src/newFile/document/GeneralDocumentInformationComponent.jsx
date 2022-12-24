import { Col, Image, Row } from "antd";
import React, { Fragment } from "react";
import {
  lightBlueSecondColor,
  blueColor,
  lightRedColor,
  darkBlueColor,
} from "../../app/appColor";
import { useContext } from "react";

import { DocumentContext } from "../../context/document/DocumentContext";
import CustomMediumButton from "../../styled/components/CustomMediumButton";
import CustomButton from "../../styled/components/CustomButton";
import { SpaceStyled } from "../../styled/global";
import OptionItemComponent from "./OptionItemComponent";
import CustomDialog from "../../styled/components/CustomDialog";
import ShowSingleDocumentDialog from "../../ArchiveTree/dialog/ShowSingleDocumentDialog";
import Auth from "../../auth/Auth";
import { FRONT_IP } from "../../config/ip";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
const GeneralDocumentInformationComponent = () => {
  const { document, previewUrl, deleteDocHandler } =
    useContext(DocumentContext);

  return (
    <Fragment>
      {previewUrl && (
        <Image
          src={`${previewUrl}`}
          fallback={`${FRONT_IP}/assets/image-placeholder.jpg`}
        />
      )}
      <SpaceStyled top={15}>
        <Row>
          <Col span={12}>
            <SpaceStyled left={10}>
              <CustomButton
                block
                icon={
                  <SpaceStyled top={-5}>
                    <Image src="/assets/icons/dl.svg" />
                  </SpaceStyled>
                }
                color={lightBlueSecondColor}
                textColor={blueColor}
              >
                دانلود
              </CustomButton>
            </SpaceStyled>
          </Col>
          <Col span={12}>
            <SpaceStyled right={10}>
              <CustomPopConfirm
                onDelete={deleteDocHandler}
                render={
                  <CustomButton
                    block
                    icon={
                      <SpaceStyled top={-5}>
                        <Image src="/assets/icons/rm.svg" />
                      </SpaceStyled>
                    }
                    color={lightRedColor}
                  >
                    حذف
                  </CustomButton>
                }
              />
            </SpaceStyled>
          </Col>
          <Col span={24}>
            <Auth accessList={["نمایش سندها"]} isLend={true}>
              <CustomDialog
                width={"100%"}
                title={"سند"}
                render={
                  <ShowSingleDocumentDialog
                    isLoaded={previewUrl}
                    previewUrl={previewUrl}
                    doc={document?.document}
                  />
                }
                actionRender={
                  <SpaceStyled top={10}>
                    <CustomButton
                      block
                      icon={
                        <SpaceStyled top={-5}>
                          <Image src="/assets/icons/edit-image.svg" />
                        </SpaceStyled>
                      }
                      color={darkBlueColor}
                    >
                      ویرایش ( نسخه {document.document.lastVersion})
                    </CustomButton>
                  </SpaceStyled>
                }
              />
            </Auth>
          </Col>
        </Row>
        <SpaceStyled top={30}>
          <OptionItemComponent
            icon={"profile"}
            keyName={"بارگذاری توسط"}
            valueName={`${document.document?.creator?.firstName} ${document.document?.creator?.lastName}`}
          />
          <OptionItemComponent
            icon={"book"}
            keyName={"حجم سند"}
            valueName={document.document.documentSize}
          />
          <OptionItemComponent
            icon={"clock"}
            keyName={"تاریخ بارگذاری"}
            valueName={document.document.createDate}
          />
          <OptionItemComponent
            icon={"clock"}
            keyName={"تاریخ سر رسید"}
            valueName={document.document.createDate}
          />
        </SpaceStyled>
      </SpaceStyled>
    </Fragment>
  );
};
export default GeneralDocumentInformationComponent;
