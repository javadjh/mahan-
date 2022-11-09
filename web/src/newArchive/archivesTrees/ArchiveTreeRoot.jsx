import { Breadcrumb, Col, Menu, Row } from "antd";
import React, { useState } from "react";
import { useContext } from "react";
import { darkBlueColor, lightGreenColor } from "../../app/appColor";
import AddTreeDialog from "../../ArchiveTree/dialog/AddTreeDialog";
import CustomButton from "../../styled/components/CustomButton";
import CustomDialog from "../../styled/components/CustomDialog";
import { SpaceStyled } from "../../styled/global";
import ArchiveTreesComponents from "./ArchiveTreesComponents";
import TreeRouteComponent from "./TreeRouteComponent";

const ArchiveTreeRoot = () => {
  const [isShowInsertTreeDialog, setIsShowInsertTreeDialog] = useState(false);
  return (
    <SpaceStyled>
      <SpaceStyled vertical={10}>
        <Row align="middle">
          <Col span={20}>
            <TreeRouteComponent />
          </Col>
          <Col span={4}>
            <CustomDialog
              title={"قفسه"}
              render={
                <AddTreeDialog
                  setIsShowInsertTreeDialog={setIsShowInsertTreeDialog}
                />
              }
              actionRender={
                <CustomButton
                  onClick={() => {
                    setIsShowInsertTreeDialog(true);
                  }}
                  block
                  color={darkBlueColor}
                >
                  افزودن قفسه
                </CustomButton>
              }
              isShow={isShowInsertTreeDialog}
            />
          </Col>
        </Row>
      </SpaceStyled>
      <ArchiveTreesComponents />
    </SpaceStyled>
  );
};
export default ArchiveTreeRoot;
