import { useState } from "react";
import { useOnDraw } from "./hooks";

const Canvas = ({ width, height }) => {
  const [url, setUrl] = useState("");
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#FFC0CB", 5);
  }
  const download = () => {
    const image = new Image();
    const url = document.getElementById("canvas").toDataURL("image/jpg");
    image.src = url;
    console.log(image.ariaValueText);
    setUrl(url);
  };
  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <>
      <canvas
        id="canvas"
        width={width}
        height={height}
        onMouseDown={onCanvasMouseDown}
        style={canvasStyle}
        ref={setCanvasRef}
      />
      <a href={url} download="image.jpg" onClick={download}>
        Download
      </a>
    </>
  );
};

export default Canvas;

const canvasStyle = {
  border: "1px solid black",
};
