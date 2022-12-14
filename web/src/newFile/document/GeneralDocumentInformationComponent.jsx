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
const GeneralDocumentInformationComponent = () => {
  const { document, previewUrl } = useContext(DocumentContext);

  return (
    <Fragment>
      {previewUrl && <Image src={`${previewUrl}`} />}
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
                دانلود سند
              </CustomButton>
            </SpaceStyled>
          </Col>
          <Col span={12}>
            <SpaceStyled right={10}>
              <CustomButton
                block
                icon={
                  <SpaceStyled top={-5}>
                    <Image src="/assets/icons/rm.svg" />
                  </SpaceStyled>
                }
                color={lightRedColor}
              >
                پاک کردن
              </CustomButton>
            </SpaceStyled>
          </Col>
          <Col span={24}>
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
                ویرایش و ثبت نسخه جدید ( نسخه {document.document.lastVersion})
              </CustomButton>
            </SpaceStyled>
          </Col>
        </Row>
        <OptionItemComponent
          icon={"profile"}
          keyName={"بارگذاری شده توسط"}
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
    </Fragment>
  );
};
export default GeneralDocumentInformationComponent;
