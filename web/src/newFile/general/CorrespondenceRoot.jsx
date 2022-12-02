import React, { Fragment } from "react";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
import CorrespondenceTable from "./CorrespondenceTable";
import SendFileToCorrespondenceComponent from "./SendFileToCorrespondenceComponent";

const CorrespondenceRoot = () => {
  const { fileStatistic } = useContext(FileContext);
  return (
    <Fragment>
      <SendFileToCorrespondenceComponent />
      <CorrespondenceTable
        correspondence={fileStatistic?.file?.correspondence}
      />
    </Fragment>
  );
};
export default CorrespondenceRoot;
