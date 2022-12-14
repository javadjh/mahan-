import React from "react";
import { DocumentContext } from "../../context/document/DocumentContext";
import DocumentContextProvider from "../../context/document/DocumentContextProvider";
import MergeDocumentComponent from "./MergeDocumentComponent";
const DocumentRoot = ({ match }) => {
  return (
    <DocumentContextProvider match={match}>
      <MergeDocumentComponent />
    </DocumentContextProvider>
  );
};
export default DocumentRoot;
