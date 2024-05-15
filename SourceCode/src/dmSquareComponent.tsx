// https://www.turing.com/kb/canvas-components-in-react

import { useRef, useLayoutEffect } from "preact/hooks";

import { swatches, selected } from "./AppState";

type CanvasProps = {
  point: { x: number; y: number };
  width?: number;
  height?: number;
  callback?: (x: number, y: number) => void;
};

export default function DmSquareComponent({
  point,
  width = 200,
  height = 200,
  callback,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clickHandler = (e: MouseEvent) => {
    // send click point to parent
    if (callback) callback(e.offsetX, e.offsetY);
  };

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }),
    [point];

  function draw(gc: CanvasRenderingContext2D) {
    const hue = swatches.value[selected.value].hue;
    const sat = swatches.value[selected.value].sat;
    const lum = swatches.value[selected.value].lum;

    // draw the square
    for (let sat = 0; sat <= 100; sat++) {
      for (let lum = 0; lum <= 100; lum++) {
        // set the fill style
        gc.fillStyle = `hsl(${hue}, ${sat}%, ${lum}%)`;
        // draw the rectangle
        gc.fillRect(sat * 2, 200 - lum * 2, 2, 2);
      }
    }

    // property  point
    gc.strokeStyle = "white";
    gc.beginPath();
    gc.arc(sat * 2, 200 - lum * 2, 5, 0, 2 * Math.PI);
    gc.stroke();

    gc.beginPath();
    gc.arc(sat * 2, 200 - lum * 2, 4, 0, 2 * Math.PI);
    gc.strokeStyle = "black";
    gc.stroke();
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={clickHandler}
      style={{ margin: "10px" }}
    />
  );
}
