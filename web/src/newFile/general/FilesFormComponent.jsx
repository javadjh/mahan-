import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormViewerRoot from "../../newForm/objects/view/FormViewerRoot";
import { setFileFormAction } from "../../stateManager/actions/FileAction";

const FilesFormComponent = () => {
  const dispatch = useDispatch();
  const fileStatistic = useSelector((state) => state.fileStatistic);

  return (
    <>
      {fileStatistic?.form?.length > 0 && (
        <FormViewerRoot
          child={fileStatistic?.form}
          onSubmit={async (e) => {
            await dispatch(setFileFormAction(fileStatistic.file._id, e));
          }}
        />
      )}
    </>
  );
};
export default FilesFormComponent;
