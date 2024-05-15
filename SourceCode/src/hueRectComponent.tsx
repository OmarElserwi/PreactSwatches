// https://www.turing.com/kb/canvas-components-in-react

import { useRef, useLayoutEffect } from "preact/hooks";

import { swatches, selected } from "./AppState";

type CanvasProps = {
  lineY: { y: number };
  width?: number;
  height?: number;
  callback?: (y: number) => void;
};

export default function HueRectComponent({
  lineY,
  width,
  height,
  callback,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clickHandler = (e: MouseEvent) => {
    // send click point to parent
    if (callback) callback(e.offsetY);
  };

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }),
    [lineY];

  function draw(gc: CanvasRenderingContext2D) {
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
    const hue = swatches.value[selected.value].hue;

    for (let hue = 0; hue <= 360; hue++) {
      // set the fill style
      gc.fillStyle = `hsl(${hue}, 100%, 50%)`;
      gc.fillRect(0, (hue * 200) / 360, 20, 200 / 360);
    }

    gc.strokeStyle = "white";
    gc.strokeRect(0, (hue * 200) / 360, 20, 5);

    gc.strokeStyle = "black";
    gc.strokeRect(0, (hue * 200) / 360 + 1, 20, 3);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={clickHandler}
    />
  );
}
