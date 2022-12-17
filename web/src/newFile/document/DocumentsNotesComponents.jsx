import React from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { DocumentContext } from "../../context/document/DocumentContext";
import NoteItem from "./NoteItem";

const DocumentsNotesComponents = () => {
  const {
    document: {
      document: { notes },
    },
  } = useContext(DocumentContext);

  return (
    <Fragment>
      {notes?.map((item) => (
        <NoteItem item={item} />
      ))}
    </Fragment>
  );
};
export default DocumentsNotesComponents;
