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
import { Image, Modal } from "antd";
import {
  CenterStyled,
  CenterVerticalStyled,
  SpaceStyled,
} from "./styled/global";
import CustomText from "./styled/components/CustomText";
import { grayColor } from "./app/appColor";

const App = ({ location }) => {
  const [showUploadBlock, setShowUploadBlock] = useState(false);
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
      setShowUploadBlock(false);
    }, 500);

    setImages([]);
    setUploadedFile([]);
    setReloadDoc(Date.now());
  };
  return (
    <>
      {/* <Loading
        loading={loading}
        background={"rgba(255, 255, 255, 0.81)"}
        loaderColor="#3b5de7"
      /> */}
      <FileDrop
        onDragOver={() => {
          setShowUploadBlock(true);
        }}
        onFrameDragLeave={() => {
          setShowUploadBlock(false);
        }}
        onDrop={(files, e) => {
          if (canUpload) onImageChange(files);
        }}
      >
        <Modal width={"70%"} footer={null} visible={showUploadBlock}>
          <div>
            <div
              style={{
                minHeight: "70vh",
                borderRadius: 12,
                margin: 40,
                background: "rgba(230, 237, 241, 0.24)",
                border: "1.2px dashed #DDE6ED",
                borderRadius: 6,
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
                                src={"/assets/icons/paper.svg"}
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
                                <Image
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: 7,
                                  }}
                                  width={40}
                                  preview={false}
                                  src={"/assets/icons/check.svg"}
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
                              <Image
                                style={{
                                  borderRadius: 7,
                                }}
                                width={90}
                                height={90}
                                preview={false}
                                src={"/assets/icons/paper.svg"}
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
                  <div
                    style={{
                      width: "100%",
                      height: "70vh",
                    }}
                  >
                    <CenterVerticalStyled>
                      <CenterStyled>
                        <Image
                          src="/assets/icons/upload.svg"
                          width={100}
                          height={100}
                          preview={false}
                        />
                        <SpaceStyled top={20}>
                          <CenterStyled>
                            <CustomText color="black" size={17}>
                              فایل را اینجا رها کنید
                            </CustomText>
                            <CustomText color={grayColor} size={14}>
                              انتخاب فایل یا فایل را اینجا رها کنید
                            </CustomText>
                          </CenterStyled>
                        </SpaceStyled>
                      </CenterStyled>
                    </CenterVerticalStyled>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
        <PanelRootComponent />
      </FileDrop>
    </>
  );
};

export default App;
