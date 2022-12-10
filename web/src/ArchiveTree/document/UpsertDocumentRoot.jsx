import React, { useContext, useEffect, useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import { useDispatch, useSelector } from "react-redux";
import ScanDialog from "../../dialog/scan/components/ScanDialog";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import {
  addNewNoteForDocumentAction,
  changeDocumentFileAction,
  changeDocumentsNameAction,
  deleteDocumentAction,
  deleteGroupDocumentsAction,
  getDeActivateDocumentsAction,
  getDocumentAction,
  getDocumentsAction,
  groupAddNoteDocumentAction,
  removeNoteFromDocumentAction,
  restoreDocumentAction,
  saveDocumentsInfoAction,
  setManualDocumentAction,
} from "../../stateManager/actions/DocumentAction";
import MainLayout from "../../RootComponent/MainLayout";
import {
  getDocumentFileService,
  getGroupDocumentsFileService,
  insertDocumentService,
} from "../../service/DocumentService";
import InfoDialog from "../../utility/InfoDialog";
import PagingComponent from "../../utility/PagingComponent";
import DocumentTableComponent from "./DocumentTableComponent";
import AlertDialog from "../../utility/AlertDialog";
import { getFileLogsAction } from "../../stateManager/actions/LogsAction";
import FileLogsTableComponent from "../fileLogs/FileLogsTableComponent";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  changeFilesArchiveTreeAction,
  deleteFileAction,
  fileConfirmAction,
  getFileStatisticAction,
  rejectFileAction,
  sendFileAction,
} from "../../stateManager/actions/FileAction";
import ReactTooltip from "react-tooltip";
import LibrariesDocumentsComponent from "../../Library/LibrariesDocumentsComponent";
import { LibraryContext } from "../../Library/LibraryContext";
import { useHistory } from "react-router";
import { saveAs } from "file-saver";
import UpsertArchivesFormDialog from "../dialog/UpsertArchivesFormDialog";
import ElementsContextProvider from "../../Form/Elements/ElementsContextProvider";
import UpdateFileDialog from "../dialog/UpdateFileDialog";
import AddGroupNoteDialog from "../dialog/AddGroupNoteDialog";
import ShareDocumentDialog from "../dialog/ShareDocumentDialog";
import ReactPlayer from "react-player";
import { dateStyle } from "../../utility/dateStyle";
import {
  fileAlertsAction,
  insertFileAlertAction,
} from "../../stateManager/actions/FileAlertAction";
import SearchFileDialog from "../dialog/SearchFileDialog";
import { insertLendAction } from "../../stateManager/actions/LendsAction";
import DeActivateDocumentsTable from "../deActivateDocuments/DeActivateDocumentsTable";
import ShowSingleDocumentDialog from "../dialog/ShowSingleDocumentDialog";
import EditorComponent from "./EditorComponent";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "./imageCroper/convertToImage";
import ImageCropComponent from "./imageCroper/ImageCropComponent";
import axios from "axios";
import UpsertEmailDialog from "../dialog/UpsertEmailDialog";
import { getEmailsHistoryAction } from "../../stateManager/actions/EmailAction";
import { RootContext } from "../../RootComponent/RootContext";
import TicketsTableComponent from "./tickets/TicketsTableComponent";
import SearchArchivesTreesAction from "../dialog/SearchArchivesTreesDialog";
import { getArchivesSupervisorsAction } from "../../stateManager/actions/UsersAction";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { defaultDate } from "../../utility/dateUtil";
import ShowLibraryDialog from "../dialog/ShowLibraryDialog";
import ShowFileFormDialog from "../dialog/ShowFileFormDialog";
import SecondPagingComponent from "../../utility/SecondPagingComponent";
import { UpsertDocumentContext } from "./UpsertDocumentContext";
import FileAlertsDialog from "../dialog/FileAlertsDialog";
import { doneToast, errorToast } from "../../utility/ShowToast";
import ScannerDialog from "./ScannerDialog";
import LoadingDialog from "../../dialog/LoadingDialog";
import { WaterMark } from "@ant-design/pro-components";
ChartJS.register(ArcElement, Tooltip, Legend);

