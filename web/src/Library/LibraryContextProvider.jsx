import React, { useContext, useEffect, useState } from "react";
import { LibraryContext } from "./LibraryContext";
import { useDispatch, useSelector } from "react-redux";
import { setDocumentsFileAction } from "../stateManager/actions/DocumentAction";
import { v4 as uuidv4 } from "uuid";
import { getLibraryAction } from "../stateManager/actions/LibraryAction";
import { RootContext } from "../RootComponent/RootContext";
import { errorToast } from "../utility/ShowToast";

const LibraryContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { libraryShelfContext } = useContext(RootContext);
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [file, setFile] = useState();
  const [archive, setArchive] = useState();
  const [libraryReload, setLibraryReload] = useState();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(getLibraryAction());
  };

  const addDoc = (id) => {
    const selectedDocCopy = [...selectedDoc];
    selectedDocCopy.push(id);
    setSelectedDoc(selectedDocCopy);
  };
  const removeDoc = (id) => {
    let selectedDocCopy = [...selectedDoc];
    selectedDocCopy = selectedDocCopy.filter((s) => s !== id);
    setSelectedDoc(selectedDocCopy);
  };

  const sendData = async () => {
    if (selectedDoc.length === 0) {
      errorToast("لطفا اسناد مورد نظر را انتخاب کنید");
      return;
    }
    if (!archive) {
      errorToast("لطفا بایگانی مورد نظر را انتخاب کنید");
      return;
    }
    if (!file) {
      errorToast("لطفا پرونده مورد نظر را انتخاب کنید");
      return;
    }
    await dispatch(
      setDocumentsFileAction(
        {
          documents: selectedDoc,
          archiveId: archive,
          file,
          libraryShelfId: libraryShelfContext._id,
        },
        libraryShelfContext
      )
    );
    setLibraryReload(uuidv4());
  };
  return (
    <LibraryContext.Provider
      value={{
        selectedDoc,
        setSelectedDoc,
        file,
        setFile,
        libraryReload,
        addDoc,
        removeDoc,
        sendData,
        archive,
        setArchive,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
export default LibraryContextProvider;
