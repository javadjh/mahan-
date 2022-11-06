import React, { useEffect, useState } from "react";
import {
  changeArchiveTreesNameService,
  deleteArchiveTreeService,
  getArchiveTreesService,
} from "../../service/ArchiveTreeService";
import { doneToast } from "../../utility/ShowToast";
import { ArchiveTreeContext } from "./ArchiveTreesContext";
const ArchiveTreeContextProvider = ({ children }) => {
  let archiveId = localStorage.getItem("archive");
  const [mainParent, setMainParent] = useState();
  const [archiveTrees, setArchiveTrees] = useState([]);
  const [parentArchiveTree, setParentArchiveTree] = useState();
  const [documents, setDocuments] = useState({});
  useEffect(() => {
    getData();
  }, [mainParent]);

  const getData = async () => {
    const { data, status } = await getArchiveTreesService({
      isMain: mainParent ? false : true,
      mainParent,
      archiveId,
    });
    console.log(data);
    if (status === 200) setArchiveTrees(data);
  };
  const changeTreeTitle = async (id, newTitle) => {
    console.log(newTitle);
    const { data, status } = await changeArchiveTreesNameService(id, {
      title: newTitle,
      archiveId,
    });
    if (status === 200) {
      getData();
    }
  };
  const deleteArchiveTree = async (id) => {
    const { data, status } = await deleteArchiveTreeService(id);
    if (status === 200) {
      getData();
      doneToast("با موفقیت حذف شد");
    }
  };
  return (
    <ArchiveTreeContext.Provider
      value={{
        mainParent,
        setMainParent,
        archiveTrees,
        setArchiveTrees,
        parentArchiveTree,
        setParentArchiveTree,
        documents,
        setDocuments,
        getData,
        changeTreeTitle,
        deleteArchiveTree,
      }}
    >
      {children}
    </ArchiveTreeContext.Provider>
  );
};
export default ArchiveTreeContextProvider;
