import React from "react";
import { useSelector } from "react-redux";
import CustomText from "../../styled/components/CustomText";
import { SpaceStyled } from "../../styled/global";

import { titleColor } from "../../app/appColor";
import ArchiveItemComponent from "./ArchiveItemComponent";
const ArchivesComponent = () => {
  const usersArchives = useSelector((state) => state.usersArchives);
  return (
    <>
      <SpaceStyled bottom={20}>
        <CustomText color={titleColor} bold>
          لیست بایگانی ها
        </CustomText>
      </SpaceStyled>
      {usersArchives.map((archive) => (
        <ArchiveItemComponent archive={archive} />
      ))}
    </>
  );
};
export default ArchivesComponent;
