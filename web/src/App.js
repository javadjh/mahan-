import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PanelRootComponent from "./RootComponent/PanelRootComponent";
import { FileDrop } from "react-file-drop";
import { insertDocumentService } from "./service/DocumentService";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
// import Loading from "react-fullscreen-loading";
import { getLibraryAction } from "./stateManager/actions/LibraryAction";
import RootContextProvider from "./RootComponent/RootContextProvider";
import { RootContext } from "./RootComponent/RootContext";
import { useCookies } from "react-cookie";
import { doneToast } from "./utility/ShowToast";
import ResetPasswordDialog from "./dialog/ResetPasswordDialog";
import AppSettingDialog from "./dialog/AppSettingDialog";
import UserProfileDialog from "./Profile/UserProfileDialog";
import PdfPreviewComponent from "./dialog/PdfPreviewComponent";

const App = ({ location }) => {
  location = useLocation();
  const {
    libraryShelfContext,
    setReload,
    fileId,
    setFileId,
    setArchiveId,
    archiveId,
    setReloadDoc,
  } = useContext(RootContext);
  const [images, setImages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [canUpload, setCanUpload] = useState(true);

  useEffect(() => {
    if (!location.pathname.includes("/upsert-document")) {
      setFileId(null);
      setArchiveId(null);
    }
  }, [location.pathname]);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const onImageChange = async (files) => {
    let copyImages = [...images];
    for (let i = 0; i < files.length; i++) {
      let type = files[i].type;
      let name = files[i].name;
      copyImages.push({
        uiId: uuidv4(),
        title: name,
        type,
        uploaded: false,
      });
    }
    setImages(copyImages);
    let imageState = copyImages;
    for (let i = 0; i < files.length; i++) {
      setCanUpload(false);
      const file = new FormData();
      file.append("file", files[i]);
      console.log(
        "fileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileIdfileId"
      );
      console.log(fileId);
      const { data, status } = await insertDocumentService(
        archiveId,
        fileId,
        copyImages[i].uiId,
        file,
        null,
        libraryShelfContext._id ? libraryShelfContext._id : null
      );
      setReload(uuidv4());
      if (status === 200) {
        imageState = imageState.filter((item) => item.uiId !== data.uiId);
        setImages(imageState);
        setUploadedFile((oldArray) => [...oldArray, data]);
      }
    }
    setCanUpload(true);
    await dispatch(getLibraryAction());
    setTimeout(() => {
      window.$("#uploadFileDialog").modal("hide");
    }, 500);

    setImages([]);
    setUploadedFile([]);
    setReloadDoc(Date.now());
  };
  return (
    <>
      {/*  */}

      {/*  */}

      {/* <Loading
        loading={loading}
        background={"rgba(255, 255, 255, 0.81)"}
        loaderColor="#3b5de7"
      /> */}
      {/* <FileDrop
        onDragOver={() => {
          window.$("#uploadFileDialog").modal("show");
        }}
        onFrameDragLeave={() => {
          window.$("#uploadFileDialog").modal("hide");
        }}
        onDrop={(files, e) => {
          if (canUpload) onImageChange(files);
        }}
      >
        <div
          className="modal fade "
          id="uploadFileDialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content p-4">
              <div>
                <div
                  style={{
                    minHeight: "70vh",
                    backgroundColor: "#f3f3f3",
                    border: "4px dashed rgba(144,144,144,0.38)",
                    borderRadius: 12,
                  }}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    {images.length > 0 || uploadedFile.length > 0 ? (
                      <>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <>
                            {uploadedFile.map((u) => (
                              <>
                                <span
                                  style={{
                                    flexWrap: "wrap",
                                    width: 100,
                                    height: 100,
                                    marginTop: 5,
                                    marginBottom: 30,
                                    marginRight: 5,
                                    marginLeft: 5,
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    padding: 5,
                                    borderRadius: 10,
                                    position: "relative",
                                  }}
                                >
                                  <img
                                    style={{
                                      objectFit: "cover",
                                      borderRadius: 7,
                                      zIndex: -1,
                                      opacity: "0.5",
                                    }}
                                    width={90}
                                    height={90}
                                    src={
                                      "http://localhost:3000/assets/images/paper.png"
                                    }
                                  />
                                  <p
                                    style={{ width: 100 }}
                                    className={"text-center"}
                                  >
                                    <span data-tip={u.title}>
                                      {u.title.substr(0, 10)}
                                    </span>
                                    <ReactTooltip />
                                  </p>
                                  <span
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                  >
                                    <i
                                      className="mdi mdi-checkbox-marked-circle"
                                      style={{ fontSize: 40, color: "green" }}
                                    />
                                  </span>
                                </span>
                              </>
                            ))}
                            {images.map((i, index) => (
                              <>
                                <span
                                  style={{
                                    flexWrap: "wrap",
                                    width: 100,
                                    height: 100,
                                    marginTop: 5,
                                    marginBottom: 30,
                                    marginRight: 5,
                                    marginLeft: 5,
                                    padding: 5,
                                    borderRadius: 10,
                                    position: "relative",
                                  }}
                                >
                                  <img
                                    style={{
                                      objectFit: "cover",
                                      borderRadius: 7,
                                    }}
                                    width={90}
                                    height={90}
                                    src={
                                      "http://localhost:3000/assets/images/paper.png"
                                    }
                                  />
                                  <p
                                    style={{ width: 100 }}
                                    className={"text-center"}
                                  >
                                    <span data-tip={i.title}>
                                      {i.title.substr(0, 10)}
                                    </span>
                                    <ReactTooltip />
                                  </p>
                                  {index === 0 ? (
                                    <span
                                      style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                      }}
                                    >
                                      <div className="lds-roller">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                      </div>
                                    </span>
                                  ) : null}
                                </span>
                              </>
                            ))}
                          </>
                        </div>
                      </>
                    ) : (
                      <h4
                        style={{
                          width: "100%",
                          height: "100%",
                          marginTop: "25%",
                          color: "rgba(144,144,144,0.38)",
                        }}
                        className={"text-center"}
                      >
                        فایل را در این قسمت رها کنید
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PanelRootComponent />
      </FileDrop> */}
      <PanelRootComponent />
    </>
  );
};

export default App;
