import React, { Fragment } from "react";
import styled from "styled-components";
import { SpaceStyled } from "../../styled/global";
import ActionsHeader from "./ActionsHeaders";
import DocumentsNotesComponents from "./DocumentsNotesComponents";
import DocumentsVersionsComponent from "./DocumentsVersionsComponent";
import InsertDocumentsNoteComponent from "./InsertDocumentsNoteComponent";

const DocumentsActionsComponent = () => {
  const BlockLimit = styled.div`
    max-height: 230px;
    overflow-y: scroll;
  `;
  return (
    <Fragment>
      <SpaceStyled horizontal={20}>
        <ActionsHeader />
        <SpaceStyled top={30}>
          <InsertDocumentsNoteComponent />
        </SpaceStyled>
        <BlockLimit>
          <DocumentsNotesComponents />
        </BlockLimit>
        <BlockLimit>
          <DocumentsVersionsComponent />
        </BlockLimit>
      </SpaceStyled>
    </Fragment>
  );
};
export default DocumentsActionsComponent;
