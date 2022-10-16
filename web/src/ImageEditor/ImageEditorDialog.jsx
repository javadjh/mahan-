import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import ImageEditorRootComponent from "./ImageEditorRootComponent";

const ImageEditorDialog = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ImageEditorRootComponent />
    </>
  );
};
export default ImageEditorDialog;