const UpsertDocumentRoot = ({ history }) => {
  history = useHistory();
  const fileAlerts = useSelector((state) => state.fileAlerts);
  const { setFileId, setArchiveId, reloadDoc } = useContext(RootContext);
  const { singleEmail, setSingleEmail, getAlerts } = useContext(
    UpsertDocumentContext
  );
  const { sendData, setArchive, setFile, libraryReload } =
    useContext(LibraryContext);
  const { handleHide } = useContext(RootContext);
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents);
  const singleDocumentState = useSelector((state) => state.document.document);
  const versions = useSelector((state) => state.document.versions);
  const fileLogs = useSelector((state) => state.fileLogs);
  const fileStatistic = useSelector((state) => state.fileStatistic);
  const documentsCut = useSelector((state) => state.documentsCut);

  const deActivateDocuments = useSelector((state) => state.deActivateDocuments);
  const emailsHistory = useSelector((state) => state.emailsHistory);
  const fileSingle = useSelector((state) => state.file);
  const archivesSupervisors = useSelector((state) => state.archivesSupervisors);

  const [images, setImages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [canUpload, setCanUpload] = useState(true);
  const [docSearchValue, setDocSearchValue] = useState("");
  const [logSearchValue, setLogSearchValue] = useState("");
  const [docPageId, setDocPageId] = useState(1);
  const [logPageId, setLogPageId] = useState(1);
  const [deActivatePageId, setDeActivatePageId] = useState(1);
  const [singleDocument, setSingleDocument] = useState({});
  const [singleDocumentId, setSingleDocumentId] = useState();
  const [documentName, setDocumentName] = useState();
  const [note, setNote] = useState();
  const [isFileDownloading, setIsFileDownloading] = useState();
  const [optionChart, setOptionChart] = useState({});
  const [documentsSelected, setDocumentsSelected] = useState([]);
  const [docEachPerPage, setDocEachPerPage] = useState(12);
  const [version, setVersion] = useState({});
  const [previewUrl, setPreviewUrl] = useState();
  const [isShoeDocBlock, setIsShoeDocBlock] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();

  const [pdfFile, setPdfFile] = useState();
  const [isGetAllFilesEmail, setIsGetAllFilesEmail] = useState(false);
  const [reloadState, setReloadState] = useState("");

  const [messageText, setMessageText] = useState(
    !handleHide("ناظر") ? "" : "پرونده جهت بررسی ارسال گردد"
  );
  const [isShowUploadBlock, setIsShowUploadBlock] = useState(false);
  const [supervisorReceiver, setSupervisorReceiver] = useState();
  const [hasForm, setForm] = useState(false);

  useEffect(() => {
    if (fileSingle.archiveTreeId)
      setForm(fileSingle.mainArchiveTreeId.isFormRequired);
  }, [fileSingle.archiveTreeId]);

  const initChart = () => {
    const labels = [];
    const values = [];
    fileStatistic.chartEx.map((f) => {
      labels.push(f.ex);
      values.push(f.value);
    });
    setOptionChart({
      labels,
      datasets: [
        {
          label: "# of Votes",
          data: values,
          backgroundColor: [
            "rgba(198, 40, 40)",
            "rgba(173, 20, 87 )",
            "rgba(106, 27, 154)",
            "rgba(69, 39, 160 )",
            "rgba(40, 53, 147)",
            "rgba(21, 101, 192)",
          ],
          borderColor: [
            "rgba(13, 71, 161)",
            "rgba(194, 24, 91)",
            "rgba(123, 31, 162)",
            "rgba(81, 45, 168)",
            "rgba(48, 63, 159)",
            "rgba(25, 118, 210)",
          ],
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    if (history.location.state.isFocused) {
      setSingleDocumentId(history.location.state.documentId);
      setIsLoading(true);
      setIsShoeDocBlock(true);
      handleSetSingleDocumentId(history.location.state.documentId);
      // getSingleDocument()
    }
  }, []);

  useEffect(() => {
    setArchive(history.location.state.archiveId);
    setFile(history.location.state.fileId);
    getDocData();
    getStatisticData();
    getLogData();
    getAlerts();
    getDeActivateDocuments();
    getUsersSupervisors();
  }, [uploadedFile, libraryReload, reloadDoc]);

  useEffect(() => {
    getEmailsHistory();
    setFileId(history.location.state.fileId);
    setArchiveId(history.location.state.archiveId);
  }, []);
  const getEmailsHistory = async () => {
    if (!handleHide("اشتراک گذاری اسناد با ایمیل"))
      await dispatch(getEmailsHistoryAction(history.location.state.fileId));
  };

  useEffect(() => {
    getDocData();
  }, [docPageId, docSearchValue, docEachPerPage]);

  useEffect(() => {
    getLogData();
  }, [logPageId, logSearchValue]);

  useEffect(() => {
    if (fileStatistic.chartEx.length > 0) initChart();
  }, [fileStatistic.chartEx]);

  useEffect(() => {
    getSingleDocument();
    return async () => {
      await dispatch(
        setManualDocumentAction({
          versions: [],
          document: {},
        })
      );
    };
  }, [singleDocumentId]);

  useEffect(() => {
    setDocumentName(document.title);
    if (singleDocumentState._id)
      onGetFileHandle(
        singleDocumentState._id,
        singleDocumentState.documentName,
        singleDocumentState.ex
      );
  }, [singleDocumentState]);

  useEffect(() => {
    if (reloadState) window.$("#upsertEmailDialog").modal("show");
  }, [reloadState, singleEmail]);

  useEffect(() => {
    if (singleEmail._id) window.$("#upsertEmailDialog").modal("show");
  }, [singleEmail]);

  useEffect(() => {
    getUsersSupervisors();
  }, []);
  const getUsersSupervisors = async () => {
    await dispatch(getArchivesSupervisorsAction());
  };

  const getSingleDocument = async () => {
    if (singleDocumentId) {
      if (!handleHide("نمایش سندها") || !handleHide("ناظر")) {
        await dispatch(getDocumentAction(singleDocumentId));
        // window.$('#showSingleDocumentDialog').modal('show')
        setVisible(true);
        setIsLoading(false);
      }
    }
  };

  const getDeActivateDocuments = async () => {
    if (!handleHide("مدیریت اسناد حذف شده") || !handleHide("ناظر")) {
      await dispatch(
        getDeActivateDocumentsAction({
          pageId: deActivatePageId,
          eachPerPage: 12,
          fileId: history.location.state.fileId,
        })
      );
    }
  };

  const getLogData = async () => {
    if (!handleHide("تاریخچه تغییرات سند") || !handleHide("ناظر")) {
      await dispatch(
        getFileLogsAction({
          pageId: logPageId,
          eachPerPage: 12,
          searchValue: logSearchValue,
          fileId: history.location.state.fileId,
        })
      );
    }
  };

  const getDocData = async () => {
    if (!handleHide("نمایش سندها") || !handleHide("ناظر")) {
      await dispatch(
        getDocumentsAction({
          fileId: history.location.state.fileId,
          searchValue: docSearchValue,
          pageId: docPageId,
          eachPerPage: docEachPerPage,
        })
      );
    }
  };

  const getStatisticData = async () => {
    if (!handleHide("نمایش سندها") || !handleHide("ناظر")) {
      await dispatch(getFileStatisticAction(history.location.state.fileId));
    }
  };

  const onImageChange = async (files, mainParent = undefined) => {
    const aTag = document.getElementById("uploadBlock");
    if (aTag) aTag.click();
    console.table([
      {
        mainParent,
      },
    ]);
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
          history.location.state.archiveId,
          history.location.state.fileId,
          copyImages[i].uiId,
          file,
          mainParent
        );
        if (status === 200) {
          imageState = imageState.filter((item) => item.uiId !== data.uiId);
          setImages(imageState);
          setUploadedFile((oldArray) => [...oldArray, data]);
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

  const handleDocPaging = (page) => {
    setDocPageId(page);
    setDocumentsSelected([]);
  };

  const handleLogPaging = (page) => {
    setLogPageId(page);
  };

  const handleDeActivateDocumentsPaging = (page) => {
    setDeActivatePageId(page);
  };

  const onOpenAlertDialogHandle = (document) => {
    setSingleDocument(document);
    window.$("#alertDialog").modal("show");
  };
  const deleteHandle = async () => {
    if (!handleHide("حذف سند")) {
      await dispatch(
        deleteDocumentAction(singleDocument._id, history.location.state.fileId)
      );
      await getDocData();
      await getStatisticData();
      await getLogData();
      await getDeActivateDocuments();
      setDocumentName(document.title);
    }
  };

  const handleSetSingleDocumentId = (id) => {
    setSingleDocumentId(id);
  };

  const onGetFileHandle = async (id = "1", title, ex = undefined) => {
    setIsFileDownloading(true);
    const { data, status } = await getDocumentFileService(
      id === "1" ? document._id : id
    );
    if (status === 200) {
      let filename;
      if (
        ex === "png" ||
        ex === "jpg" ||
        ex === "jpge" ||
        ex === "docx" ||
        ex === "xlsm" ||
        ex === "xlsx" ||
        ex === "txt" ||
        ex === "xlsx"
      ) {
        filename = `${title}.pdf`;
        if (id !== "1") {
          setPreviewUrl(id + ".pdf");
        }
      } else {
        filename = `${title}.${ex}`;
        if (id !== "1") {
          setPreviewUrl(id + "." + ex);
        }
      }
      // saveAs(`http://192.168.2.24:5000/${filename.includes(".pdf")?id + ".pdf":id+"."+ex}`, filename);

      setIsFileDownloading(false);
    } else {
      setIsFileDownloading(false);
    }
  };
  const addNewNoteForDocument = async () => {
    if (!handleHide("ویرایش سند")) {
      await dispatch(
        addNewNoteForDocumentAction(
          {
            documentId: singleDocumentState._id,
            description: note,
          },
          history.location.state.fileId
        )
      );
      setNote("");
    }
  };
  const removeNoteFromDocument = async (id) => {
    if (!handleHide("ویرایش سند")) {
      await dispatch(
        removeNoteFromDocumentAction(
          singleDocumentState._id,
          id,
          history.location.state.fileId
        )
      );
    }
  };
  const changeDocumentsName = async (id, title) => {
    await dispatch(
      changeDocumentsNameAction(
        id ? id : singleDocumentState._id,
        { title: id ? title : documentName },
        history.location.state.fileId
      )
    );
  };
  const getInputValue = (id) => {
    const input = document.getElementById(id);
    changeDocumentsName(id, input.value);
  };

  //group action
  const groupDeleteDocuments = async () => {
    if (!handleHide("حذف سند")) {
      await dispatch(
        deleteGroupDocumentsAction(
          {
            documents: documentsSelected,
          },
          history.location.state.fileId
        )
      );
      await getDocData();
      await getStatisticData();
      await getLogData();
      await getDeActivateDocuments();
    }
  };
  const setGroupNoteHandle = async (description) => {
    if (!handleHide("ویرایش سند")) {
      await dispatch(
        groupAddNoteDocumentAction(
          {
            description,
            documents: documentsSelected,
          },
          history.location.state.fileId
        )
      );
      await getSingleDocument();
    }
  };

  const downloadGroupDocuments = async (getAll) => {
    if (!handleHide("نمایش سندها") || !handleHide("ناظر")) {
      const { data, status } = await getGroupDocumentsFileService({
        documents: documentsSelected,
        getAll,
        fileId: history.location.state.fileId,
      });
      if (status === 200) {
        let filename;
        filename = Date.now() + ".zip";
        saveAs(data, filename);
        setIsFileDownloading(false);
      }
    }
  };
  const groupCutDocuments = async () => {
    await dispatch(
      saveDocumentsInfoAction(
        {
          origin: history.location.state.fileId,
          documents: documentsSelected,
        },
        history
      )
    );
  };
  const changeDocumentFileHandle = async (archiveId, fileId) => {
    if (!handleHide("ویرایش سند")) {
      await dispatch(
        changeDocumentFileAction({
          destination: {
            archiveId: archiveId ? archiveId : history.location.state.archiveId,
            fileId: fileId ? fileId : history.location.state.fileId,
          },
          documents: documentsCut,
        })
      );
      getDocData();
      getStatisticData();
      getLogData();
      getAlerts();
    }
  };

  const getFolder = (e) => {
    const files = e.target.files;

    if (canUpload) onImageChange(files);
    else window.$("#infoDialog").modal("show");

    for (let i = 0; i < files.length; i++) {
      console.table(files[i]);
    }
  };

  const insertShareFile = async (usersSelected, expire) => {
    await dispatch(
      insertLendAction({
        usersReceiver: usersSelected,
        expireDate: expire,
        isCompleteFile: true,
        fileId: history.location.state.fileId,
      })
    );
  };

  const restoreDocument = async (id) => {
    await dispatch(restoreDocumentAction(id, history.location.state.fileId));
    await getDocData();
    await getStatisticData();
    await getLogData();
    await getDeActivateDocuments();
  };

  const sendFileHandle = async () => {
    await dispatch(
      sendFileAction(history.location.state.fileId, {
        message: messageText,
        supervisorReceiver,
      })
    );
    await getStatisticData();
  };

  const rejectFileHandle = async () => {
    await dispatch(
      rejectFileAction(history.location.state.fileId, { message: messageText })
    );
    await getStatisticData();
  };

  const fileConfirmHandle = async () => {
    await dispatch(fileConfirmAction(history.location.state.fileId));
    await getStatisticData();
  };

  const moveToNewArchiveTree = async (destinationArchiveTree) => {
    await dispatch(
      changeFilesArchiveTreeAction({
        fileId: history.location.state.fileId,
        destinationArchiveTree,
      })
    );

    await getDocData();
    await getStatisticData();
    await getLogData();
    await getAlerts();
    await getDeActivateDocuments();
  };
  const onScanListener = () => {
    setIsScanning(true);
    window.$("#scannerDialog").modal("show");
  };

  return (
    <MainLayout
      title={
        fileStatistic.file
          ? fileStatistic.file.archiveTreeId.route +
            " / " +
            fileStatistic.file.title
          : ""
      }
    >
      {/*<EditorComponent/>
            <ImageCropComponent/>*/}
      <LoadingDialog setIsLoading={setIsLoading} isLoading={isLoading} />
      <UpdateFileDialog fileId={history.location.state.fileId} />
      <AddGroupNoteDialog setGroupNoteHandle={setGroupNoteHandle} />
      <ShareDocumentDialog insertShareFile={insertShareFile} />
      {isShoeDocBlock ? (
        <ShowSingleDocumentDialog
          onGetFileHandle={onGetFileHandle}
          singleDocument={singleDocument}
          note={note}
          watermark={fileStatistic.archiveWatermark}
          setNote={setNote}
          setPreviewUrl={setPreviewUrl}
          addNewNoteForDocument={addNewNoteForDocument}
          removeNoteFromDocument={removeNoteFromDocument}
          getInputValue={getInputValue}
          previewUrl={previewUrl}
          visible={visible}
          setVisible={setVisible}
        />
      ) : null}
      {/*<iframe
                src={pdf} type="application/pdf"
                frameBorder="0"/>*/}
      <InfoDialog
        title={"امکان باگذار نیست"}
        info={"لطفا تا کامل شدن آپلود فایل های قبلی منتظر بمانید"}
      />
      <AlertDialog
        title={"آیا از حذف این سند مطمعن هستید؟"}
        deleteHandle={deleteHandle}
      />
      <AlertDialog
        title={"آیا از حذف این پرونده مطمعن هستید؟"}
        deleteHandle={async () => {
          await dispatch(
            deleteFileAction(history.location.state.fileId, history)
          );
        }}
        dialogId={"alertDeleteFileDialog"}
      />
      <SearchFileDialog changeDocumentFileHandle={changeDocumentFileHandle} />
      <UpsertEmailDialog
        singleEmail={singleEmail}
        isGetAll={isGetAllFilesEmail}
        documents={documentsSelected}
        fileId={history.location.state.fileId}
      />
      <SearchArchivesTreesAction moveToNewArchiveTree={moveToNewArchiveTree} />
      <ShowLibraryDialog />
      <ShowFileFormDialog
        history={history}
        fileId={history.location.state.fileId}
        isPreview={false}
      />
      <FileAlertsDialog />
      <ScannerDialog history={history} getDocData={getDocData} />
      {fileStatistic?.file?.isReject && (
        <div className="alert alert-danger mx-3" role="alert">
          {fileStatistic?.file.message}
        </div>
      )}
      <div className={"row mx-2"}>
        <div className={"col-lg-9"}>
          {isShowUploadBlock ? (
            <div
              hidden={canUpload}
              className="tab-pane"
              id="settings1"
              role="tabpanel"
            >
              <div>
                <div className="p-4">
                  <FileDrop
                    onDrop={(files, e) => {
                      if (canUpload) onImageChange(files);
                      else window.$("#infoDialog").modal("show");
                    }}
                  >
                    <div
                      style={{
                        minHeight: "20vh",
                        backgroundColor: "#f3f3f3",
                        border: "4px dashed rgba(144,144,144,0.38)",
                        borderRadius: 12,
                      }}
                    >
                      <label
                        htmlFor="input-url"
                        className={"btn-block text-center p-1 m-0"}
                        style={{
                          backgroundColor: "#ececec",
                          cursor: "pointer",
                        }}
                      >
                        انتخاب سند
                      </label>
                      <hr className={"m-0 p-0"} />

                      <div style={{ width: "100%", height: "100%" }}>
                        {images.length > 0 || uploadedFile.length > 0 ? (
                          <>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              <>
                                {uploadedFile.map((u) => (
                                  <>
                                    <span
                                      style={{
                                        flexWrap: "wrap",
                                        width: 100,
                                        height: 100,
                                        marginTop: 5,
                                        marginBottom: 30,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        backgroundColor: "rgba(0,0,0,0.3)",
                                        padding: 5,
                                        borderRadius: 10,
                                        position: "relative",
                                      }}
                                    >
                                      <img
                                        style={{
                                          objectFit: "cover",
                                          borderRadius: 7,
                                          zIndex: -1,
                                          opacity: "0.5",
                                        }}
                                        width={90}
                                        height={90}
                                        src={
                                          "http://192.168.2.24:3000/assets/images/paper.png"
                                        }
                                      />
                                      <p
                                        style={{ width: 100 }}
                                        className={"text-center"}
                                      >
                                        <span data-tip={u.title}>
                                          {u.title.substr(0, 10)}
                                        </span>
                                        <ReactTooltip />
                                      </p>
                                      <span
                                        style={{
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          transform: "translate(-50%, -50%)",
                                        }}
                                      >
                                        <i
                                          className="mdi mdi-checkbox-marked-circle"
                                          style={{
                                            fontSize: 40,
                                            color: "green",
                                          }}
                                        />
                                      </span>
                                    </span>
                                  </>
                                ))}
                                {images.map((i, index) => (
                                  <>
                                    <span
                                      style={{
                                        flexWrap: "wrap",
                                        width: 100,
                                        height: 100,
                                        marginTop: 5,
                                        marginBottom: 30,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        padding: 5,
                                        borderRadius: 10,
                                        position: "relative",
                                      }}
                                    >
                                      <img
                                        style={{
                                          objectFit: "cover",
                                          borderRadius: 7,
                                        }}
                                        width={90}
                                        height={90}
                                        src={
                                          "http://192.168.2.24:3000/assets/images/paper.png"
                                        }
                                      />
                                      <p
                                        style={{ width: 100 }}
                                        className={"text-center"}
                                      >
                                        <span data-tip={i.title}>
                                          {i.title.substr(0, 10)}
                                        </span>
                                        <ReactTooltip />
                                      </p>
                                      <span
                                        hidden={!canUpload}
                                        style={{
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          transform: "translate(-50%, -50%)",
                                        }}
                                      >
                                        <i
                                          className="mdi mdi-alert-circle"
                                          style={{ fontSize: 40, color: "red" }}
                                        />
                                      </span>
                                      {index === 0 ? (
                                        <span
                                          hidden={canUpload}
                                          style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                          }}
                                        >
                                          <div className="lds-roller">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                          </div>
                                        </span>
                                      ) : null}
                                    </span>
                                  </>
                                ))}
                              </>
                            </div>
                          </>
                        ) : (
                          <h4
                            style={{
                              width: "100%",
                              height: "100%",
                              color: "rgba(144,144,144,0.38)",
                            }}
                            className={"text-center"}
                          >
                            فایل را در این قسمت رها کنید
                          </h4>
                        )}
                      </div>
                    </div>
                  </FileDrop>
                  <hr />
                </div>
              </div>
            </div>
          ) : null}

          <div className={"card px-0"}>
            <div className={"text-center custom-cursor row card-body"}>
              <div
                hidden={handleHide("ویرایش پرونده")}
                className={"box-flat"}
                onClick={async () => {
                  window.$("#updateFileDialog").modal("show");
                }}
              >
                <i
                  className={"fas fa-pencil-alt mb-2 p-0"}
                  style={{ fontSize: 17, display: "block" }}
                />
                <span className={"m-0 p-0"}>ویرایش</span>
              </div>
              <div
                hidden={handleHide("حذف پرونده")}
                className={"box-flat"}
                onClick={() => {
                  window.$("#alertDeleteFileDialog").modal("show");
                }}
              >
                <i
                  className={"fas fa-sign-out-alt mb-2 p-0"}
                  style={{ fontSize: 17, display: "block" }}
                />
                <span className={"m-0 p-0"}>حذف</span>
              </div>
              <div
                className={"box-flat"}
                onClick={() => {
                  window.$("#fileAlertsDialog").modal("show");
                }}
              >
                <i
                  className={"fas fa-info mb-2 p-0"}
                  style={{ fontSize: 17, display: "block" }}
                />
                <span className={"m-0 p-0"}>هشدار</span>
              </div>
              <div
                hidden={handleHide("اشتراک گذاری")}
                className={"box-flat"}
                onClick={async () => {
                  window.$("#shareDocumentOrFileDialog").modal("show");
                }}
              >
                <i
                  className={"fas fa-share-alt mb-2 p-0"}
                  style={{ fontSize: 17, display: "block" }}
                />
                <span className={"m-0 p-0"} style={{ fontSize: 13 }}>
                  اشتراک گذاری
                </span>
              </div>
              <div
                hidden={handleHide("نمایش سندها") && handleHide("ناظر")}
                className={"box-flat"}
                onClick={() => {
                  downloadGroupDocuments(true);
                }}
              >
                <i
                  className={"fas fa-download mb-2 p-0"}
                  style={{ fontSize: 17, display: "block" }}
                />
                <span className={"m-0 p-0"}>دریافت</span>
              </div>
              <div
                hidden={handleHide("ویرایش پرونده")}
                className={"box-flat"}
                onClick={() => {
                  window.$("#searchArchivesTrees").modal("show");
                }}
              >
                <i
                  className={"fas fa-expand-arrows-alt mb-2 p-0"}
                  style={{ fontSize: 17, display: "block" }}
                />
                <span className={"m-0 p-0"}>انتقال</span>
              </div>
              {/* <div hidden={handleHide("اشتراک گذاری اسناد با ایمیل")} className={"box-flat"} onClick={()=>{
                                setIsGetAllFilesEmail(true)
                                setSingleEmail({})
                                setReloadState(uuidv4())
                            }}>
                                <i className={"fas fa-share-square mb-2 p-0"} style={{fontSize:17,display:"block"}}/>
                                <span className={"m-0 p-0"}>ایمیل پرونده</span>
                            </div> */}

              {/*<div className={"box-flat"} hidden={!hasForm} onClick={()=>{
                                window.$('#showFileFormDialog').modal('show')
                            }}>
                                <i className={"fas fa-pager mb-2 p-0"} style={{fontSize:17,display:"block"}}/>
                                <span className={"m-0 p-0"}>روکش</span>
                            </div>*/}

              <div
                hidden={handleHide("ایجاد سند")}
                style={{ backgroundColor: "#45CB85" }}
                className={"box-flat dropdown-toggle"}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  className={"fas fa-upload mb-2 p-0"}
                  style={{ fontSize: 17, display: "block", color: "white" }}
                />
                <span className={"m-0 p-0"} style={{ color: "white" }}>
                  افزودن سند
                </span>
              </div>

              <div
                hidden={handleHide("ایجاد سند")}
                className={"text-center custom-cursor mt-2"}
              >
                <div className="btn-group mt-2 mr-1 dropleft">
                  <div className="dropdown-menu">
                    <span className="dropdown-item">
                      <label
                        htmlFor="input-url"
                        className={"mb-0 pb-0"}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <i className="mdi mdi-file-upload-outline font-size-16 align-middle mr-2"></i>
                        انتخاب اسناد
                      </label>
                    </span>
                    <span className="dropdown-item ">
                      <label
                        htmlFor="getFolder"
                        className={"mb-0 pb-0"}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <i className="mdi mdi-folder-upload-outline font-size-16 align-middle mr-2"></i>
                        انتخاب پوشه
                      </label>
                    </span>
                    <span
                      className="dropdown-item "
                      onClick={() => {
                        window.$("#showLibraryDialog").modal("show");
                      }}
                    >
                      <label
                        className={"mb-0 pb-0"}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <i className="mdi mdi-library-shelves font-size-16 align-middle mr-2"></i>
                        کازیو
                      </label>
                    </span>
                    <span className="dropdown-item ">
                      <span
                        onClick={() => {
                          localStorage.setItem(
                            "file",
                            history.location.state.fileId
                          );
                          history.push({
                            pathname: "/edit",
                          });
                        }}
                      >
                        <label
                          className={"mb-0 pb-0"}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <i className="mdi mdi-library-shelves font-size-16 align-middle mr-2"></i>
                          بازگذاری پیشرفته تصویر
                        </label>
                      </span>
                    </span>
                    <span className="dropdown-item ">
                      <label
                        className={"mb-0 pb-0"}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <ScanDialog
                          onScannedListener={(fileScanned) => {
                            onImageChange([fileScanned]);
                          }}
                        />
                      </label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"card"}>
            <div className={"card-body pt-0 mt-0"}>
              <div>
                <div>
                  <ul
                    className="nav nav-tabs nav-tabs-custom nav-justified"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#fileinfo"
                        role="tab"
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">اطلاعات پایه</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#fileform"
                        role="tab"
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          اطلاعات تکمیلی
                        </span>
                      </a>
                    </li>
                    {/*<li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#filetickets" role="tab">
                                                <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                                <span className="d-none d-sm-block">
                                                    <span>
                                                        تاریخچه تیکت ها
                                                    </span>
                                                    {fileStatistic.file?(
                                                        <>
                                                            {fileStatistic.file.isConfirm?(
                                                                <span className="badge badge-success mx-1">تایید شده</span>
                                                            ):fileStatistic.file.isReject?(
                                                                <span className="badge badge-danger mx-1">مرجوع شده</span>
                                                            ):fileStatistic.file.isWaiting?(
                                                                <span className="badge badge-dark mx-1">در انتظار</span>
                                                            ):(
                                                                <span className="badge badge-dark mx-1">بدون عملیات</span>
                                                            )}
                                                        </>
                                                    ):null}

                                                </span>
                                            </a>
                                        </li>*/}
                  </ul>

                  <div className="tab-content p-3 text-muted">
                    <div
                      className="tab-pane active"
                      id="fileinfo"
                      role="tabpanel"
                    >
                      {/*در این قسمت بود*/}
                      {fileStatistic.file ? (
                        <div>
                          <div className={"row my-2"}>
                            <span className={"col-lg-12"}>
                              شماره پرونده : {fileStatistic.file.fileCode}
                            </span>
                          </div>
                          <div className={"row my-2"}>
                            <span className={"col-lg-12"}>
                              عنوان پرونده : {fileStatistic.file.title}
                            </span>
                          </div>
                          <div className={"row my-2"}>
                            <span className={"col-lg-3"}>
                              تاریخ ایجاد : {fileStatistic.file.createDate}
                            </span>
                            <span className={"col-lg-3"}>
                              زبان پرونده :{" "}
                              {fileStatistic.file.archiveTreeId.lang === "fa"
                                ? "فارسی"
                                : "انگلیسی"}
                            </span>
                            <span className={"col-lg-3"}>
                              نوع پرونده : {fileStatistic.file.type}
                            </span>
                            <span className={"col-lg-3"}>
                              وضعیت پرونده : {fileStatistic.file.fileStatus}
                            </span>
                          </div>

                          <div className={"row my-2"}>
                            <span className={"col-lg-6"}>
                              تعداد پیوست : {fileStatistic.totalCount}
                            </span>
                            <span className={"col-lg-3"}>
                              حجم پرونده :
                              <span dir={"ltr"}>{fileStatistic.totalSize}</span>
                            </span>
                          </div>
                          <div className={"row my-2"}>
                            <span className={"col-lg-3"}>
                              درخواست کننده :{" "}
                              {fileStatistic.file.applicantId
                                ? fileStatistic.file.applicantId.title
                                : "-"}
                            </span>
                          </div>
                          <span className={"col-lg-9 p-0"}>
                            مخاطبین :
                            {fileStatistic.file ? (
                              <>
                                {fileStatistic.file.contacts.map((c) => (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-primary mb-2 btn-sm waves-effect waves-light mx-1"
                                    >
                                      {c.label}
                                    </button>
                                    {/*<span style={{color:"green"}}>{c.label} {index+1!==fileStatistic.file.contacts.length?(
                                                                                "/"
                                                                            ):null} </span>
                                                                            {index-1%2===0?(
                                                                                <br/>
                                                                            ):null}*/}
                                  </>
                                ))}
                              </>
                            ) : null}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="tab-pane" id="fileform" role="tabpanel">
                      <div>
                        <ElementsContextProvider
                          fileId={history.location.state.fileId}
                          childrenListInput={[]}
                        >
                          <UpsertArchivesFormDialog />
                        </ElementsContextProvider>
                      </div>
                    </div>
                    <div className="tab-pane" id="filetickets" role="tabpanel">
                      {/*<div>
                                                <div>
                                                    {!handleHide("ناظر") || !handleHide("ویرایش پرونده")?(
                                                        <div >
                                                            <>
                                                                {!handleHide("ناظر")  ?(
                                                                    <>
                                                                        {fileSingle.isWaiting?(
                                                                            <>
                                                                                <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
                                                                                <textarea
                                                                                    rows={3}
                                                                                    type="text"
                                                                                    name={"messageText"}
                                                                                    value={messageText}
                                                                                    onChange={(e)=>{
                                                                                        setMessageText(e.target.value)
                                                                                    }}
                                                                                    className="form-control" id="validationCustom04"
                                                                                    placeholder={"توضیحات را جهت ارسال وارد کنید..."} required/>
                                                                                    <p className={"mdi mdi-send mt-1 custom-cursor"} onClick={rejectFileHandle} style={{transform: "rotate(180deg) translateY(18px)",fontSize:17,color:"royalblue"}} />
                                                                                </div>
                                                                                <button onClick={fileConfirmHandle} className={"btn btn-dark btn-block my-2"}>تایید نهایی</button>
                                                                            </>
                                                                        ):null}
                                                                    </>
                                                                ):(
                                                                    <>
                                                                        {!fileSingle.isWaiting && !fileSingle.isConfirm || fileSingle.isReject?(
                                                                            <>
                                                                                <div hidden={fileSingle.isConfirm}>
                                                                                    <select className="custom-select col-lg-11 mb-2" onChange={(e)=>{
                                                                                        setSupervisorReceiver(e.target.value)
                                                                                    }}>
                                                                                        <option value={undefined} name={undefined}>انتخاب کنید</option>
                                                                                        {archivesSupervisors.map(a=>(
                                                                                            <option value={a._id} name={a._id}>{a.firstName} {a.lastName} / {a.position}</option>
                                                                                        ))}

                                                                                    </select>
                                                                                    <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
                                                                                    <textarea
                                                                                        rows={3}
                                                                                        type="text"
                                                                                        name={"messageText"}
                                                                                        value={messageText}
                                                                                        onChange={(e)=>{
                                                                                            setMessageText(e.target.value)
                                                                                        }}
                                                                                        className="form-control col-lg-11" id="validationCustom04"
                                                                                        placeholder={"توضیحات را جهت ارسال وارد کنید..."} required/>
                                                                                        <p className={"mdi mdi-send custom-cursor col-lg-1"} onClick={sendFileHandle} style={{transform: "rotate(180deg) translateY(18px)",fontSize:17,color:"royalblue"}} />
                                                                                    </div>
                                                                                </div>

                                                                            </>
                                                                        ):null}
                                                                    </>

                                                                )}
                                                            </>

                                                            {fileSingle.correspondence?fileSingle.correspondence.map(c=>(
                                                            <div className={`alert alert-${c.isSupervisor?"info":"success"}`} role="alert">
                                                                {c.message}
                                                            </div>
                                                        )):null}
                                                            <TicketsTableComponent logs={fileSingle.correspondence?fileSingle.correspondence:[]}/>
                                                        </div>
                                                    ):null}
                                                </div>
                                            </div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"row"}>
            <div className={"col-lg-12"}>
              <>
                {/*برای نمایش لیست سند ها*/}
                <div className={"card"}>
                  <div className="card-body">
                    <ul
                      className="nav nav-tabs nav-tabs-custom nav-justified"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#home1"
                          role="tab"
                        >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                          </span>
                          <span className="d-none d-sm-block">لیست اسناد</span>
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        hidden={handleHide("تاریخچه تغییرات سند")}
                      >
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#profile1"
                          role="tab"
                        >
                          <span className="d-block d-sm-none">
                            <i className="far fa-user"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            تاریخچه اسناد
                          </span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#messages1"
                          role="tab"
                        >
                          <span className="d-block d-sm-none">
                            <i className="far fa-envelope"></i>
                          </span>
                          <span className="d-none d-sm-block">آمار پرونده</span>
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        hidden={handleHide("مدیریت اسناد حذف شده")}
                      >
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#deActivateDocument"
                          role="tab"
                        >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-cog"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            اسناد حذف شده
                          </span>
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content p-3 text-muted">
                      <div
                        className="tab-pane active"
                        id="home1"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-12">
                            <div>
                              <div className="p-0">
                                <div className={"row"}>
                                  <div className={"col-lg-8 row mb-1"}>
                                    <div
                                      hidden={documentsCut.origin === undefined}
                                      className={
                                        "text-center mx-3 custom-cursor"
                                      }
                                      onClick={() => {
                                        changeDocumentFileHandle(
                                          undefined,
                                          undefined
                                        );
                                      }}
                                    >
                                      <i
                                        className={
                                          "mdi mdi-database-export btn-block m-0 p-0"
                                        }
                                        style={{ fontSize: 25 }}
                                      />
                                      <span style={{ fontSize: 12 }}>
                                        انتقال به پرونده
                                      </span>
                                    </div>
                                    <div
                                      hidden={documentsSelected.length === 0}
                                      className={"row"}
                                    >
                                      <div
                                        hidden={handleHide("حذف سند")}
                                        className={
                                          "text-center mx-3 custom-cursor"
                                        }
                                        onClick={groupDeleteDocuments}
                                      >
                                        <i
                                          className={
                                            "mdi mdi-delete btn-block m-0 p-0"
                                          }
                                          style={{ fontSize: 25 }}
                                        />
                                        <span style={{ fontSize: 12 }}>
                                          حذف
                                        </span>
                                      </div>
                                      <div
                                        hidden={handleHide("ویرایش سند")}
                                        className={
                                          "text-center mx-3 custom-cursor"
                                        }
                                        onClick={() => {
                                          if (documentsSelected.length > 0)
                                            window
                                              .$("#addGroupNoteDialog")
                                              .modal("show");
                                        }}
                                      >
                                        <i
                                          className={
                                            "mdi mdi-note-plus btn-block m-0 p-0"
                                          }
                                          style={{ fontSize: 25 }}
                                        />
                                        <span style={{ fontSize: 12 }}>
                                          یادداشت
                                        </span>
                                      </div>
                                      <div
                                        hidden={handleHide("ویرایش سند")}
                                        className={
                                          "text-center mx-3 custom-cursor"
                                        }
                                        onClick={groupCutDocuments}
                                      >
                                        <i
                                          className={
                                            "mdi mdi-content-cut btn-block m-0 p-0"
                                          }
                                          style={{ fontSize: 25 }}
                                        />
                                        <span style={{ fontSize: 12 }}>
                                          انتقال
                                        </span>
                                      </div>
                                      <div
                                        className={
                                          "text-center mx-3 custom-cursor"
                                        }
                                        onClick={() => {
                                          downloadGroupDocuments(false);
                                        }}
                                      >
                                        <i
                                          className={
                                            "mdi mdi-file-download btn-block m-0 p-0"
                                          }
                                          style={{ fontSize: 25 }}
                                        />
                                        <span style={{ fontSize: 12 }}>
                                          دریافت
                                        </span>
                                      </div>
                                      <div
                                        hidden={handleHide(
                                          "اشتراک گذاری اسناد با ایمیل"
                                        )}
                                        className={
                                          "text-center mx-3 custom-cursor"
                                        }
                                        onClick={() => {
                                          setSingleEmail({});
                                          setIsGetAllFilesEmail(false);
                                          setReloadState(uuidv4());
                                        }}
                                      >
                                        <i
                                          className={
                                            "mdi mdi-email-send btn-block m-0 p-0"
                                          }
                                          style={{ fontSize: 25 }}
                                        />
                                        <span style={{ fontSize: 12 }}>
                                          ایمیل
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className={"col-lg-4 row mb-4"}>
                                    <input
                                      className="form-control col-lg-8"
                                      type="text"
                                      placeholder={"جستجو..."}
                                      onChange={(e) => {
                                        setDocSearchValue(e.target.value);
                                      }}
                                    />
                                    <div className={"col-lg-4"}>
                                      <select
                                        className="custom-select"
                                        onChange={(e) => {
                                          setDocEachPerPage(
                                            Number(e.target.value)
                                          );
                                        }}
                                      >
                                        <option value={12} name={12}>
                                          {12}
                                        </option>
                                        <option value={25} name={25}>
                                          {25}
                                        </option>
                                        <option value={100} name={100}>
                                          {100}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <DocumentTableComponent
                                  history={history}
                                  getSingleDocument={getSingleDocument}
                                  documents={documents.documents}
                                  handleHide={handleHide}
                                  onOpenAlertDialogHandle={
                                    onOpenAlertDialogHandle
                                  }
                                  handleSetSingleDocumentId={
                                    handleSetSingleDocumentId
                                  }
                                  documentsSelected={documentsSelected}
                                  setDocumentsSelected={setDocumentsSelected}
                                  setIsShoeDocBlock={setIsShoeDocBlock}
                                />
                                <PagingComponent
                                  handlePaging={handleDocPaging}
                                  pageId={documents.pageId}
                                  eachPerPage={documents.eachPerPage}
                                  total={documents.total}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="profile1" role="tabpanel">
                        <div>
                          <div className="row">
                            <div className="col-12">
                              <div>
                                <div className="p-0">
                                  <div className={"row"}>
                                    <div className={"col-lg-8"}></div>
                                    <div className={"col-lg-4"}>
                                      <input
                                        className="form-control mb-2 "
                                        type="text"
                                        placeholder={"جستجو..."}
                                        onChange={(e) => {
                                          setLogSearchValue(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <FileLogsTableComponent
                                    fileLogs={fileLogs.logs}
                                  />
                                  <PagingComponent
                                    handlePaging={handleLogPaging}
                                    pageId={fileLogs.pageId}
                                    eachPerPage={fileLogs.eachPerPage}
                                    total={fileLogs.total}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane"
                        id="messages1"
                        role="tabpanel"
                        style={{ width: "100%" }}
                      >
                        {optionChart.labels ? (
                          <div className={"row"}>
                            <div className={"col-lg-4"}>
                              <Pie data={optionChart} />
                            </div>
                            <div className={"col-lg-8"}>
                              <div className="table-rep-plugin">
                                <div
                                  className="table-responsive mb-0"
                                  data-pattern="priority-columns"
                                >
                                  <table
                                    id="tech-companies-1"
                                    className="table table-striped"
                                  >
                                    <thead>
                                      <tr>
                                        <th>شماره</th>
                                        <th data-priority="6">فرمت</th>
                                        <th data-priority="6">حجم</th>
                                        <th data-priority="6">تعداد</th>
                                        <th data-priority="6">درصد</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {fileStatistic.chartEx.map((c, index) => (
                                        <tr>
                                          <th>{index + 1}</th>
                                          <td>{c.ex}</td>
                                          <td>{c.size}</td>
                                          <td>{c.value}</td>
                                          <td>{c.percentage}%</td>
                                        </tr>
                                      ))}
                                      <tr>
                                        <th>کل</th>
                                        <td>-</td>
                                        <td>{fileStatistic.totalSize}</td>
                                        <td>{fileStatistic.totalCount}</td>
                                        <td>{100}%</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div
                        className="tab-pane"
                        id="deActivateDocument"
                        role="tabpanel"
                      >
                        <div>
                          <div className="row">
                            <div className="col-12">
                              <div>
                                <DeActivateDocumentsTable
                                  restoreDocument={restoreDocument}
                                  documents={deActivateDocuments.documents}
                                />
                                <PagingComponent
                                  handlePaging={handleDeActivateDocumentsPaging}
                                  pageId={deActivateDocuments.pageId}
                                  eachPerPage={deActivateDocuments.eachPerPage}
                                  total={deActivateDocuments.total}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              {/*<div className={"card card-body px-4"}>
                                <h5 className={"mb-0 mt-3"}>فایل های کازیو</h5>
                                <LibrariesDocumentsComponent isManage={false}/>
                                <button className={"btn btn-success mt-2 btn-block"} onClick={sendData}>ثبت اسناد</button>
                            </div>*/}
            </div>
          </div>
        </div>
        <div className={"col-lg-3"}>
          <div className={"card card-body"}>
            <div>
              {fileStatistic.file ? (
                <div
                  className={"text-center"}
                  style={{ marginRight: "30%", marginBottom: 20 }}
                >
                  {fileStatistic.file.isConfirm ? (
                    <div
                      style={{
                        width: "50%",
                        height: 65,
                        fontSize: 14,
                        backgroundColor: "#45cb85",
                        borderRadius: 10,
                        color: "white",
                        textAlign: "center",
                        paddingTop: 20,
                      }}
                    >
                      تایید شده
                    </div>
                  ) : // <span className="badge badge-success mx-1">تایید شده</span>
                  fileStatistic.file.isReject ? (
                    <div
                      style={{
                        width: "50%",
                        height: 65,
                        fontSize: 14,
                        backgroundColor: "#ff715b",
                        borderRadius: 10,
                        color: "white",
                        textAlign: "center",
                        paddingTop: 20,
                      }}
                    >
                      مرجوع شده
                    </div>
                  ) : // <span className="badge badge-danger mx-1">مرجوع شده</span>
                  fileStatistic.file.isWaiting ? (
                    <div
                      style={{
                        width: "50%",
                        height: 65,
                        fontSize: 14,
                        backgroundColor: "#343A40",
                        borderRadius: 10,
                        color: "white",
                        textAlign: "center",
                        paddingTop: 20,
                      }}
                    >
                      در انتظار
                    </div>
                  ) : (
                    // <span className="badge badge-dark mx-1">در انتظار</span>
                    <div
                      style={{
                        width: "50%",
                        height: 65,
                        fontSize: 14,
                        backgroundColor: "#343A40",
                        borderRadius: 10,
                        color: "white",
                        textAlign: "center",
                        paddingTop: 20,
                      }}
                    >
                      بدون عملیات
                    </div>
                    // <span className="badge badge-dark mx-1">بدون عملیات</span>
                  )}
                </div>
              ) : null}
              {!fileSingle.isWaiting &&
              !fileSingle.isConfirm &&
              fileSingle.creator === localStorage.getItem("userId") ? (
                <>
                  <span>توضیحات :</span>
                  <textarea
                    rows={3}
                    type="text"
                    name={"messageText"}
                    value={messageText}
                    onChange={(e) => {
                      setMessageText(e.target.value);
                    }}
                    className="form-control"
                    id="validationCustom04"
                    placeholder={"توضیحات را جهت ارسال وارد کنید..."}
                  />
                  <div className={"row"}>
                    <div className={"col-lg-7"}></div>
                    <div className={"col-lg-5"}>
                      <button
                        className={"btn btn-success btn-block my-3"}
                        onClick={sendFileHandle}
                      >
                        ارسال
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
              <TicketsTableComponent
                logs={
                  fileSingle.correspondence ? fileSingle.correspondence : []
                }
              />
            </div>
          </div>
          <span className={"mt-3"}>
            {fileAlerts.map((f) => (
              <div className="alert alert-primary" role="alert">
                <div
                  style={{
                    border: "2px dashed rgba(203,203,203,0.77)",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <p className={"m-0 p-0"}>{f.title}</p>
                  <p className={"m-0 p-0"}>{f.description}</p>
                </div>
                <p style={{ color: "black" }} className={"m-0 p-0"}>
                  ارسال کننده : {f.creator.firstName} {f.creator.lastName}
                </p>
                <p style={{ color: "black" }} className={"m-0 p-0"}>
                  اعتبار هشدار : {f.alertDate}
                </p>
                <p style={{ color: "black" }} className={"m-0 p-0"}>
                  ایجاد : {f.createDate}
                </p>
              </div>
            ))}
          </span>
          <span className={"mt-3"}>
            {emailsHistory.map((e) => (
              <div className={"card p-2"}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                  className={"custom-cursor"}
                >
                  <span>گیرنده ها : </span>
                  <i
                    className={"mdi mdi-eye"}
                    style={{ fontSize: 15, color: "royalblue", marginLeft: 10 }}
                    onClick={() => {
                      setSingleEmail(e);
                    }}
                  />
                </div>
                {e.usersReceiver.map((r, index) => (
                  <>
                    {r.userName}{" "}
                    {index + 1 !== e.usersReceiver.length ? " - " : null}
                  </>
                ))}
                <hr className={"my-2 p-0"} />
                <p className={"m-0 p-0"}>تاریخ انقضا : {e.expireDate}</p>
                <p className={"m-0 p-0"}>تاریخ ایجاد : {e.createDate}</p>
              </div>
            ))}
          </span>
        </div>
      </div>
      <input
        style={{ visibility: "hidden" }}
        type="file"
        id="getFolder"
        onChange={(event) => {
          getFolder(event);
        }}
        directory=""
        webkitdirectory=""
        mozdirectory
        msdirectory
        odirectory
        multiple
      />
      <input
        type="file"
        id="input-url"
        multiple="multiple"
        name={"imageUrl"}
        onChange={(e) => {
          if (canUpload) onImageChange(e.target.files);
          else window.$("#infoDialog").modal("show");
        }}
        style={{ visibility: "hidden" }}
        aria-describedby="imageUrl"
      />
    </MainLayout>
  );
};
export default UpsertDocumentRoot;
