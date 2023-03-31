import ShowLibraryDialog from "../../ArchiveTree/dialog/ShowLibraryDialog";
import LibraryContextProvider from "../../Library/LibraryContextProvider";
import React from "react";
const ChooseLibraryDocsPage = ({ match }) => {
  const fileId = match.params.id;
  return (
    <LibraryContextProvider>
      <ShowLibraryDialog fileIdPage={fileId} archiveIdPage={"sdcsd"} />
    </LibraryContextProvider>
  );
};

export default ChooseLibraryDocsPage;
