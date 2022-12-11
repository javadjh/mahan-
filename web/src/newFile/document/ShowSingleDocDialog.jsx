import React from "react";
import ImageCropComponent from "../../ArchiveTree/document/imageCroper/ImageCropComponent";
import { SERVER_IP } from "../../config/ip";
import { getDocumentFileService } from "../../service/DocumentService";
import PDFViewerComponent from "./PDFViewerComponent";
const ShowSingleDocDialog = ({ doc }) => {
  const dispatch = useDispatch();
  const singleDocumentState = useSelector((state) => state.document.document);
  const versions = useSelector((state) => state.document.versions);
  const [isHover, setIsHover] = useState(false);
  const [isFileDownloading, setIsFileDownloading] = useState(false);

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
    <div>
      {previewUrl && doc.ex ? (
        <>
          {doc.ex === "png" ||
          doc.ex === "jpg" ||
          doc.ex === "PNG" ||
          doc.ex === "jpge" ? (
            <ImageCropComponent
              ex={doc.ex}
              title={doc.title + "." + doc.ex}
              documentId={doc._id}
              imageHeight={doc.imageHeight}
              documentSize={doc.documentSize}
              imageWidth={doc.imageWidth}
            />
          ) : doc.ex.toLowerCase() === "mp4" ||
            doc.ex.toLowerCase() === "mkv" ||
            doc.ex.toLowerCase() === "wmv" ? (
            <MP4PlayerComponent
              doc={doc}
              deleteFlagHandle={deleteFlagHandle}
              url={`${SERVER_IP}/${previewUrl}`}
              addNewFlagHandle={addNewFlagHandle}
            />
          ) : doc.ex === "txt" ? (
            <pre>{doc.txt}</pre>
          ) : doc.ex === "pdf" ||
            doc.ex === "docx" ||
            doc.ex === "xlsm" ||
            doc.ex === "xlsx" ? (
            <PDFViewerComponent doc={doc} />
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
        <p data-tip={doc.title} className={"mx-2 my-1 p-0"}>
          <b>عنوان : </b>
          {doc.title ? doc.title : ""}
        </p>
        <ReactTooltip />
        <p className={"mx-2 my-1 p-0"}>
          <b>سایز : </b>
          {doc.documentSize}{" "}
        </p>
        {/*<p data-tip={doc.documentName} className={"mx-2 my-1 p-0"}><b>نام : </b>{doc.documentName?doc.documentName:""}</p>*/}
        <ReactTooltip />
      </div>
    </div>
  );
};
export default ShowSingleDocDialog;
