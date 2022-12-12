import React from "react";
import { useContext } from "react";
import { FileContext } from "../../context/file/FileContext";
const UploadInputs = () => {
  const { canUpload, onImageChange, setIsShowProcessDialog } =
    useContext(FileContext);
  const getFolder = (e) => {
    const files = e.target.files;
    if (canUpload) onImageChange(files);
    else setIsShowProcessDialog(true);
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
        aria-describedby="getFolder"
      />
      <input
        type="file"
        id="input-url"
        multiple="multiple"
        name={"imageUrl"}
        onChange={(e) => {
          console.log(canUpload);
          if (canUpload) onImageChange(e.target.files);
          else setIsShowProcessDialog(true);
        }}
        style={{ visibility: "hidden" }}
        aria-describedby="input-url"
      />
    </>
  );
};
export default UploadInputs;
