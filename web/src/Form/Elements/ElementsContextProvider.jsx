import React, { useContext, useEffect, useState } from "react";
import { ElementsContext } from "./ElementsContext";
import { ArchiveTreeContext } from "../../ArchiveTree/ArchiveTreeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  changeManualFileFormAction,
  getFileFormAction,
  setFileFormAction,
} from "../../stateManager/actions/FileAction";
import { setManualFormPreviewAction } from "../../stateManager/actions/FormAction";
const ElementsContextProvider = ({ fileId, children, childrenListInput }) => {
  const [childrenList, setChildrenList] = useState([]);
  const fileForm = useSelector((state) => state.fileForm);
  const fileStatistic = useSelector((state) => state.fileStatistic);
  const dispatch = useDispatch();
  useEffect(() => {
    if (childrenListInput.length > 0) {
      setChildrenList(childrenListInput);
    } else {
      getData();
    }
    return () => {
      setChildrenList([]);
      dispatch(
        changeManualFileFormAction({
          form: {},
          filesForm: [],
        })
      );
    };
  }, [fileId, childrenListInput]);

  useEffect(() => {
    if (fileStatistic.file) {
      if (fileStatistic.file.archiveTreeId) {
        if (fileStatistic.file.archiveTreeId.isFormRequired) {
          if (childrenListInput.length === 0) {
            if (fileForm.filesForm.length > 0)
              setChildrenList(fileForm.filesForm);
            else if (fileForm.form.children)
              setChildrenList(fileForm.form.children);
          }
        }
      }
    }
  }, [fileForm, childrenListInput]);
  const getData = async () => {
    if (fileId) await dispatch(getFileFormAction(fileId));
  };
  const sendData = async () => {
    let isAllValid = true;
    childrenList.map((c) => {
      if (c.isRequired && !c.isValid) {
        isAllValid = false;
      }
    });
    if (isAllValid) {
      await dispatch(setFileFormAction(fileId, childrenList));
    }
  };
  return (
    <ElementsContext.Provider
      value={{
        childrenList,
        setChildrenList,
        fileForm,
        sendData,
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};
export default ElementsContextProvider;
