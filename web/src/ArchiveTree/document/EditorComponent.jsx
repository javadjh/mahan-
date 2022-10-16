import React ,{useRef, useState,Fragment} from "react";
import CanvasDraw from "react-canvas-draw";

const EditorComponent = ()=>{
    // const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState();

    const handleExport = () => {
        console.log("clicked");
        // const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
        // console.log(base64);
        // setDrawing(base64);
    };

    return (
        <Fragment>
            <h1>React-Canvas-Draw</h1>
            <h2>Save draw to image base 64!</h2>
            <hr />

        </Fragment>
    );
}
export default EditorComponent
