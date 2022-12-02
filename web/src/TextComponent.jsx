import React, { useRef, useState } from "react";
import MainLayout from "./RootComponent/MainLayout";
import CanvasDraw from "react-canvas-draw";
const TextComponent = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState();
  let [testState, setTestState] = useState();
  const test = () => {
    const width = canvasRef.current.props.canvasWidth;
    const height = canvasRef.current.props.canvasHeight;
    const background = canvasRef.current.canvasContainer.children[3];
    const drawing = canvasRef.current.canvasContainer.children[1];

    var sourceCanvas = document.getElementsByTagName("canvas")[1];

    var destinationCanvas = document.createElement("canvas");
    destinationCanvas.height = sourceCanvas.height;
    destinationCanvas.width = sourceCanvas.width;

    var destinationContext = destinationCanvas.getContext("2d");

    destinationContext.globalCompositeOperation = "destination-over";
    destinationContext.fillRect(
      0,
      0,
      destinationCanvas.width,
      destinationCanvas.height
    );
    destinationContext.drawImage(background);

    var image = destinationCanvas.toDataURL("image/png");

    setDrawing(image);
    return image;
  };
  return (
    <MainLayout isMain={true} title={"تست"}>
      <button onClick={test}>test</button>
      <CanvasDraw
        ref={canvasRef}
        width={"100%"}
        imgSrc={
          "https://biology.ucdavis.edu/sites/g/files/dgvnsk12066/files/styles/sf_landscape_16x9/public/media/images/20160621_Sunflowers_3385.jpg?h=c673cd1c&itok=AtnPdMM4"
        }
        style={{
          width: "100%",
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
        }}
      />
      <img src={drawing} alt="exported drawing" />
    </MainLayout>
  );
};
export default TextComponent;
