import React, { useState } from "react";
import { RootContext } from "./RootContext";
import jwt from "jsonwebtoken";
const RootContextProvider = ({ children }) => {
  const [libraryShelfContext, setLibraryShelfContext] = useState({});
  const [reload, setReload] = useState();
  const [fileId, setFileId] = useState(null);
  const [archiveId, setArchiveId] = useState(null);
  const [reloadDoc, setReloadDoc] = useState();
  let token;
  if (localStorage.getItem("token")) {
    token = jwt.decode(localStorage.getItem("token"), {
      complete: true,
    }).payload;
  }
  const [access] = useState(token ? token.finalAccessList : []);
  const handleHide = (accessKey) => {
    return !access.includes(accessKey);
  };
  return (
    <RootContext.Provider
      value={{
        libraryShelfContext,
        setLibraryShelfContext,
        reload,
        setReload,
        access,
        fileId,
        setFileId,
        setArchiveId,
        archiveId,
        reloadDoc,
        setReloadDoc,
        handleHide,
      }}
    >
      {/* <UserProfileDialog/> */}
      {children}
    </RootContext.Provider>
  );
};
export default RootContextProvider;
