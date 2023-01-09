import { Image } from "antd";
import React from "react";
const ShowDocumentScannedComponent = ({ isScanning, blobImage }) => {
  return (
    <>
      <div className="flex-first">
        {isScanning ? (
          <div style={{ paddingTop: "35%", color: "white" }}>
            در حال اسکن...
          </div>
        ) : (
          <Image
            width={"100%"}
            src={blobImage}
            height={"100vh"}
            preview={false}
          />
        )}
      </div>
    </>
  );
};
export default ShowDocumentScannedComponent;
