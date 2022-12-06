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
import AddShelfComponent from "../components/library/AddShelfComponent";
import CustomDialog from "../styled/components/CustomDialog";
import ShelfItemComponent from "../components/library/ShelfItemComponent";
import CustomButton from "../styled/components/CustomButton";
import { lightGreenColor } from "../app/appColor";
const LibrariesDocumentsComponent = ({ isManage = true }) => {
  const [isShowMoveDialog, setIsShowMoveDialog] = useState(false);
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
    <div>
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
                <LibraryItemComponent
                  item={l}
                  selectedDoc={selectedDoc}
                  addDoc={addDoc}
                  removeDoc={removeDoc}
                  deleteDocument={deleteDocument}
                  setSingleDocument={setSingleDocument}
                  getDocumentsFile={getDocumentsFile}
                />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <Row>
          <>
            <Row>
              {library.libraryShelf.map((s) => (
                <Col>
                  <ShelfItemComponent
                    deleteLibraryShelf={deleteLibraryShelf}
                    isManage={isManage}
                    item={s}
                    reloadPage={reloadPage}
                    setLibraryShelfContext={setLibraryShelfContext}
                    setLibraryShelf={setLibraryShelf}
                  />
                </Col>
              ))}
              <Col>
                <CustomDialog
                  title={"بایگانی"}
                  render={
                    <UpsertLibraryShelfDialog libraryShelf={libraryShelf} />
                  }
                  actionRender={<AddShelfComponent />}
                />
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
