import React, { useRef, useState } from "react";
const Canvas = ({ width, height }) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const refe = useRef();

  React.useEffect(() => {
    const context = refe.current.getContext("2d");
    context.font = "20px Arial";
    context.fillStyle = "blue";
    context.fillText("A", 16 / 2, 34 / 2);
  }, []);
  const download = () => {
    const context = refe.current.getContext("2d");
    const data = context.getImageData(0, 0, 34, 16);
    const file = new Blob(data.data, { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file)
    setUrl(url);
  };
  return (
    <>
      <canvas
        id="canvas"
        width={width}
        height={height}
        style={canvasStyle}
        ref={refe}
      />
      <br />
      <br />
      <a href={url} download="image.txt" onClick={download}>
        Download
      </a>
    </>
  );
};

export default Canvas;

const canvasStyle = {
  border: "1px solid black",
  backgroundColor: "white",
};
