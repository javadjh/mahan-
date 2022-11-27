import React from "react";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
const UploadInputs = () => {
  const { canUpload, onImageChange } = useContext(FileContext);
  const getFolder = (e) => {
    const files = e.target.files;
    if (canUpload) onImageChange(files);
    // else window.$("#infoDialog").modal("show");
  };
  return (
    <>
      <input
        style={{ visibility: "hidden" }}
        type="file"
        id="getFolder"
        onChange={(event) => {
          getFolder(event);
        }}
        directory=""
        webkitdirectory=""
        mozdirectory
        msdirectory
        odirectory
        multiple
      />
      <input
        type="file"
        id="input-url"
        multiple="multiple"
        name={"imageUrl"}
        onChange={(e) => {
          if (canUpload) onImageChange(e.target.files);
          else window.$("#infoDialog").modal("show");
        }}
        style={{ visibility: "hidden" }}
        aria-describedby="imageUrl"
      />
    </>
  );
};
export default UploadInputs;
