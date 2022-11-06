import React, { useContext } from "react";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import { ArchiveTreeItem } from "./archiveTree.styled";
import { Col, Image, Row } from "antd";
import CustomText from "../../styled/components/CustomText";
import CustomSmallButton from "../../styled/components/CustomSmallButton";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import { HighlightOutlined } from "@ant-design/icons";
import { CenterVerticalStyled, SpaceStyled } from "../../styled/global";
const ArchiveTreesComponents = () => {
  const { archiveTrees, changeTreeTitle, deleteArchiveTree } =
    useContext(ArchiveTreeContext);
  return (
    <>
      {archiveTrees?.map((tree) => (
        <ArchiveTreeItem>
          <Row justify="space-between" align="middle">
            <Col span={12}>
              <CustomText
                color={"white"}
                editable={{
                  icon: (
                    <Image
                      preview={false}
                      src="http://localhost:3000/assets/edit-vector.png"
                    />
                  ),

                  tooltip: "ویرایش عنوان قفسه",
                  onChange: (text) => {
                    changeTreeTitle(tree._id, text);
                  },
                }}
              >
                {tree.title}
              </CustomText>
            </Col>
            <Col span={12}>
              <CenterVerticalStyled>
                <Row justify="end">
                  <Col>
                    <SpaceStyled left={5}>
                      <CustomSmallButton
                        icon={
                          <Image
                            preview={false}
                            src="http://localhost:3000/assets/plus-vector.png"
                          />
                        }
                      >
                        افزودن پرونده به قفسه
                      </CustomSmallButton>
                    </SpaceStyled>
                  </Col>
                  <Col>
                    <SpaceStyled left={5}>
                      <CustomPopConfirm
                        onDelete={() => deleteArchiveTree(tree._id)}
                        render={
                          <CustomSmallButton
                            icon={
                              <Image
                                preview={false}
                                src="http://localhost:3000/assets/delete-vector.png"
                              />
                            }
                          >
                            حذف قفسه
                          </CustomSmallButton>
                        }
                      />
                    </SpaceStyled>
                  </Col>
                  <Col>
                    <SpaceStyled left={5}>
                      <CustomSmallButton
                        icon={
                          <Image
                            preview={false}
                            src="http://localhost:3000/assets/setting-vector.png"
                          />
                        }
                      >
                        تنظیمات قفسه
                      </CustomSmallButton>
                    </SpaceStyled>
                  </Col>
                </Row>
              </CenterVerticalStyled>
            </Col>
          </Row>
        </ArchiveTreeItem>
      ))}
    </>
  );
};
export default ArchiveTreesComponents;
