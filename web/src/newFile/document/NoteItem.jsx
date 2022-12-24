import { Col, Divider, Row } from "antd";
import React, { Fragment, useState } from "react";
import { useContext } from "react";
import { blueColor, titleColor, redColor } from "../../app/appColor";
import { DocumentContext } from "../../context/document/DocumentContext";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import CustomText from "../../styled/components/CustomText";
import { CustomCursor, SpaceStyled } from "../../styled/global";
const NoteItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { removeNoteFromDocument } = useContext(DocumentContext);
  return (
    <Fragment>
      <Row justify="space-between" align="top">
        <Col span={2}>یادداشت</Col>
        <Col span={16} offset={1}>
          <CustomText color={titleColor} ellipsis={!isExpanded}>
            {item.description}
          </CustomText>
        </Col>
        <Col span={4} offset={1}>
          <CustomCursor>
            <CustomText
              isLeft={true}
              color={blueColor}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "بستن" : "مشاهده کامل"}
            </CustomText>
          </CustomCursor>
        </Col>
      </Row>
      {isExpanded && (
        <SpaceStyled top={10}>
          <CustomPopConfirm
            onDelete={() => {
              removeNoteFromDocument(item._id);
              setIsExpanded(false);
            }}
            render={
              <CustomCursor>
                <CustomText isLeft={true} color={redColor}>
                  حذف یادداشت
                </CustomText>
              </CustomCursor>
            }
          />
        </SpaceStyled>
      )}
      <Divider />
    </Fragment>
  );
};
export default NoteItem;
