import { Col, Input, Row, Table } from "antd";
import React from "react";
import { useContext } from "react";
import { ArchiveTreeContext } from "../../context/ArchiveTree/ArchiveTreesContext";
import FilesTableComponent from "./FilesTableComponent";
import CustomText from "../../styled/components/CustomText";
import CustomButton from "../../styled/components/CustomButton";
import { CenterVerticalStyled, SpaceStyled } from "../../styled/global";
import CustomDialog from "../../styled/components/CustomDialog";
import InsertFileComponent from "../../ArchiveTree/files/InsertFileComponent";
const FilesRoot = () => {
  const { files, setFileFilter, fileFilter, mainParent, mainTree } =
    useContext(ArchiveTreeContext);
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
                    <CustomDialog
                      width={"60%"}
                      title={"پرونده"}
                      render={
                        <InsertFileComponent
                          inTree={false}
                          tree={mainParent}
                          mainTree={mainTree}
                        />
                      }
                      actionRender={
                        <CustomButton>افزودن پرونده ی جدید</CustomButton>
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </SpaceStyled>
          <FilesTableComponent
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
