import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FileContext } from "./FileContext";
import { useDispatch, useSelector } from "react-redux";
import { getFileStatisticAction } from "../../stateManager/actions/FileAction";
import { useState } from "react";
import { getDocumentsAction } from "../../stateManager/actions/DocumentAction";

const FileContextProvider = ({ children, match }) => {
  const dispatch = useDispatch();
  const fileId = match?.params?.id;
  const [documentFilter, setDocumentFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
    fileId,
  });
  const fileStatistic = useSelector((state) => state.fileStatistic);
  useEffect(() => {
    getStatistic();
  }, []);
  useEffect(() => {
    getDocuments();
  }, [documentFilter]);
  const getDocuments = async () => {
    await dispatch(getDocumentsAction(documentFilter));
  };
  const getStatistic = async () => {
    await dispatch(getFileStatisticAction(fileId));
  };
  const documentsFilterHandle = (obj) => {
    setDocumentFilter({ ...documentFilter, ...obj });
  };
  return (
    <FileContext.Provider value={{ fileStatistic, documentsFilterHandle }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
