import { Col, Image, Row } from "antd";
import React from "react";
import { useContext } from "react";
import { darkBlueColor, lightGreenColor, titleColor } from "../../app/appColor";
import { FileContext } from "../../context/file/FileContext";
import CustomCard from "../../styled/components/CustomCard";
import CustomMediumButton from "../../styled/components/CustomMediumButton";
import CustomSmallButton from "../../styled/components/CustomSmallButton";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";
import { FileNameBlock } from "../file.style";
import CardItemComponent from "./CardItemComponent";

const FileInformationComponent = () => {
  const { fileStatistic } = useContext(FileContext);
  return (
    <CustomCard>
      <FileNameBlock>
        <Row justify="space-between">
          <Col>
            <Row>
              <Col>
                <CustomText color={darkBlueColor}>عنوان پرونده</CustomText>
              </Col>
              <Col>
                <SpaceStyled right={10}>
                  <CustomText color={titleColor}>
                    {fileStatistic?.file?.title}
                  </CustomText>
                </SpaceStyled>
              </Col>
            </Row>
          </Col>
          <Col>
            <Image src="/assets/icons/file.svg" />
          </Col>
        </Row>
      </FileNameBlock>
      <Row>
        <Col span={8}>
          <CardItemComponent
            title={"شماره پرونده"}
            value={fileStatistic?.file?.fileCode}
          />
        </Col>
        <Col span={8}>
          <CardItemComponent
            title={"تاریخ ایجاد"}
            value={fileStatistic?.file?.fileDate}
          />
        </Col>
        <Col span={8}>
          <CardItemComponent
            title={"تعداد پرونده"}
            value={fileStatistic?.totalCount}
          />
        </Col>
        <Col span={8}>
          <CardItemComponent
            title={"زبان پرونده"}
            value={
              fileStatistic?.file?.archiveTreeId?.lang === "en"
                ? "انگلیسی"
                : "فارسی"
            }
          />
        </Col>
        <Col span={8}>
          <CardItemComponent
            title={"نوع پرونده"}
            value={fileStatistic?.file?.type}
          />
        </Col>
        <Col span={8}>
          <CardItemComponent
            title={"درخواست کننده"}
            value={fileStatistic?.file?.applicantId?.title}
          />
        </Col>
        <Col span={8}>
          <CardItemComponent
            title={"حجم پرونده"}
            value={fileStatistic?.totalSize}
          />
        </Col>
        <Col span={8}>
          <CardItemComponent
            title={"وضعیت پرونده"}
            value={fileStatistic?.file?.fileStatus}
          />
        </Col>
        <Col span={24}>
          <CardItemComponent
            title={"مخاطبین"}
            value={
              <>
                <Row>
                  {fileStatistic?.file?.contacts?.map((contact) => (
                    <Col>
                      <SpaceStyled horizontal={10}>
                        <CustomMediumButton
                          color={
                            contact?.type === "person"
                              ? lightGreenColor
                              : darkBlueColor
                          }
                        >
                          {contact.label}
                        </CustomMediumButton>
                      </SpaceStyled>
                    </Col>
                  ))}
                </Row>
              </>
            }
          />
        </Col>
      </Row>
    </CustomCard>
  );
};
export default FileInformationComponent;
