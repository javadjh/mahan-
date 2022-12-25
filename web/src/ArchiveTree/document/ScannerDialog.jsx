import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  addNewNoteForDocumentService,
  insertDocumentService,
} from "../../service/DocumentService";
import { doneToast } from "../../utility/ShowToast";
import { addNewNoteForDocumentAction } from "../../stateManager/actions/DocumentAction";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FRONT_IP } from "../../config/ip";

const ScannerDialog = ({ history, getDocData }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [note, setNote] = useState("");
  const [file, setFile] = useState();
  const [scannerName, setScannerName] = useState("");
  useEffect(() => {
    if (isScanning) {
      startScanning();
    }
  }, [isScanning]);

  const getData = async () => {
    try {
      const res = await fetch(
        "http://localhost:2000/scanner/getfirstscannerdevice"
      );
      if (res.ok) {
        res.json().then((json) => {
          setScannerName(json.Name);
        });
      }
    } catch (err) {}
  };

  const startScanning = async () => {
    setIsScanning(true);
    setIsScanned(false);
    const res = await fetch("http://localhost:8080/api/Scanner/GetDevices", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "access-control-allow-headers": "*",
        "access-control-allow-methods":
          "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
        "access-control-allow-origin": "*",
        "access-control-expose-headers": "*",
      },
    });
    const imageBlob = await res.blob();

    let blobsFile = new File([imageBlob], "scanned-file-" + uuidv4() + ".png");
    setFile(blobsFile);

    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
    setIsScanning(false);
    setIsScanned(true);
  };

  const sendData = async () => {
    const fileData = new FormData();
    fileData.append("file", file);
    const { data, status } = await insertDocumentService(
      history.location.state.archiveId,
      history.location.state.fileId,
      "uiId",
      fileData,
      undefined
    );
    if (status === 200) {
      if (note.length > 0) {
        await dispatch(
          addNewNoteForDocumentAction(
            {
              documentId: data._id,
              description: note,
            },
            history.location.state.fileId
          )
        );
      }
      doneToast("با موفقیت ثبت شد");
      await getDocData();
      window.$("#scannerDialog").modal("hide");
    }
  };
  return (
    <Fragment>
      <div
        className="modal fade bs-example-modal-xl"
        id="scannerDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content p-4">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  className={"btn btn-primary "}
                  onClick={() => {
                    setIsScanning(true);
                  }}
                >
                  شروع اسکن ({scannerName})
                </button>
                <button
                  hidden={!isScanned}
                  className={"btn btn-success "}
                  onClick={() => {
                    sendData();
                  }}
                >
                  ثبت سند
                </button>
              </div>
              <br />
              <label></label>
              <div hidden={!isScanned} className={"mt-2 row"}>
                <div className={" col-lg-4"}>
                  <textarea
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                    hidden={!isScanned}
                    rows={4}
                    className={"form-control"}
                    placeholder={"یادداشت را وارد کنید..."}
                  />
                </div>
                <img src={image} className={"col-lg-8 "} />
              </div>
              <div
                hidden={!isScanning}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ borderRadius: 50 }}
                  src={FRONT_IP + "/assets/images/scanning.gif"}
                  className={"col-lg-5 mt-2"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ScannerDialog;
