import React, { Fragment, useContext, useEffect } from "react";
import { FileContext } from "../../context/file/FileContext";
import LibrariesDocumentsComponent from "../../Library/LibrariesDocumentsComponent";
import { LibraryContext } from "../../Library/LibraryContext";
import CustomButton from "../../styled/components/CustomButton";
const ShowLibraryDialog = ({ fileIdPage, archiveIdPage }) => {
  const { sendData, selectedDoc, setArchive, setFile } =
    useContext(LibraryContext);
  const { fileStatistic, fileId } = useContext(FileContext);
  useEffect(() => {
    setArchive(archiveIdPage ? archiveIdPage : fileStatistic?.file?.archiveId);
    setFile(fileIdPage ? fileIdPage : fileId);
  }, []);
  return (
    <Fragment>
      <CustomButton
        isLeft={true}
        hidden={selectedDoc.length <= 0}
        onClick={sendData}
      >
        ثبت اسناد
      </CustomButton>
      <LibrariesDocumentsComponent isManage={false} />
    </Fragment>
  );
};
export default ShowLibraryDialog;
