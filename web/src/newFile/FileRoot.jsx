import React from "react";
import FileContextProvider from "../context/file/FileContextProvider";
import FileGlobalActionsComponenets from "./general/FileGlobalActionsComponenets";
import FileInformationComponent from "./general/FileInformationComponent";
import TabsComponent from "./general/TabsComponent";
import UploadInputs from "./utils/UploadInputs";

const FileRoot = ({ match, history }) => {
  return (
    <FileContextProvider match={match} history={history}>
      <FileGlobalActionsComponenets history={history} />
      <FileInformationComponent />
      <TabsComponent />
      <UploadInputs />
    </FileContextProvider>
  );
};
export default FileRoot;
