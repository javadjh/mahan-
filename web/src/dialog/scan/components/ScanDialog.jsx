import React from "react";
import { Form, Modal } from "antd";
import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ScannerOptionsComponent from "./ScannerOptionsComponent";
import ShowDocumentScannedComponent from "./ShowDocumentScannedComponent";

const ScanDialog = ({ onScannedListener }) => {
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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const { data } = await axios.get(
      "http://87.236.215.49:8080/api/Scanner/GetDevices",
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
    setIsScanning(true);
    const res = await axios.get("http://87.236.215.49:8080/api/Scanner/Scan", {
      params: formData,
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "image/jpg" })
    );
    setBlobImage(url);
    setIsScanning(false);
    setFile(res.data);
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
        <Form onFinish={scanDocument}>
          {devices.length > 0 ? (
            <div className="flex-parent">
              <ScannerOptionsComponent
                onScannedListener={onScannedListener}
                devices={devices}
                file={file}
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
