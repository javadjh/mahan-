import React from "react";
import { Form, Modal } from "antd";
import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ScannerOptionsComponent from "./ScannerOptionsComponent";
import ShowDocumentScannedComponent from "./ShowDocumentScannedComponent";

const ScanDialog = ({ onScannedListener }) => {
  const [form] = Form.useForm();
  const [devices, setDevices] = useState([]);
  const [blobImage, setBlobImage] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setBlobImage(null);
    setIsScanning(false);
    setFile(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBlobImage(null);
    setIsScanning(false);
    setFile(null);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/Scanner/GetDevices",
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    setDevices(data);
    if (data.length === 0) {
      alert("اسکنر متصل نمیباشد");
    }
  };
  const scanDocument = async (formData) => {
    // console.log(formData.deviceId);
    // formData = {
    //   ...formData,
    //   ...{
    //     deviceId: formData.deviceId.replaceAll(String.fromCharCode(92), "\\"),
    //   },
    // };
    // console.log(formData.deviceId);
    // formData.width_pixels = 4900;
    // formData.height_pixels = 7000;
    // formData.dpi = 600;
    setIsScanning(true);
    const res = await axios.get("http://localhost:8080/api/Scanner/Scan", {
      params: formData,
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "image/jpg" })
    );
    var file = new File([res.data], `scanned-${Date.now()}.jpg`, {
      type: "image/jpeg",
      lastModified: new Date(),
      size: 10,
      endings: "transparent",
    });
    setBlobImage(url);
    setIsScanning(false);
    setFile(file);
  };
  return (
    <div>
      <div
        onClick={() => {
          showModal();
        }}
      >
        اسکن
      </div>
      <Modal
        style={{ top: 0 }}
        width={"100%"}
        footer={[]}
        visible={isModalOpen}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={scanDocument}>
          {devices.length > 0 ? (
            <div className="flex-parent">
              <ScannerOptionsComponent
                form={form}
                onScannedListener={onScannedListener}
                devices={devices}
                file={file}
                handleCancel={handleCancel}
              />
              <ShowDocumentScannedComponent
                isScanning={isScanning}
                blobImage={blobImage}
              />
            </div>
          ) : (
            <>
              <div className="page-cover">درحال دریافت اطلاعات...</div>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};
export default ScanDialog;
