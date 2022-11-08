import React from "react";
import { useSelector } from "react-redux";
import CustomText from "../../styled/components/CustomText";
import {
  CenterVerticalStyled,
  HorizontalScroll,
  SpaceStyled,
} from "../../styled/global";

import { titleColor } from "../../app/appColor";
import ArchiveItemComponent from "./ArchiveItemComponent";
import { Col, Row } from "antd";
const ArchivesComponent = () => {
  const usersArchives = useSelector((state) => state.usersArchives);
  return (
    <>
      <SpaceStyled bottom={20}>
        <CustomText color={titleColor} bold>
          لیست بایگانی ها
        </CustomText>
      </SpaceStyled>
      <HorizontalScroll>
        <CenterVerticalStyled>
          {usersArchives.map((archive) => (
            <ArchiveItemComponent archive={archive} />
          ))}
        </CenterVerticalStyled>
      </HorizontalScroll>
    </>
  );
};
export default ArchivesComponent;
