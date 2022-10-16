import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import FilerobotImageEditor from "filerobot-image-editor";
import { insertDocumentService } from "../../service/DocumentService";
import {
  addVideoFlagAction,
  removeVideoFlagAction,
  setManualDocumentAction,
} from "../../stateManager/actions/DocumentAction";
import { doneToast, errorToast } from "../../utility/ShowToast";
import ImageCropComponent from "../document/imageCroper/ImageCropComponent";
import MP4PlayerComponent from "../document/MP4Player/MP4PlayerComponent";
import ReactTooltip from "react-tooltip";
import { Document, Page } from "react-pdf";
import axios from "axios";
import { Modal } from "antd";
import { LoopCircleLoading } from "react-loadingg";
import { WaterMark } from "@ant-design/pro-components";
import { RootContext } from "../../RootComponent/RootContext";

const ShowSingleDocumentDialog = ({
  note,
  setPreviewUrl,
  setNote,
  removeNoteFromDocument,
  addNewNoteForDocument,
  previewUrl,
  visible,
  setVisible,
  watermark,
}) => {
  const { handleHide } = useContext(RootContext);
  const dispatch = useDispatch();
  const singleDocumentState = useSelector((state) => state.document.document);
  const versions = useSelector((state) => state.document.versions);
  const [isHover, setIsHover] = useState(false);

  const addNewFlagHandle = async (startSecond, endSecond, description) => {
    if (description.length < 2) {
      errorToast("توضیح را وارد کنید");
      return false;
    }
    await dispatch(
      addVideoFlagAction({
        startSecond,
        endSecond,
        description,
        documentId: singleDocumentState._id,
      })
    );
    return true;
  };
  const deleteFlagHandle = async (flagId) => {
    await dispatch(removeVideoFlagAction(singleDocumentState._id, flagId));
  };

  const [file, setFile] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [numPagesInput, setNumPagesInput] = useState(pageNumber);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(parseInt(numPages));
    setPageNumber(1);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(1);
    }
  };
  useEffect(() => {
    if (previewUrl) {
      axios(`http://localhost:5000/${previewUrl}`, {
        method: "GET",
        withCredentials: false,
        responseType: "blob",
        header: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        setFile(file);
      });
    }
  }, [previewUrl]);
  const onDialogClear = async () => {
    setPreviewUrl(null);
    await dispatch(
      setManualDocumentAction({
        versions: [],
        document: {},
      })
    );
    setVisible(false);
  };
  return (
    <Fragment style={{ zIndex: 8000 }}>
      <Modal
        centered
        visible={visible}
        footer={[
          <button onClick={onDialogClear} className={"btn btn-danger mx-1"}>
            انصراف
          </button>,
        ]}
        onOk={onDialogClear}
        style={{ marginTop: 10, zIndex: 8000 }}
        onCancel={onDialogClear}
        width={"100%"}
      >
        <div className={"card mt-0 pt-0 "}>
          <div className={"row"}>
            <div
              className={`col-lg-${isHover ? "3" : "1"}`}
              onMouseEnter={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setIsHover(false);
              }}
            >
              {isHover ? (
                <div className={"row"}>
                  <div className={"col-lg-11"}>
                    {/*<img
                                        className={"text-center mt-1 ml-5"}
                                        width={65}
                                        height={65}
                                        src={`http://localhost:3000/assets/images/icons/${singleDocumentState.ex}.png`}  />*/}
                    {versions.length > 0 ? null : (
                      <p
                        hidden={handleHide("دریافت سند")}
                        className={"mx-2 p-0"}
                      >
                        <a
                          href={`http://localhost:5000/${previewUrl}`}
                          target="_blank"
                          download={true}
                        >{`دریافت نسخه ${singleDocumentState.version}`}</a>
                      </p>
                    )}

                    <div className="form-group mb-1 mt-3">
                      <textarea
                        name={"note"}
                        value={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                        className="form-control mb-0"
                        id="validationCustom04"
                        placeholder="یادداشت وارد کنید"
                        required
                      />
                      <button
                        className={"btn btn-primary btn-block mb-3 mt-1"}
                        onClick={addNewNoteForDocument}
                      >
                        ثبت
                      </button>
                      {singleDocumentState.notes
                        ? singleDocumentState.notes.map((n) => (
                            <div
                              style={{
                                backgroundColor: "#f3f3f3",
                                border: "1px dashed rgba(144,144,144,0.38)",
                                borderRadius: 12,
                                marginBottom: 10,
                              }}
                            >
                              <div className={"mx-3"}>
                                <p className={"m-0"}>
                                  {n.description} - {n.createDate}
                                </p>
                                <p className={"m-0"}>توسط : {n.userFullName}</p>
                                <hr className={"m-0 p-0"} />
                                <i
                                  className="mdi mdi-delete m-0 p-0 btn btn-block text-center"
                                  style={{ fontSize: 20, color: "#ff2c2c" }}
                                  onClick={() => {
                                    removeNoteFromDocument(n._id);
                                  }}
                                />
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div
                    className={"black-vl-small"}
                    style={{ minHeight: 300 }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={"./assets/images/notes-icon.png"}
                    width={80}
                    height={80}
                  />
                  <p>یادداشت ها</p>
                </div>
              )}
            </div>
            <div className={`col-lg-${isHover ? "9" : "11"}`}>
              <div
                style={{ backgroundColor: "#f1f1f1", width: "100%" }}
                id={"editor-box"}
              >
                <hr />
                {previewUrl && singleDocumentState.ex ? (
                  <>
                    {singleDocumentState.ex === "png" ||
                    singleDocumentState.ex === "jpg" ||
                    singleDocumentState.ex === "PNG" ||
                    singleDocumentState.ex === "jpge" ? (
                      <ImageCropComponent
                        ex={singleDocumentState.ex}
                        title={
                          singleDocumentState.title +
                          "." +
                          singleDocumentState.ex
                        }
                        documentId={singleDocumentState._id}
                        imageHeight={singleDocumentState.imageHeight}
                        documentSize={singleDocumentState.documentSize}
                        imageWidth={singleDocumentState.imageWidth}
                      />
                    ) : singleDocumentState.ex.toLowerCase() === "mp4" ||
                      singleDocumentState.ex.toLowerCase() === "mkv" ||
                      singleDocumentState.ex.toLowerCase() === "wmv" ? (
                      <MP4PlayerComponent
                        deleteFlagHandle={deleteFlagHandle}
                        url={`http://localhost:5000/${previewUrl}`}
                        addNewFlagHandle={addNewFlagHandle}
                      />
                    ) : singleDocumentState.ex === "txt" ? (
                      <pre>{singleDocumentState.txt}</pre>
                    ) : singleDocumentState.ex === "pdf" ||
                      singleDocumentState.ex === "docx" ||
                      singleDocumentState.ex === "xlsm" ||
                      singleDocumentState.ex === "xlsx" ? (
                      <div style={{ width: "680px !important" }}>
                        <div>
                          <div>
                            {file ? (
                              <React.Fragment>
                                <div>
                                  <div className="pagination mx-2">
                                    <div
                                      className={
                                        "d-flex justify-content-between"
                                      }
                                      style={{ width: "100%" }}
                                    >
                                      <p>
                                        صفحه {pageNumber} از {numPages}
                                      </p>
                                      <div
                                        className={"row mx-2 px-2 py-1 my-1"}
                                        style={{
                                          backgroundColor: "#e5e5e5",
                                          borderRadius: 5,
                                        }}
                                      >
                                        <div>
                                          {pageNumber > 1 && (
                                            <span
                                              style={{ cursor: "pointer" }}
                                              onClick={handlePrevPage}
                                            >
                                              قبلی /
                                            </span>
                                          )}
                                        </div>
                                        <div>
                                          {pageNumber < numPages && (
                                            <span
                                              style={{ cursor: "pointer" }}
                                              onClick={handleNextPage}
                                            >
                                              بعدی
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <div className={"row mx-2"}>
                                        <input
                                          value={numPagesInput}
                                          type={"number"}
                                          onChange={(e) => {
                                            if (
                                              Number(e.target.value) > numPages
                                            )
                                              return;
                                            setNumPagesInput(
                                              Number(e.target.value)
                                            );
                                          }}
                                          placeholder={"صفحه"}
                                          className={"form-control"}
                                          style={{ width: 40 }}
                                        />
                                        <div>
                                          <button
                                            className={"btn btn-dark mx-2"}
                                            onClick={() => {
                                              setPageNumber(numPagesInput);
                                            }}
                                          >
                                            برو
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#e5e5e5",
                                    }}
                                    className={"d-flex justify-content-center"}
                                  >
                                    <WaterMark
                                      fontColor={"rgba(0,0,0,0.42)"}
                                      fontFamily={"primary-font"}
                                      fontSize={30}
                                      content={watermark}
                                    >
                                      <Document
                                        file={file}
                                        onLoadSuccess={onLoadSuccess}
                                      >
                                        <Page pageNumber={pageNumber} />
                                      </Document>
                                    </WaterMark>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{ width: "100%", height: "300px" }}
                        className={"text-center mt-5"}
                      >
                        <i
                          className={"fas fa-file-alt "}
                          style={{
                            fontSize: 200,
                            color: "rgb(255,255,255)",
                            opacity: 0.8,
                          }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ height: "50vh" }}>
                    <LoopCircleLoading />
                  </div>
                )}
                <div className={"row d-flex justify-content-between mx-3 p-3"}>
                  <p
                    data-tip={singleDocumentState.title}
                    className={"mx-2 my-1 p-0"}
                  >
                    <b>عنوان : </b>
                    {singleDocumentState.title ? singleDocumentState.title : ""}
                  </p>
                  <ReactTooltip />
                  <p className={"mx-2 my-1 p-0"}>
                    <b>سایز : </b>
                    {singleDocumentState.documentSize}{" "}
                  </p>
                  {/*<p data-tip={singleDocumentState.documentName} className={"mx-2 my-1 p-0"}><b>نام : </b>{singleDocumentState.documentName?singleDocumentState.documentName:""}</p>*/}
                  <ReactTooltip />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="modal fade bs-example-modal-xl"
        id="showSingleDocumentDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content p-4"></div>
        </div>
      </div>
    </Fragment>
  );
};
export default ShowSingleDocumentDialog;
