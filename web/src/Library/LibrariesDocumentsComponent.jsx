import React, { useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { LibraryContext } from "./LibraryContext";
import { getLibrariesDocumentsFileService } from "../service/LibraryService";
import { saveAs } from "file-saver";
import AlertDialog from "../utility/AlertDialog";
import {
  deleteGroupLibrariesDocumentsAction,
  deleteLibrariesDocumentAction,
  deleteLibraryShelfAction,
  getLibraryShelfDocumentsAction,
  moveDocumentsToLibraryShelfAction,
} from "../stateManager/actions/LibraryAction";
import UpsertLibraryShelfDialog from "./dialog/UpsertLibraryShelfDialog";
import { RootContext } from "../RootComponent/RootContext";
import ShowFilePreviewLibraryDialog from "./dialog/ShowFilePreviewLibraryDialog";
import MoveDocumentsToLibraryShelfDialog from "./dialog/MoveDocumentsToLibraryShelfDialog";
import { Col, Row } from "antd";
import LibraryItemComponent from "./LibraryItemComponent";
import { SpaceStyled } from "../styled/global";
const LibrariesDocumentsComponent = ({ isManage = true }) => {
  const { selectedDoc, setSelectedDoc, removeDoc, addDoc } =
    useContext(LibraryContext);
  const { libraryShelfContext, setLibraryShelfContext, reload, setReload } =
    useContext(RootContext);
  const library = useSelector((state) => state.library);
  const libraryShelfDocuments = useSelector(
    (state) => state.libraryShelfDocuments
  );
  const dispatch = useDispatch();
  const [singleDocument, setSingleDocument] = useState({});
  const [libraryShelf, setLibraryShelf] = useState({});
  const [singleLibraryShelf, setSingleLibraryShelf] = useState({});
  const [, reloadPage] = useState();
  const [singleDocumentId, setSingleDocumentId] = useState();
  const [destinationId, setDestinationId] = useState();

  const getDocumentsFile = async (id, title, ex) => {
    const { data, status } = await getLibrariesDocumentsFileService(id);
    if (status === 200) {
      if (
        ex === "png" ||
        ex === "jpg" ||
        ex === "jpge" ||
        ex === "docx" ||
        ex === "xlsm" ||
        ex === "xlsx" ||
        ex === "txt"
      ) {
        ex = "pdf";
      }
      saveAs(data, title + "." + ex);
    }
  };

  // useEffect(() => {
  //   // if (libraryShelf._id) window.$("#upsertLibraryDialog").modal("show");
  //   return () => {
  //     setLibraryShelfContext({});
  //   };
  // }, [libraryShelf]);

  useEffect(() => {
    if (libraryShelfContext._id) getLibraryShelfDocument();
  }, [libraryShelfContext, reload]);

  const getLibraryShelfDocument = async () => {
    await dispatch(getLibraryShelfDocumentsAction(libraryShelfContext._id));
  };

  const deleteShowDialog = (document) => {
    setSingleDocument(document);
    // window.$("#alertDialog").modal("show");
  };
  const deleteDocument = async (id) => {
    await dispatch(
      deleteLibrariesDocumentAction(id, libraryShelfContext._id, setReload)
    );
  };
  const showDeleteLibraryShelfDialogHandle = () => {
    // window.$("#deleteLibraryShelf").modal("show");
  };
  const deleteLibraryShelf = async (id) => {
    await dispatch(deleteLibraryShelfAction(id));
  };

  const showGroupAlertDialogDelete = async () => {
    await dispatch(
      deleteGroupLibrariesDocumentsAction(
        {
          documentIds: selectedDoc,
          libraryShelfId: libraryShelfContext._id,
        },
        libraryShelfContext._id
      )
    );
  };
  const moveDocumentHandel = async () => {
    await dispatch(
      moveDocumentsToLibraryShelfAction({
        documentsId: selectedDoc,
        destinationShelfId: destinationId,
      })
    );
    setSelectedDoc([]);
  };
  return (
    <div className={"mt-0"}>
      {/* <AlertDialog
        title={`آیا از حذف سند ${singleDocument.title} مطمعن هستید؟`}
        deleteHandle={deleteDocument}
      />
      <AlertDialog
        title={`آیا از حذف پوشه ${singleLibraryShelf.title} اطمینان دارید؟`}
        deleteHandle={deleteLibraryShelf}
        dialogId={"deleteLibraryShelf"}
      />
      <AlertDialog
        title={`آیا از حذف اسناد انتخاب شده اطمینان دارید؟`}
        deleteHandle={showGroupAlertDialogDelete}
        dialogId={"deleteGroupDocuments"}
      />
      <UpsertLibraryShelfDialog libraryShelf={libraryShelf} />
      <ShowFilePreviewLibraryDialog id={singleDocumentId} />
      <MoveDocumentsToLibraryShelfDialog
        destinationId={destinationId}
        setDestinationId={setDestinationId}
        moveDocumentHandel={moveDocumentHandel}
      /> */}
      {libraryShelfContext._id ? (
        <div>
          <Row
            onClick={() => {
              setLibraryShelfContext({});
              reloadPage("");
            }}
          >
            <Col>
              <i className={"mdi mdi-arrow-right"} style={{ fontSize: 20 }} />
            </Col>
            <Col>
              <span style={{ marginTop: 5, marginRight: 2 }}>بازگشت</span>
            </Col>
            <Col>
              <span style={{ marginTop: 5, marginRight: 2 }}>
                ( {libraryShelfContext.title} )
              </span>
            </Col>
          </Row>
          <Row>
            {libraryShelfDocuments.map((l) => (
              <Col span={6}>
                <span
                  className={"card py-2 px-3 mr-3 mt-0"}
                  style={{
                    height: 220,
                    backgroundColor: selectedDoc.includes(l._id)
                      ? "royalblue"
                      : "white",
                  }}
                  onClick={() => {
                    /*if(selectedDoc.includes(l._id))
                                    removeDoc(l._id)
                                else
                                    addDoc(l._id)*/
                  }}
                >
                  <div className="form-group">
                    <div className="custom-control custom-checkbox text-center p-0">
                      <div>
                        {/*<input type="checkbox" className="custom-control-input"
                                                   checked={selectedDoc.includes(l._id)}
                                                   id={l._id}/>
                                            <label className="custom-control-label " htmlFor={l._id}/>*/}
                        <span
                          style={{
                            width: 70,
                            borderRadius: 5,
                            padding: "0px 10px",
                            backgroundColor: selectedDoc.includes(l._id)
                              ? "white"
                              : "royalblue",
                            color: selectedDoc.includes(l._id)
                              ? "royalblue"
                              : "white",
                          }}
                          className={"custom-cursor"}
                          onClick={() => {
                            if (selectedDoc.includes(l._id)) removeDoc(l._id);
                            else addDoc(l._id);
                          }}
                        >
                          <i
                            className={
                              selectedDoc.includes(l._id)
                                ? `mdi mdi-checkbox-marked mx-1`
                                : `mdi mdi-checkbox-blank-outline mx-1`
                            }
                            style={{ fontSize: 20 }}
                          />
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <img
                          className={"mt-2"}
                          width={90}
                          height={90}
                          src={`http://localhost:3000/assets/images/icons/${l.ex}.png`}
                        />
                        <span
                          style={{ width: 90 }}
                          className={"text-center pt-2"}
                        >
                          <span
                            style={{
                              color: selectedDoc.includes(l._id)
                                ? "white"
                                : "black",
                            }}
                            className={"custom-cursor"}
                            data-tip={l.title}
                          >
                            {l.title.length > 7
                              ? l.title.substr(0, 7)
                              : l.title}
                          </span>
                          <span
                            style={{
                              fontSize: 10,
                              color: selectedDoc.includes(l._id)
                                ? "white"
                                : "red",
                            }}
                          >
                            ({l.lastModify})
                          </span>
                          <ReactTooltip />
                        </span>
                        <span
                          style={{
                            width: 90,
                            color: selectedDoc.includes(l._id)
                              ? "white"
                              : "gray",
                          }}
                          className={"text-center pt-2"}
                        >
                          {l.createDate}
                        </span>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                          hidden={selectedDoc.includes(l._id)}
                        >
                          <i
                            className={"mdi mdi-delete custom-cursor mx-1"}
                            hidden={!isManage}
                            style={{ fontSize: 17, color: "red" }}
                            onClick={() => {
                              removeDoc(l._id);
                              deleteShowDialog(l);
                            }}
                          />
                          <i
                            data-tip={"دریافت سند"}
                            className={
                              "mdi mdi-file-download custom-cursor mx-1"
                            }
                            hidden={!isManage}
                            style={{ fontSize: 17, color: "green" }}
                            onClick={() => {
                              if (
                                l.ex === "png" ||
                                l.ex === "jpg" ||
                                l.ex === "jpge"
                              ) {
                                setSingleDocumentId(l._id);
                                // window
                                //   .$("#showFilePreviewLibraryDialog")
                                //   .modal("show");
                              } else {
                                getDocumentsFile(l._id, l.title, l.ex);
                              }
                              removeDoc(l._id);
                            }}
                          />
                          <ReactTooltip />
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <Row>
          <>
            <Row>
              {library.libraryShelf.map((s) => (
                <Col span={4}>
                  <div onClick={() => {}}>
                    <i
                      className={"mdi mdi-window-close custom-cursor"}
                      style={{ color: "red", fontSize: 17 }}
                      onClick={() => {
                        setSingleLibraryShelf(s);
                        showDeleteLibraryShelfDialogHandle();
                      }}
                    />
                    <div className="form-group">
                      <div className="custom-control custom-checkbox text-center p-0">
                        {/*<i className={"mdi mdi-plus-thick custom-cursor"} onClick={()=>{
                                            window.$('#upsertLibraryDialog').modal('show')
                                        }} style={{fontSize:40,color:"green"}}/>*/}
                        <div
                          onClick={() => {
                            setLibraryShelfContext(s);
                            reloadPage(s._id);
                          }}
                          className={"custom-cursor"}
                        >
                          <img
                            style={{
                              marginTop: 15,
                              marginRight: 20,
                              marginLeft: 20,
                            }}
                            src={`./assets/images/folder.png`}
                            width={70}
                            height={70}
                          />
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <p className={"m-0 p-0 custom-cursor"}>
                            {s.title.length > 10
                              ? s.title.substr(0, 10) + "..."
                              : s.title}
                          </p>
                          <i
                            className={"mdi mdi-pencil-outline custom-cursor"}
                            hidden={!isManage}
                            onClick={() => {
                              setLibraryShelf(s);
                            }}
                            style={{ color: "royalblue" }}
                          />
                        </div>
                        <p className={"m-0 p-0"}>{s.createDate}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
              <Col span={4}>
                <span
                  className={"card py-2 px-3 mr-3 mt-0"}
                  style={{ height: 220, backgroundColor: "#f6f6f6" }}
                  onClick={() => {}}
                >
                  <div className="form-group">
                    <div className="custom-control custom-checkbox text-center p-0">
                      <div
                        style={{ width: 100, marginTop: 65 }}
                        data-tip={"افزودن پوشه"}
                      >
                        <i
                          className={"mdi mdi-plus-thick custom-cursor"}
                          onClick={() => {
                            // window.$("#upsertLibraryDialog").modal("show");
                          }}
                          style={{ fontSize: 40, color: "green" }}
                        />
                      </div>
                      <ReactTooltip />
                    </div>
                  </div>
                </span>
              </Col>
              {library.library.map((l) => (
                <Col>
                  <SpaceStyled horizontal={5}>
                    <LibraryItemComponent
                      item={l}
                      selectedDoc={selectedDoc}
                      addDoc={addDoc}
                      removeDoc={removeDoc}
                      deleteDocument={deleteDocument}
                      setSingleDocument={setSingleDocument}
                      getDocumentsFile={getDocumentsFile}
                    />
                  </SpaceStyled>
                </Col>
              ))}
            </Row>
          </>
        </Row>
      )}
    </div>
  );
};
export default LibrariesDocumentsComponent;
