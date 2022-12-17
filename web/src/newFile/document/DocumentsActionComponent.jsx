import React, { Fragment } from "react";
import { SpaceStyled } from "../../styled/global";
import ActionsHeader from "./ActionsHeaders";
import DocumentsNotesComponents from "./DocumentsNotesComponents";
import DocumentsVersionsComponent from "./DocumentsVersionsComponent";
import InsertDocumentsNoteComponent from "./InsertDocumentsNoteComponent";

const DocumentsActionsComponent = () => {
  return (
    <Fragment>
      <SpaceStyled horizontal={20}>
        <ActionsHeader />
        <SpaceStyled top={30}>
          <InsertDocumentsNoteComponent />
        </SpaceStyled>
        <DocumentsNotesComponents />
        <DocumentsVersionsComponent />
      </SpaceStyled>
    </Fragment>
  );
};
export default DocumentsActionsComponent;
