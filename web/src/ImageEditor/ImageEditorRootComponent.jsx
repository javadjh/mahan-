import React from "react";
import { useDispatch } from "react-redux";

import "./imageEdit.css";
import { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ImEyedropper } from "react-icons/im";
import { GiPaintBrush } from "react-icons/gi";
import { RiZoomInLine, RiText } from "react-icons/ri";
import { BiCrop } from "react-icons/bi";
import { addNewNoteForDocumentAction } from "../stateManager/actions/DocumentAction";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import panzoom from "panzoom";
import { EyeDropper, OnChangeEyedrop, useEyeDrop } from "react-eyedrop";
import {
  addNewNoteForDocumentService,
  insertDocumentService,
} from "../service/DocumentService";
import { errorToast } from "../utility/ShowToast";
import { getImageDocumentService } from "../service/FileService";
const ImageEditorRootComponent = ({ history, match }) => {
  let id = match?.params?.fileId;
  let lastdocument = match?.params?.lastdocument;
  useEffect(() => {
    if (match?.params?.fileId) {
      id = match?.params?.fileId;
      getFileForEditor();
    }
  }, [match?.params]);

  const getFileForEditor = async () => {
    console.log(id ? "id" : "documentId");
    const { data, status } = await getImageDocumentService(lastdocument);
    if (status === 200) {
      var file = new File([data], `sdcsdcsdc.jpg`, {
        type: "image/jpeg",
        lastModified: new Date(),
        size: 10,
        endings: "transparent",
      });
      console.log("filefilefile");
      const url = URL.createObjectURL(file);
      setSrc(url);

      undoSrc.splice(0); // clears the array
      undoSrc.push(url);
      image.src = url;
      image.onload = () => {
        setIsImageUploaded(true);
        drawImageToCanvas(url);
      };
    }
  };

  const dispatch = useDispatch();
  const [fileName, setFileName] = useState();
  const [note, setNote] = useState();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const image = new Image();
  const [itemButtonStyles, setItemButtonStyles] = useState([
    "editor-item-button-checked",
    "editor-item-button",
    "editor-item-button",
    "editor-item-button",
    "editor-item-button",
    "editor-item-button",
  ]);
  const [selectedTool, setSelectedTool] = useState(0);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isTexting, setIsTexting] = useState(false);
  const [userFontSize, setUserFontSize] = useState(15);
  const [userFontFamily, setUserFontFamily] = useState("Arial");
  const [userlineWidth, setUserlineWidth] = useState(15);
  const [userText, setUserText] = useState({ text: "", x: 0, y: 0 });
  const [userCrop, setUserCrop] = useState({
    initX: 0,
    initY: 0,
    destX: 0,
    destY: 0,
  });
  const [scaleFacteorX, setScaleFactorX] = useState(1);
  const [scaleFacteorY, setScaleFactorY] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [src, setSrc] = useState(null);
  const [zoomableCanvas, setZoomableCanvas] = useState(null);

  const [undoSrc, setUndoSrc] = useState([]);
  const [redoSrc, setRedoSrc] = useState([]);

  const [eyedropOnce, setEyedropOnce] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.width = 600;
    canvas.style.height = 600;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = selectedColor;
    context.lineWidth = userlineWidth;
    contextRef.current = context;
  }, []);

  const selectItem = (e) => {
    const itemId = parseInt(e.target.id);
    setSelectedTool(itemId);

    for (let i = 0; i < itemButtonStyles.length; i++) {
      if (itemId == i) {
        let tempStyles = itemButtonStyles;
        tempStyles[i] = "editor-item-button-checked";
        setItemButtonStyles(tempStyles);
      } else {
        let tempStyles = itemButtonStyles;
        tempStyles[i] = "editor-item-button";
        setItemButtonStyles(tempStyles);
      }
    }

    if (itemId == 1) {
      setZoomableCanvas(panzoom(canvasRef.current));
    } else {
      if (selectedTool == 1) {
        zoomableCanvas.dispose();
      }
    }
    if (itemId == 2) {
      const base64Image = canvasRef.current.toDataURL("image/jpeg");
      setSrc(base64Image);
    }
    if (selectedTool == 2) {
      image.src = src;
      image.onload = () => {
        drawImageToCanvas();
      };
    }
  };

  const eyedropperColor = ({ rgb, hex }) => {
    setEyedropOnce(!eyedropOnce);
    setSelectedColor(hex);
    contextRef.current.strokeStyle = hex;
    contextRef.current.fillStyle = hex;
  };

  const selectColor = (e) => {
    setSelectedColor(e.target.id);
    contextRef.current.strokeStyle = e.target.id;
    contextRef.current.fillStyle = e.target.id;
  };

  const drawImageToCanvas = (url) => {
    canvasRef.current.width = image.width;
    canvasRef.current.height = image.height;
    canvasRef.current.style.width = image.width;
    canvasRef.current.style.height = image.height;
    setScaleFactorX(
      image.naturalWidth / document.getElementById("canvas").clientWidth
    );
    setScaleFactorY(
      image.naturalHeight / document.getElementById("canvas").clientHeight
    );
    contextRef.current.strokeStyle = selectedColor;
    contextRef.current.fillStyle = selectedColor;
    contextRef.current.drawImage(
      image,
      image.x,
      image.y,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height
    );
  };

  const uploadImage = (e) => {
    if (e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSrc(url);

    undoSrc.splice(0); // clears the array
    undoSrc.push(url);
    image.src = url;
    image.onload = () => {
      setIsImageUploaded(true);
      drawImageToCanvas(url);
    };
  };

  const SaveChanges = () => {
    const base64Image = canvasRef.current.toDataURL("image/jpeg");
    undoSrc.push(base64Image);
  };

  const UndoChanges = () => {
    if (undoSrc.length == 1) {
      return;
    }

    redoSrc.push(undoSrc.pop());
    image.src = undoSrc[undoSrc.length - 1];
    image.onload = () => {
      drawImageToCanvas();
    };
  };

  const RedoChanges = () => {
    if (redoSrc.length == 0) {
      return;
    }

    image.src = redoSrc[redoSrc.length - 1];
    image.onload = () => {
      drawImageToCanvas();
    };
    undoSrc.push(redoSrc.pop());
  };

  const writeText = (e) => {
    if (selectedTool == 3) {
      let updatedValue = {};
      if (e.keyCode == 16) {
        // Shift Key is pressed
        return;
      } else if (e.keyCode == 17) {
        // Ctrl Key is pressed
        return;
      } else if (e.keyCode == 18) {
        // Alt Key is pressed
        return;
      } else if (e.keyCode == 8) {
        // Backspace Key is pressed
        updatedValue = {
          text: userText.text.slice(0, -1),
          x: userText.x,
          y: userText.y,
        };
        setUserText((userText) => ({ ...userText, ...updatedValue }));

        image.src = src;
        image.onload = () => {
          drawImageToCanvas();
          contextRef.current.strokeStyle = selectedColor;
          contextRef.current.fillStyle = selectedColor;
          contextRef.current.beginPath();
          contextRef.current.font = userFontSize + "px " + userFontFamily;
          contextRef.current.textAlign = "left";
          contextRef.current.textBaseline = "top";
          contextRef.current.fillText(
            updatedValue.text,
            userText.x,
            userText.y
          );
          contextRef.current.stroke();
        };
      } else {
        // Other keys are pressed
        updatedValue = {
          text: userText.text + e.key,
          x: userText.x,
          y: userText.y,
        };
        setUserText((userText) => ({ ...userText, ...updatedValue }));

        image.src = src;
        image.onload = () => {
          drawImageToCanvas();
          contextRef.current.strokeStyle = selectedColor;
          contextRef.current.fillStyle = selectedColor;
          contextRef.current.beginPath();
          contextRef.current.font = userFontSize + "px " + userFontFamily;
          contextRef.current.textAlign = "left";
          contextRef.current.textBaseline = "top";
          contextRef.current.fillText(
            updatedValue.text,
            userText.x,
            userText.y
          );
          contextRef.current.stroke();
        };
      }
    }
  };

  const HandleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!isImageUploaded) {
      return;
    }

    if (selectedTool == 0) {
      contextRef.current.lineWidth = userlineWidth;
      contextRef.current.beginPath();
      contextRef.current.moveTo(
        offsetX * scaleFacteorX,
        offsetY * scaleFacteorY
      );
      setIsDrawing(true);
      redoSrc.splice(0);
    } else if (selectedTool == 2) {
      let updatedValue = {};
      updatedValue = {
        initX: offsetX * scaleFacteorX,
        initY: offsetY * scaleFacteorY,
        destX: offsetX * scaleFacteorX,
        destY: offsetY * scaleFacteorY,
      };
      setUserCrop((userCrop) => ({ ...userCrop, ...updatedValue }));
      setIsCropping(true);
    } else if (selectedTool == 3) {
      if (
        offsetX * scaleFacteorX > userText.x &&
        offsetX * scaleFacteorX < userText.x + 50 * scaleFacteorX
      ) {
        setIsTexting(true);
        return;
      }
      let updatedValue = {};
      updatedValue = {
        text: "",
        x: offsetX * scaleFacteorX,
        y: offsetY * scaleFacteorY,
      };
      setUserText((userText) => ({ ...userText, ...updatedValue }));

      const base64Image = canvasRef.current.toDataURL("image/jpeg");
      setSrc(base64Image);
    }
  };

  const HandleMouseUp = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (selectedTool == 0) {
      contextRef.current.closePath();
      const base64Image = canvasRef.current.toDataURL("image/jpeg");
      setSrc(base64Image);
      setIsDrawing(false);
      SaveChanges();
    } else if (selectedTool == 2) {
      let updatedValue = {};
      updatedValue = {
        initX: userCrop.initX,
        initY: userCrop.initY,
        destX: offsetX * scaleFacteorX,
        destY: offsetY * scaleFacteorY,
      };
      setUserCrop((userCrop) => ({ ...userCrop, ...updatedValue }));
      setIsCropping(false);
    } else if (selectedTool == 3) {
      setIsTexting(false);
      SaveChanges();
    }
  };

  const HandleMouseMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (selectedTool == 0) {
      if (!isDrawing) {
        return;
      }
      contextRef.current.lineTo(
        offsetX * scaleFacteorX,
        offsetY * scaleFacteorY
      );
      contextRef.current.stroke();
    } else if (selectedTool == 2) {
      if (!isCropping) {
        return;
      }
      image.src = src;
      image.onload = () => {
        drawImageToCanvas();
        contextRef.current.strokeStyle = selectedColor;
        contextRef.current.fillStyle = selectedColor;
        contextRef.current.beginPath();
        contextRef.current.rect(
          userCrop.initX,
          userCrop.initY,
          offsetX * scaleFacteorX - userCrop.initX,
          offsetY * scaleFacteorY - userCrop.initY
        );
        contextRef.current.stroke();
      };
    } else if (selectedTool == 3) {
      if (!isTexting) {
        return;
      }
      let updatedValue = {};
      updatedValue = {
        text: userText.text,
        x: offsetX * scaleFacteorX,
        y: offsetY * scaleFacteorY,
      };
      setUserText((userText) => ({ ...userText, ...updatedValue }));

      image.src = src;
      drawImageToCanvas();
      contextRef.current.strokeStyle = selectedColor;
      contextRef.current.fillStyle = selectedColor;
      contextRef.current.beginPath();
      contextRef.current.font = userFontSize + "px " + userFontFamily;
      contextRef.current.textAlign = "left";
      contextRef.current.textBaseline = "top";
      contextRef.current.fillText(userText.text, userText.x, userText.y);
      contextRef.current.stroke();
    }
  };

  const cropImageNow = () => {
    // const canvas = document.createElement('canvas');
    canvasRef.current.width = Math.abs(userCrop.destX - userCrop.initX);
    canvasRef.current.height = Math.abs(userCrop.destY - userCrop.initY);
    canvasRef.current.style.width = Math.abs(userCrop.destX - userCrop.initX);
    canvasRef.current.style.height = Math.abs(userCrop.destY - userCrop.initY);

    image.src = src;
    image.onload = () => {
      contextRef.current.drawImage(
        image,
        userCrop.initX < userCrop.destX ? userCrop.initX : userCrop.destX,
        userCrop.initY < userCrop.destY ? userCrop.initY : userCrop.destY,
        Math.abs(userCrop.destX - userCrop.initX),
        Math.abs(userCrop.destY - userCrop.initY),
        0,
        0,
        Math.abs(userCrop.destX - userCrop.initX),
        Math.abs(userCrop.destY - userCrop.initY)
      );
      setScaleFactorX(1);
      setScaleFactorY(1);

      SaveChanges();
      const base64Image = canvasRef.current.toDataURL("image/jpeg");
      setSrc(base64Image);
    };
  };

  const ButtonC = ({ onClick }) => {
    return (
      <div>
        <button
          className="d-none"
          style={{ backgroundColor: selectedColor }}
          onClick={onClick}
        >
          <ImEyedropper
            style={{
              display: "flex",
              marginLeft: "10px",
              marginTop: "14px",
              fontSize: "20px",
            }}
          />
        </button>
      </div>
    );
  };

  const downloadImage = async () => {
    if (fileName?.length <= 1) {
      errorToast("نام سند را وارد کنید");
    }
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "CanvasAsImage.png");
    canvasRef.current.toBlob(async function (blob) {
      let file = new File([blob], fileName + ".jpg");

      const fileData = new FormData();
      fileData.append("file", file);
      if (id) {
        const { data, status } = await insertDocumentService(
          localStorage.getItem("archive"),
          localStorage.getItem("file"),
          "uiIjlknjkd",
          fileData,
          id
        );
        history.goBack();
      } else {
        const { data, status } = await insertDocumentService(
          localStorage.getItem("archive"),
          localStorage.getItem("file"),
          "uiId",
          fileData,
          null,
          null
        );
        if (note?.length > 2) {
          await dispatch(
            addNewNoteForDocumentAction(
              {
                documentId: data._id,
                description: note,
              },
              localStorage.getItem("file")
            )
          );
          history.goBack();
        }
      }
    });
  };

  return (
    <div className="App">
      <div className="editor-editor-container">
        <div className="editor-editor-toolbar">
          <div>
            <div className="editor-toolbar-item">
              <label htmlFor="imgaeupload" className="btn btn-primary">
                انتخاب تصویر
              </label>
              <input
                hidden={true}
                type="file"
                id="imgaeupload"
                name={"imgaeupload"}
                onChange={(e) => uploadImage(e)}
              ></input>
            </div>
          </div>
          <div onClick={(e) => selectItem(e)}>
            <div className="editor-toolbar-item">
              <label className={itemButtonStyles[0]} id="0">
                <GiPaintBrush style={{ fontSize: "50px" }} />.
              </label>
            </div>
          </div>
          <div onClick={(e) => selectItem(e)}>
            <div className="editor-toolbar-item">
              <label className={itemButtonStyles[1]} id="1">
                <RiZoomInLine style={{ fontSize: "50px" }} />.
              </label>
            </div>
          </div>
          <div onClick={(e) => selectItem(e)}>
            <div className="editor-toolbar-item">
              <label className={itemButtonStyles[2]} id="2">
                <BiCrop style={{ fontSize: "50px" }} />.
              </label>
            </div>
          </div>
          <div onClick={(e) => selectItem(e)}>
            <div className="editor-toolbar-item">
              <label className={itemButtonStyles[3]} id="3">
                <RiText style={{ fontSize: "50px" }} />.
              </label>
            </div>
          </div>
          <div>
            <div className="editor-d-flex">
              <div className="editor-toolbar-item">
                <label
                  className={itemButtonStyles[4]}
                  id="4"
                  onClick={(e) => UndoChanges(e)}
                >
                  <FaUndo style={{ fontSize: "50px" }} />.
                </label>
              </div>
              <div className="editor-toolbar-item">
                <label
                  className={itemButtonStyles[5]}
                  id="5"
                  onClick={(e) => RedoChanges(e)}
                >
                  <FaRedo style={{ fontSize: "50px" }} />.
                </label>
              </div>
            </div>
          </div>
          <div className="mx-4 ">
            <div className="row ">
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                className="form-control col-lg-12 mb-2"
                placeholder="یادداشت را وارد کنید(اختیاری)"
              />
              <input
                placeholder="نام سند را وارد کنید"
                value={fileName}
                onChange={(e) => {
                  setFileName(e.target.value);
                }}
                className="form-control col-lg-8"
              />
              <button
                className="btn btn-success col-lg-4"
                type="file"
                style={{ width: "100%" }}
                id="imageFileOutput"
                onClick={(e) => downloadImage(e)}
              >
                ثبت سند
              </button>
            </div>
          </div>
        </div>

        <div className="editor-editor-image" id="gggg">
          <canvas
            tabIndex={0}
            ref={canvasRef}
            id="canvas"
            width={0}
            height={0}
            onMouseDown={HandleMouseDown}
            onMouseUp={HandleMouseUp}
            onMouseMove={HandleMouseMove}
            onKeyDown={writeText}
          ></canvas>
        </div>

        <div className="editor-item-accessories">
          {(selectedTool == 0 || selectedTool == 2 || selectedTool == 3) && (
            <div className="editor-brush-colors-container">
              <div
                className="editor-brush-black"
                id="black"
                onClick={(e) => selectColor(e)}
              ></div>
              <div
                className="editor-brush-gray"
                id="gray"
                onClick={(e) => selectColor(e)}
              ></div>
              <div
                className="editor-brush-red"
                id="red"
                onClick={(e) => selectColor(e)}
              ></div>
              <div
                className="editor-brush-orange"
                id="orange"
                onClick={(e) => selectColor(e)}
              ></div>
              <div
                className="editor-brush-yellow"
                id="yellow"
                onClick={(e) => selectColor(e)}
              ></div>
              <div
                className="editor-brush-green"
                id="green"
                onClick={(e) => selectColor(e)}
              ></div>
              <div
                className="editor-brush-blue"
                id="blue"
                onClick={(e) => selectColor(e)}
              ></div>
              <div
                className="editor-brush-purple"
                id="purple"
                onClick={(e) => selectColor(e)}
              ></div>
              <EyeDropper
                wrapperClasses="brush-purple"
                customComponent={ButtonC}
                once={eyedropOnce}
                onChange={eyedropperColor}
              ></EyeDropper>
            </div>
          )}
          {selectedTool == 1 && (
            <div className="editor-text-tools-container">
              {/* <input type="range"></input> */}
            </div>
          )}
          {selectedTool == 2 && (
            <div className="editor-text-tools-container">
              <button onClick={cropImageNow}>Crop Image</button>
            </div>
          )}
          {selectedTool == 0 && (
            <div className="editor-brush-colors-container">
              <select
                style={{ width: "50px", height: "50px" }}
                value={userlineWidth}
                onChange={(e) => setUserlineWidth(e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>
          )}
          {selectedTool == 3 && (
            <div className="editor-brush-colors-container">
              <select
                style={{ width: "50px", height: "50px" }}
                value={userFontSize}
                onChange={(e) => setUserFontSize(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
                <option value="45">45</option>
                <option value="50">50</option>
              </select>
              <select
                style={{ width: "50px", height: "50px" }}
                value={userFontFamily}
                onChange={(e) => setUserFontFamily(e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Helvetica">Helvetica</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageEditorRootComponent;
