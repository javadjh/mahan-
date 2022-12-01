import React, { Fragment } from "react";
import CorrespondenceTable from "./CorrespondenceTable";
import SendFileToCorrespondenceComponent from "./SendFileToCorrespondenceComponent";

const CorrespondenceRoot = () => {
  return (
    <Fragment>
      <SendFileToCorrespondenceComponent />
      <CorrespondenceTable />
    </Fragment>
  );
};
export default CorrespondenceRoot;
