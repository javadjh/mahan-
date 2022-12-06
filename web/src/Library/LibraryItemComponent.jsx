import { Col, Image, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import CustomPopConfirm from "../styled/components/CustomPopConfirm";
import CustomText from "../styled/components/CustomText";
import { CenterStyled, CustomCursor, SpaceStyled } from "../styled/global";
const LibraryItemComponent = ({
  item,
  selectedDoc,
  removeDoc,
  addDoc,
  deleteDocument,
  setSingleDocument,
  getDocumentsFile,
}) => {
  const Containner = styled.div`
    background: #ffffff;
    border: 1.2px solid #eef2f5;
    box-shadow: 0px 7px 17px -3px rgba(77, 89, 107, 0.05);
    border-radius: 8px;
    padding: 0px 20px;
    width: 160px;
    margin: 5px;
  `;
  return (
    <Containner>
      <CenterStyled>
        <SpaceStyled bottom={20} top={5}>
          <CustomCursor>
            <Image
              onClick={() => {
                if (selectedDoc.includes(item._id)) removeDoc(item._id);
                else addDoc(item._id);
              }}
              preview={false}
              src={`/assets/icons/${
                selectedDoc.includes(item._id) ? "check" : "dot"
              }.svg`}
            />
          </CustomCursor>
        </SpaceStyled>
        <Image preview={false} src="/assets/icons/folder.svg" />
        <SpaceStyled horizontal={40}>
          <Typography.Paragraph
            style={{ width: 120, textAlign: "center" }}
            ellipsis={{ rows: 1, tooltip: item.title }}
          >
            {item.title}
          </Typography.Paragraph>
        </SpaceStyled>
        <CustomText>
          {item.createDate} ({item.lastModify})
        </CustomText>
        <SpaceStyled top={10} bottom={20}>
          <Row>
            <Col>
              <SpaceStyled horizontal={7}>
                <CustomPopConfirm
                  onDelete={() => {
                    removeDoc(item._id);
                    setSingleDocument(item);
                    deleteDocument(item._id);
                  }}
                  render={
                    <CustomCursor>
                      <Image preview={false} src="/assets/icons/remove.svg" />
                    </CustomCursor>
                  }
                />
              </SpaceStyled>
            </Col>
            <Col>
              <SpaceStyled horizontal={7}>
                <CustomCursor
                  onClick={() => {
                    getDocumentsFile(item._id, item.title, item.ex);
                    removeDoc(item._id);
                  }}
                >
                  <Image preview={false} src="/assets/icons/download.svg" />
                </CustomCursor>
              </SpaceStyled>
            </Col>
          </Row>
        </SpaceStyled>
      </CenterStyled>
    </Containner>
  );
};
export default LibraryItemComponent;
