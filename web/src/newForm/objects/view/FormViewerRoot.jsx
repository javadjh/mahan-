import React, { Fragment } from "react";
import FormViewerContextProvider from "../../../context/form/FormViewerContextProvider";
import ObjectListViewer from "./ObjectListViewer";
const FormViewerRoot = ({ child, onSubmit }) => {
  return (
    <Fragment>
      <FormViewerContextProvider child={child} onSubmit={onSubmit}>
        <ObjectListViewer />
      </FormViewerContextProvider>
    </Fragment>
  );
};
export default FormViewerRoot;
