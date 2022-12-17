import { Col, Input, Row, Table } from "antd";
import React, { useState } from "react";
import { useContext } from "react";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import FilesTableComponent from "./FilesTableComponent";
import CustomText from "../../styled/components/CustomText";
import CustomButton from "../../styled/components/CustomButton";
import { CenterVerticalStyled, SpaceStyled } from "../../styled/global";
import CustomDialog from "../../styled/components/CustomDialog";
import InsertFileComponent from "../../ArchiveTree/files/InsertFileComponent";
import Auth from "../../auth/Auth";
const FilesRoot = () => {
  const { files, setFileFilter, fileFilter, mainParent, mainTree, reload } =
    useContext(ArchiveTreeContext);
  const [isShowUpsertFileDialog, setIsShowUpsertFileDialog] = useState(false);

  return (
    <>
      {mainParent && (
        <SpaceStyled top={20}>
          <SpaceStyled bottom={10}>
            <Row justify="space-between" align="end">
              <Col span={12}>
                <CenterVerticalStyled>
                  <Input
                    onChange={(e) => {
                      setFileFilter({
                        ...fileFilter,
                        ...{ searchValue: e.target.value },
                      });
                    }}
                    placeholder={`جستجو در پرونده " ${mainParent.title} "`}
                  />
                </CenterVerticalStyled>
              </Col>

              <Col span={12}>
                <Row justify="end">
                  <Col>
                    <Auth accessList={["ویرایش پرونده"]}>
                      <CustomDialog
                        isShow={isShowUpsertFileDialog}
                        setIsShow={setIsShowUpsertFileDialog}
                        width={"60%"}
                        title={"پرونده"}
                        render={
                          <InsertFileComponent
                            onInsert={() => {
                              reload(Date.now());
                            }}
                            inTree={false}
                            tree={mainParent}
                            mainTree={mainTree}
                            setIsShowUpsertFileDialog={
                              setIsShowUpsertFileDialog
                            }
                          />
                        }
                        actionRender={
                          <CustomButton
                            onClick={() => {
                              setIsShowUpsertFileDialog(true);
                            }}
                          >
                            افزودن پرونده ی جدید
                          </CustomButton>
                        }
                      />
                    </Auth>
                  </Col>
                </Row>
              </Col>
            </Row>
          </SpaceStyled>
          <FilesTableComponent
            setPageId={(page) => {
              setFileFilter({
                ...fileFilter,
                ...{ pageId: page },
              });
            }}
            files={files.files}
            total={files.total}
            pageId={files.pageId}
            eachPerPage={files.eachPerPage}
          />
        </SpaceStyled>
      )}
    </>
  );
};
export default FilesRoot;
