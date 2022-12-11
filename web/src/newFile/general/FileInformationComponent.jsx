import { Col, Image, Row } from "antd";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { darkBlueColor, lightGreenColor, titleColor } from "../../app/appColor";
import { FileContext } from "../../context/file/FileContext";
import CustomCard from "../../styled/components/CustomCard";
import CustomMediumButton from "../../styled/components/CustomMediumButton";
import CustomSmallButton from "../../styled/components/CustomSmallButton";
import CustomText from "../../styled/components/CustomText";
import { CenterStyled, CustomCursor, SpaceStyled } from "../../styled/global";
import { FileNameBlock } from "../file.style";
import CardItemComponent from "./CardItemComponent";

const FileInformationComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        {isExpanded && (
          <>
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
          </>
        )}
        <CenterStyled>
          {isExpanded ? (
            <CustomCursor>
              <CustomText
                color={lightGreenColor}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                کم تر
              </CustomText>
            </CustomCursor>
          ) : (
            <BottonShadowBlock>
              <CustomCursor>
                <CustomText
                  color={lightGreenColor}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  بیشتر...
                </CustomText>
              </CustomCursor>
            </BottonShadowBlock>
          )}
        </CenterStyled>
      </Row>
    </CustomCard>
  );
};
export default FileInformationComponent;
const BottonShadowBlock = styled.div`
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  height: 70px;
  margin-top: -70px;
  z-index: 4;
  text-align: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
