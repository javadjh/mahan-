import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_IP } from "../../config/ip";
import {
  addNewNoteForDocumentService,
  getDocumentFileService,
  removeNoteFromDocumentService,
} from "../../service/DocumentService";
import { getImageDocumentService } from "../../service/FileService";
import { getDocumentAction } from "../../stateManager/actions/DocumentAction";
import { DocumentContext } from "./DocumentContext";

const DocumentContextProvider = ({ children, match }) => {
  const docId = match?.params?.documentId;
  const fileId = match?.params?.fileId;
  //redux utilities
  const dispatch = useDispatch();
  const document = useSelector((state) => state.document);
  //local states
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();

  //use effects
  useEffect(() => {
    if (document.document._id) {
      onGetFileHandle(docId);
    } else {
      dispatch(getDocumentAction(docId));
    }
  }, [document]);

  //query handlers
  const onGetFileHandle = async (id = "1", title, ex = undefined) => {
    title = document.document.title;
    ex = document.document.ex;
    if (ex === "png" || ex === "jpg" || ex === "PNG" || ex === "jpge") {
      const { data, status } = await getImageDocumentService(id);
      if (status === 200) {
        var file = new File([data], `${title}.${ex}`, {
          type: "image/jpeg",
          lastModified: new Date(),
          size: 10,
          endings: "transparent",
        });
        // setFileData(file);
        // setSelectedImage(file);
        const blobUrl = URL.createObjectURL(data);
        setPreviewUrl(blobUrl);
      }
    } else {
      setIsLoaded(false);
      const { data, status } = await getDocumentFileService(
        id === "1" ? document._id : id
      );
      if (status === 200) {
        setIsLoaded(true);
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
            setPreviewUrl(`${SERVER_IP}/${id}.pdf`);
          }
        } else {
          filename = `${title}.${ex}`;
          console.log(`${title}.${ex}`);
          if (id !== "1") {
            setPreviewUrl(`${SERVER_IP}/${id}.${ex}`);
          }
        }
      }
    }
  };

  //comand handlers
  const addNewNoteForDocument = async ({ description }) => {
    const { status, data } = await addNewNoteForDocumentService({
      documentId: docId,
      description,
    });

    await dispatch(getDocumentAction(docId));
  };
  const removeNoteFromDocument = async (id) => {
    const { status, data } = await removeNoteFromDocumentService(docId, id);
    await dispatch(getDocumentAction(docId));
  };

  return (
    <DocumentContext.Provider
      value={{
        isLoaded,
        previewUrl,
        docId,
        fileId,
        document,
        addNewNoteForDocument,
        removeNoteFromDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
export default DocumentContextProvider;
