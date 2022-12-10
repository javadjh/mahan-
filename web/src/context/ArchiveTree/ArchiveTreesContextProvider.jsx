import React, { useEffect, useState } from "react";
import {
  changeArchiveTreesNameService,
  deleteArchiveTreeService,
  getArchiveTreesService,
  insertArchiveTreeService,
} from "../../service/ArchiveTreeService";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveTreesFileService } from "../../service/FileService";
import { doneToast } from "../../utility/ShowToast";
import { ArchiveTreeContext } from "./ArchiveTreesContext";
import { archiveTreesDataAction } from "../../stateManager/actions/ArchiveTreeAction";
const ArchiveTreeContextProvider = ({ children }) => {
  //reduxs selector
  const archiveTreesData = useSelector((state) => state.archiveTreesData);
  //reduxs dispatch
  const dispatch = useDispatch();

  let archiveId = localStorage.getItem("archive");
  const [mainParent, setMainParent] = useState();
  const [mainTree, setMainTree] = useState();
  const [archiveTrees, setArchiveTrees] = useState([]);
  const [files, setFiles] = useState({});
  const [isLoad, reload] = useState();
  const [fileFilter, setFileFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
  });
  const [routes, setRoutes] = useState([
    {
      label: "شاخه ی اصلی",
    },
  ]);
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    getData();
    if (mainParent) getFiles();
  }, [mainParent, isLoad]);
  useEffect(() => {
    if (mainParent) getFiles();
  }, [fileFilter, isLoad]);

  //init archiveTree data
  useEffect(() => {
    if (archiveTreesData?.routes?.length > 1) {
      setMainParent(archiveTreesData.mainParent);
      setMainTree(archiveTreesData.mainTree);
      setArchiveTrees(archiveTreesData.archiveTrees);
      setFiles(archiveTreesData.files);
      setFileFilter(archiveTreesData.fileFilter);
      setRoutes(archiveTreesData.routes);
      setDocuments(archiveTreesData.documents);
    }
  }, []);

  const getFiles = async () => {
    const { status, data } = await getArchiveTreesFileService(
      mainParent._id,
      fileFilter
    );
    if (status === 200) {
      setFiles(data);
      await dispatch(archiveTreesDataAction({ files: data }));
    }
  };

  const getData = async () => {
    const { data, status } = await getArchiveTreesService({
      isMain: mainParent ? false : true,
      mainParent: mainParent?._id,
      archiveId,
    });

    if (status === 200) {
      setArchiveTrees(data);
      await dispatch(archiveTreesDataAction({ archiveTrees: data }));
    }
  };
  const changeTreeTitle = async (id, newTitle) => {
    const { data, status } = await changeArchiveTreesNameService(id, {
      title: newTitle,
      archiveId,
    });
    if (status === 200) {
      getData();
    }
  };
  const insertTree = async (formData) => {
    const { data, status } = await insertArchiveTreeService({
      ...formData,
      ...{
        isMain: mainParent ? false : true,
        mainParent: mainParent,
        archiveId,
      },
    });
    if (status === 200) {
      reload(Date.now());
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
        dispatch,
        reload,
        mainTree,
        setMainTree,
        routes,
        files,
        fileFilter,
        setFileFilter,
        setFiles,
        setRoutes,
        mainParent,
        setMainParent,
        archiveTrees,
        setArchiveTrees,
        documents,
        setDocuments,
        getData,
        changeTreeTitle,
        deleteArchiveTree,
        insertTree,
      }}
    >
      {children}
    </ArchiveTreeContext.Provider>
  );
};
export default ArchiveTreeContextProvider;
