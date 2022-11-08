import { Divider } from "antd";
import React from "react";
import ArchiveTreeContextProvider from "../context/ArchiveTree/ArchiveTreesContextProvider";
import ArchivesComponent from "./archive/ArchivesComponent";
import ArchiveTreeRoot from "./archivesTrees/ArchiveTreeRoot";
import FilesRoot from "./file/FilesRoot";
const ArchiveViewerRoot = () => {
  return (
    <>
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
