import { Divider } from "antd";
import React from "react";
import Auth from "../auth/Auth";
import ArchiveTreeContextProvider from "../context/ArchiveTree/ArchiveTreesContextProvider";
import ArchivesComponent from "./archive/ArchivesComponent";
import ArchiveTreeRoot from "./archivesTrees/ArchiveTreeRoot";
import FilesRoot from "./file/FilesRoot";
const ArchiveViewerRoot = () => {
  return (
    <>
      {/* <Auth accessList={["مدیریت درخت"]}>
      </Auth> */}
      <ArchivesComponent />

      <ArchiveTreeContextProvider>
        <ArchiveTreeRoot />
        <Divider />
        <FilesRoot />
      </ArchiveTreeContextProvider>
    </>
  );
};
export default ArchiveViewerRoot;
