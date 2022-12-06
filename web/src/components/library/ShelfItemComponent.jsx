import { Image } from "antd";
import React from "react";
import styled from "styled-components";
import CustomPopConfirm from "../../styled/components/CustomPopConfirm";
import {
  CenterStyled,
  CenterVerticalStyled,
  CustomCursor,
  SpaceStyled,
} from "../../styled/global";
const ShelfItemComponent = ({
  item,
  deleteLibraryShelf,
  reloadPage,
  setLibraryShelfContext,
  setLibraryShelf,
  isManage,
}) => {
  const Containner = styled.div`
    background: #ffffff;
    border: 1.2px solid #eef2f5;
    box-shadow: 0px 7px 17px -3px rgba(77, 89, 107, 0.05);
    border-radius: 8px;
    padding: 0px 20px;
    width: 160px;
    margin: 0px 10px;
    height: 98%;
    cursor: pointer;
  `;
  return (
    <Containner>
      <SpaceStyled top={50}>
        <CenterStyled>
          <div
            onClick={() => {
              setLibraryShelfContext(item);
              reloadPage(item._id);
            }}
            className={"custom-cursor"}
          >
            <Image src={"/assets/icons/folder.svg"} preview={false} />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <p className={"m-0 p-0 custom-cursor"}>
              {item.title.length > 10
                ? item.title.substr(0, 10) + "..."
                : item.title}
            </p>
            <i
              className={"mdi mdi-pencil-outline custom-cursor"}
              hidden={!isManage}
              onClick={() => {
                setLibraryShelf(item);
              }}
              style={{ color: "royalblue" }}
            />
          </div>
          <p className={"m-0 p-0"}>{item.createDate}</p>
          <SpaceStyled horizontal={7}>
            <CustomPopConfirm
              onDelete={() => {
                deleteLibraryShelf(item._id);
              }}
              render={
                <CustomCursor>
                  <Image preview={false} src="/assets/icons/remove.svg" />
                </CustomCursor>
              }
            />
          </SpaceStyled>
        </CenterStyled>
      </SpaceStyled>
    </Containner>
  );
};
export default ShelfItemComponent;
