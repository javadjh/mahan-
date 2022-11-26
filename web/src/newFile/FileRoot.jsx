import React from "react";
import FileContextProvider from "../context/file/FileContextProvider";
import FileInformationComponent from "./general/FileInformationComponent";
import TabsComponent from "./general/TabsComponent";

const FileRoot = ({ match }) => {
  return (
    <FileContextProvider match={match}>
      <FileInformationComponent />
      <TabsComponent />
    </FileContextProvider>
  );
};
export default FileRoot;
