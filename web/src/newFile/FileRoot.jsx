import { Col, Row } from "antd";
import React from "react";
import FileContextProvider from "../context/file/FileContextProvider";
import CustomBackButton from "../styled/components/CustomBackButton";
import FileGlobalActionsComponenets from "./general/FileGlobalActionsComponenets";
import FileInformationComponent from "./general/FileInformationComponent";
import FilesUploadedComponent from "./general/FilesUploadedComponent";
import TabsComponent from "./general/TabsComponent";
import UploadInputs from "./utils/UploadInputs";

const FileRoot = ({ match, history }) => {
  return (
    <FileContextProvider match={match} history={history}>
      <CustomBackButton />
      <FileGlobalActionsComponenets history={history} />
      <FilesUploadedComponent />
      <FileInformationComponent />
      <TabsComponent />
      <UploadInputs />
    </FileContextProvider>
  );
};
export default FileRoot;
