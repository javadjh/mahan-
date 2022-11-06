import React from "react";
import ArchiveTreeContextProvider from "../context/ArchiveTree/ArchiveTreesContextProvider";
import ArchivesComponent from "./archive/ArchivesComponent";
import ArchiveTreeRoot from "./archivesTrees/ArchiveTreeRoot";
const ArchiveViewerRoot = () => {
  return (
    <>
      <ArchivesComponent />

      <ArchiveTreeContextProvider>
        <ArchiveTreeRoot />
      </ArchiveTreeContextProvider>
    </>
  );
};
export default ArchiveViewerRoot;
