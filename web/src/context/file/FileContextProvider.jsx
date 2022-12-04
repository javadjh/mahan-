import React from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { FileContext } from "./FileContext";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import {
  deleteFileAction,
  getFileStatisticAction,
  sendFileAction,
} from "../../stateManager/actions/FileAction";
import { useState } from "react";
import {
  deleteDocumentAction,
  getDeActivateDocumentsAction,
  getDocumentsAction,
  restoreDocumentAction,
} from "../../stateManager/actions/DocumentAction";
import { getFileLogsAction } from "../../stateManager/actions/LogsAction";
import {
  addNewNoteForDocumentService,
  getGroupDocumentsFileService,
  insertDocumentService,
  removeNoteFromDocumentService,
} from "../../service/DocumentService";
import {
  fileAlertsAction,
  insertFileAlertAction,
} from "../../stateManager/actions/FileAlertAction";
import { RootContext } from "../../RootComponent/RootContext";

const FileContextProvider = ({ children, match, history }) => {
  // redux utils
  const dispatch = useDispatch();
  const fileStatistic = useSelector((state) => state.fileStatistic);

  //init some params
  const fileId = match?.params?.id;
  const { setFileId, setArchiveId } = useContext(RootContext);
  useEffect(() => {
    setFileId(fileId);
    setArchiveId(fileStatistic?.file?.archiveId);
  }, [fileId, fileStatistic]);

  //local state
  const [currentTab, setCurrentTab] = useState("docs");
  const [isTabsDataLoading, setIsTabsDataLoading] = useState(true);
  const [canUpload, setCanUpload] = useState(true);
  const [isShowUploadBlock, setIsShowUploadBlock] = useState(false);
  const [images, setImages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);

  //filter state
  const [documentFilter, setDocumentFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
    fileId,
  });
  const [logsFilter, setLogsFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
    fileId,
  });
  const [deletedDocsFilter, setDeletedDocsFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    fileId,
  });

  //useEffects
  useEffect(() => {
    getStatistic();
  }, []);
  useEffect(() => {
    if (currentTab == "docs") getDocuments();
  }, [documentFilter]);
  useEffect(() => {
    if (currentTab == "log") getLogs();
  }, [logsFilter]);
  useEffect(() => {
    if (currentTab == "deleted") getDeletedDocs();
  }, [deletedDocsFilter]);

  //handlers funcs

  //query handlers
  const getAlerts = async () => {
    await dispatch(
      fileAlertsAction({
        archiveId: fileStatistic.file.archiveId,
        fileId,
      })
    );
  };
  const getDocuments = async () => {
    await dispatch(getDocumentsAction(documentFilter));
  };
  const getStatistic = async () => {
    await dispatch(getFileStatisticAction(fileId));
  };
  const getLogs = async () => {
    await dispatch(getFileLogsAction(logsFilter));
  };
  const getDeletedDocs = async () => {
    await dispatch(getDeActivateDocumentsAction(deletedDocsFilter));
  };
  const documentsFilterHandle = (obj) => {
    setDocumentFilter({ ...documentFilter, ...obj });
  };
  const filesLogFilterHandle = (obj) => {
    setLogsFilter({ ...logsFilter, ...obj });
  };
  const deletedDocsFilterHandle = (obj) => {
    setDeletedDocsFilter({ ...deletedDocsFilter, ...obj });
  };
  const setTabState = (tabName) => {
    setCurrentTab(tabName);
    setIsTabsDataLoading(true);
    if (tabName == "log") getLogs();
    else if (tabName == "deleted") getDeletedDocs();
    else if (tabName == "alerts") getAlerts();
  };
  const freshData = async () => {
    await getStatistic();
    if (currentTab == "log") getLogs();
    else if (currentTab == "deleted") getDeletedDocs();
    else if (currentTab == "docs") getDocuments();
    else if (currentTab == "alerts") getAlerts();
  };

  //command handlers
  const deleteDocHandler = async (id) => {
    await dispatch(deleteDocumentAction(id, fileId));
    freshData();
  };
  const restoreDocHandler = async (id) => {
    await dispatch(restoreDocumentAction(id, fileId));
    freshData();
  };
  const deleteFileHandler = async () => {
    await dispatch(deleteFileAction(fileId));
    history.goBack();
  };
  const insertFilesAlert = async (formData) => {
    const data = {
      ...formData,
      ...{
        archiveId: fileStatistic?.file?.archiveId,
        fileId,
      },
    };
    await dispatch(insertFileAlertAction(data));
  };

  const downloadGroupDocuments = async () => {
    const { data, status } = await getGroupDocumentsFileService({
      documents: [],
      getAll: true,
      fileId,
    });
    if (status === 200) {
      let filename;
      filename = Date.now() + ".zip";
      saveAs(data, filename);
    }
  };
  const addNewNoteForDocument = async (note, id) => {
    const { status, data } = await addNewNoteForDocumentService({
      documentId: id,
      description: note,
    });

    return data;
  };
  const removeNoteFromDocument = async (id, docId) => {
    const { status, data } = await removeNoteFromDocumentService(docId, id);
    return data;
  };
  const sendFileHandle = async (formData) => {
    await dispatch(sendFileAction(fileId, formData));
    freshData();
  };

  //utils
  const onImageChange = async (files, mainParent = undefined) => {
    const aTag = document.getElementById("uploadBlock");
    if (aTag) aTag.click();
    setIsShowUploadBlock(true);
    let copyImages = [...images];
    for (let i = 0; i < files.length; i++) {
      let type = files[i].type;
      let name = files[i].name;
      copyImages.push({
        uiId: uuidv4(),
        title: name,
        type,
        uploaded: false,
      });
    }
    setImages(copyImages);
    let imageState = copyImages;
    for (let i = 0; i < files.length; i++) {
      setCanUpload(false);
      const file = new FormData();
      file.append("file", files[i]);
      try {
        const { data, status } = await insertDocumentService(
          fileStatistic.file.archiveTreeId.archive,
          fileId,
          copyImages[i].uiId,
          file,
          mainParent
        );
        if (status === 200) {
          imageState = imageState.filter((item) => item.uiId !== data.uiId);
          setImages(imageState);
          setUploadedFile((oldArray) => [...oldArray, data]);
          freshData();
        }
      } catch (err) {
        setTimeout(() => {
          setCanUpload(true);
        }, 1000);
      }
    }
    setTimeout(() => {
      setCanUpload(true);
    }, 1000);
    //getSingleDocument()
  };
  return (
    <FileContext.Provider
      value={{
        fileStatistic,
        currentTab,
        isTabsDataLoading,
        canUpload,
        history,
        fileId,
        setTabState,
        documentsFilterHandle,
        filesLogFilterHandle,
        deletedDocsFilterHandle,
        deleteDocHandler,
        restoreDocHandler,
        onImageChange,
        deleteFileHandler,
        downloadGroupDocuments,
        insertFilesAlert,
        addNewNoteForDocument,
        removeNoteFromDocument,
        sendFileHandle,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;