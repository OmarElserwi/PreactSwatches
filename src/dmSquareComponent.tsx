// https://www.turing.com/kb/canvas-components-in-react

import {
    useRef,
    useEffect,
    useState,
    useLayoutEffect,
  } from "preact/hooks";

import {swatches, selected} from "./AppState";
  
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
    // initial point is set to point property
    // const [movePoint, setMovePoint] = useState(point);
  
    const clickHandler = (e: MouseEvent) => {
      // send click point to parent
      if (callback) callback(e.offsetX, e.offsetY);
    };
  
    // const moveHandler = (e: MouseEvent) => {
    //   // update local state
    //   setMovePoint({ x: e.offsetX, y: e.offsetY });
    // };
  
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
            gc.fillRect(sat * 2, 200 - (lum * 2), 2, 2);
            }
        }
  
    // local state point
    //   gc.fillStyle = "red";
    //   gc.beginPath();
    //   gc.arc(movePoint.x, movePoint.y, 10, 0, 2 * Math.PI);
    //   gc.fill();
  
      // property  point
      gc.strokeStyle = "white";
      gc.beginPath();
      gc.arc(sat * 2, 200 - (lum * 2), 5, 0, 2 * Math.PI);
      gc.stroke();
      gc.strokeStyle = "black";
      gc.stroke();

  
      // show point
    //   gc.font = "14px sans-serif";
    //   gc.fillStyle = "yellow";
    //   gc.fillText(`${sat}, ${lum}`, 8, 20);
    }
  
    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        // onMouseMove={moveHandler}
        onClick={clickHandler}
        style={{ margin: "10px" }}
      />
    );
  }
  