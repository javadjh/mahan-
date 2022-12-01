import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { insertDocumentService } from "../../../service/DocumentService";
import { doneToast } from "../../../utility/ShowToast";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import CanvasDraw from "react-canvas-draw";
import { useHistory } from "react-router";
import { getImageDocumentService } from "../../../service/FileService";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentAction,
  getDocumentsAction,
} from "../../../stateManager/actions/DocumentAction";
import { saveAs } from "file-saver";
import useWindowDimensions from "../../../utility/useWindowDimensions";
import { RootContext } from "../../../RootComponent/RootContext";
import CustomSmallButton from "../../../styled/components/CustomSmallButton";
import { Col, Divider, Input, Row, Slider } from "antd";
import {
  borderColor,
  darkBlueOpacityColor,
  lightGreenColor,
} from "../../../app/appColor";
import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineRotateRight,
  AiOutlineRotateLeft,
} from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import { CenterStyled, SpaceStyled } from "../../../styled/global";
import { FileContext } from "../../../context/file/FileContext";

const ImageCropComponent = ({
  documentId,
  history,
  imageWidth,
  imageHeight,
  title,
  ex,
  documentSize,
}) => {
  const iconStyle = {
    fontSize: 25,
    color: borderColor,
    marginLeft: 10,
  };
  const { fileId } = useContext(FileContext);
  const { fileStatistic } = useContext(FileContext);
  history = useHistory();
  const dispatch = useDispatch();
  const { width: widthWindowDimensions } = useWindowDimensions();
  const versions = useSelector((state) => state.document.versions);
  const [userProfilePic, setUserProfilePic] = useState("");
  const [editor, setEditor] = useState(null);
  const [loadableCanvas, setLoadableCanvas] = useState(null);
  const [scaleValue, setScaleValue] = useState(1);
  const [wZoom, setWZoom] = useState(1);
  const [hZoom, setHZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [width, setWidth] = useState(
    imageWidth > widthWindowDimensions - 350
      ? widthWindowDimensions - 350
      : imageWidth
  );
  const [height, setHeight] = useState(imageHeight);
  const [openCropper, setOpenCropper] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [urlAddress, setUrlAddress] = useState();
  const [lastVersion, setLastVersion] = useState({});
  const [singleVersion, setSingleVersion] = useState({});
  const [init, setInit] = useState(true);
  const [fileData, setFileData] = useState();
  const [, setReload] = useState();

  useEffect(() => {
    setSelectedImage(null);
    setEditorRef.value = null;
    setEditorRef(null);
    if (documentId) {
      if (singleVersion._id) {
        getFileForEditor(singleVersion._id);
        setWidth(
          singleVersion.imageWidth > widthWindowDimensions - 350
            ? widthWindowDimensions - 350
            : singleVersion.imageWidth
        );
        setHeight(singleVersion.imageHeight);
        setReload(Date.now);
      } else {
        if (init) {
          if (versions.length > 0) {
            let version = versions[0];
            getFileForEditor(version._id);
            setWidth(
              version.imageWidth > widthWindowDimensions - 350
                ? widthWindowDimensions - 350
                : version.imageWidth
            );
            setHeight(version.imageHeight);
            setReload(Date.now);
          } else {
            getFileForEditor();
            setWidth(
              imageWidth > widthWindowDimensions - 350
                ? widthWindowDimensions - 350
                : imageWidth
            );
            setHeight(imageHeight);
          }
        } else {
          getFileForEditor(singleVersion._id);
          setWidth(
            imageWidth > widthWindowDimensions - 350
              ? widthWindowDimensions - 350
              : imageWidth
          );
          setHeight(imageHeight);
          setReload(Date.now);
        }
      }
    }
  }, [documentId, lastVersion, versions]);

  const getFileForEditor = async (id = undefined) => {
    console.log(id ? "id" : "documentId");
    const { data, status } = await getImageDocumentService(
      id ? id : documentId
    );
    if (status === 200) {
      var file = new File([data], `${title}.${ex}`, {
        type: "image/jpeg",
        lastModified: new Date(),
        size: 10,
        endings: "transparent",
      });
      console.log("filefilefile");
      setFileData(file);
      // this.setState({ openCropper: true, selectedImage: file, fileUploadErrors: [] });
      setOpenCropper(true);
      setSelectedImage(file);
      setWZoom(1);
      setHZoom(1);
      setRotate(0);
      setScale(1.0);
    }
  };

  const setEditorRef = (editor) => setEditor(editor);
  const loadableCanvasRef = (canvas) => setLoadableCanvas(canvas);
  const onCrop = async () => {
    console.log(editor);
    //const { editor } = this.state;
    // if (editor !== null) {
    const url = editor.getImageScaledToCanvas().toDataURL();
    setUrlAddress(url);
    console.log(url);
    setUserProfilePic(url);
    var blob = dataURItoBlob(url);
    var file = new File([blob], `${title}.${ex}`);
    const fileData = new FormData();
    fileData.append("file", file);

    const { data, status } = await insertDocumentService(
      fileStatistic.file.archiveId,
      fileId,
      "uiId",
      fileData,
      documentId
    );
    if (status === 200) {
      doneToast("ثبت شد");
      await dispatch(getDocumentAction(documentId));
      await dispatch(
        getDocumentsAction({
          fileId: fileId,
          searchValue: "",
          pageId: 1,
          eachPerPage: 12,
        })
      );
    }

    // }
  };
  const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(",")[1]);

    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleScale = (e) => {
    setScale(e);
  };

  const downloadFileData = () => {
    saveAs(fileData, title);
  };
  return (
    <div className="App">
      {versions.map((v) => (
        <>
          <CustomSmallButton
            onClick={() => {
              setInit(false);
              setLastVersion(v);
              setSingleVersion(v);
            }}
            className={"btn btn-dark m-2"}
          >
            <span>ورژن {v.version} - </span>
            <b dir={"ltr"}>
              ({v.documentSize}) - توسط : {v.creator.firstName}{" "}
              {v.creator.lastName}
            </b>
          </CustomSmallButton>
        </>
      ))}
      <CustomSmallButton
        onClick={() => {
          setInit(false);
          setLastVersion({});
          setSingleVersion({});
        }}
        className={"btn btn-dark m-2"}
      >
        <span>ورژن 1 - </span>
        <b dir={"ltr"}>({documentSize})</b>
      </CustomSmallButton>

      <Divider />
      <>
        <div
          className={"pt-1 px-2"}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Row align="middle">
            {/*<input type="file" name="profilePicBtn" accept="image/png, image/jpeg" onChange={this.profilePicChange} />*/}
            <Col>
              <div
                onClick={() => {
                  setWZoom(wZoom + 1);
                  setHZoom(hZoom + 2);
                }}
              >
                <AiOutlineZoomIn style={iconStyle} />
              </div>
            </Col>
            <Col>
              <div>
                <AiOutlineZoomOut
                  style={iconStyle}
                  onClick={() => {
                    setWZoom(wZoom - 1);
                    setHZoom(hZoom - 2);
                  }}
                />
              </div>
            </Col>
            <Col>
              <div
                onClick={() => {
                  setRotate(rotate + 1);
                }}
              >
                <AiOutlineRotateRight style={iconStyle} />
              </div>
            </Col>
            <Col>
              <div
                onClick={() => {
                  setRotate(rotate - 1);
                }}
              >
                <AiOutlineRotateLeft style={iconStyle} />
              </div>
            </Col>
            <Col>
              <span
                style={{
                  border: "2px solid " + borderColor,
                  borderRadius: 7,
                  paddingTop: 2,
                  paddingRight: 6,
                  marginLeft: 10,
                  paddingLeft: 6,
                  marginTop: 6,
                  marginBottom: 5,
                }}
                onClick={() => {
                  setRotate(rotate + 90);
                }}
              >
                90
              </span>
            </Col>
            <Col>
              <span
                style={{
                  border: "2px solid " + borderColor,
                  borderRadius: 7,
                  paddingTop: 2,
                  paddingRight: 6,
                  marginLeft: 10,
                  paddingLeft: 6,
                  marginTop: 6,
                  marginBottom: 5,
                }}
                onClick={() => {
                  setRotate(rotate + 180);
                }}
              >
                180
              </span>
            </Col>

            <Col>
              <Row align="middle">
                <Col>
                  <SpaceStyled horizontal={10}>
                    <span className={"mt-2 mx-1"}>طول</span>
                  </SpaceStyled>
                </Col>
                <Col>
                  <Input
                    className="form-control mr-3"
                    type={"number"}
                    style={{ width: 120 }}
                    value={width}
                    onChange={(e) => {
                      setWidth(Number(e.target.value));
                    }}
                  />
                </Col>
              </Row>
            </Col>

            <Col>
              <Row align="middle">
                <Col>
                  <SpaceStyled horizontal={10}>
                    <span className={"mt-2 mx-1"}>عرض</span>
                  </SpaceStyled>
                </Col>
                <Col>
                  <Input
                    value={height}
                    type={"number"}
                    style={{ width: 120 }}
                    onChange={(e) => {
                      setHeight(Number(e.target.value));
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row align="middle">
            <Col>
              <FiDownloadCloud
                style={{ ...iconStyle, ...{ color: lightGreenColor } }}
                onClick={downloadFileData}
              />
            </Col>
            <Col>
              <CustomSmallButton onClick={onCrop}>ذخیره سازی</CustomSmallButton>
            </Col>
          </Row>
        </div>
        {/* <input
          className={"m-2"}
          name="scale"
          type="range"
          onChange={handleScale}
          min={"1"}
          style={{ width: "99%" }}
          max="30"
          step="0.01"
          defaultValue="1.1"
        /> */}
        <Slider
          min={1}
          max={30}
          style={{ width: "99%" }}
          onChange={(e) => {
            handleScale(e);
          }}
          step="0.01"
          defaultValue="1.1"
        />
        <div style={{ width: "680px !important" }}>
          <CenterStyled>
            <AvatarEditor
              image={selectedImage}
              scale={scale}
              ref={setEditorRef}
              width={width}
              height={height}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              rotate={rotate}
            />
          </CenterStyled>
        </div>
      </>
    </div>
  );
};

export default ImageCropComponent;
