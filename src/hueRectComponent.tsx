// https://www.turing.com/kb/canvas-components-in-react

import {
    useRef,
    useEffect,
    useState,
    useLayoutEffect,
  } from "preact/hooks";

import {swatches, selected} from "./AppState";
  
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
    // initial point is set to point property
    // const [movelineY, setMoveLineY] = useState(lineY);

  
    const clickHandler = (e: MouseEvent) => {
      // send click point to parent
      if (callback) callback(e.offsetY);
    };
  
    // const moveHandler = (e: MouseEvent) => {
    //   // update local state
    //   setMoveLineY({ y: e.offsetY });
    // };
  
    // drawing
    useLayoutEffect(() => {
      const gc = canvasRef.current?.getContext("2d");
      if (gc) draw(gc);
    }),
      [lineY];
  
    function draw(gc: CanvasRenderingContext2D) {
        const hue = swatches.value[selected.value].hue;

        for (let hue = 0; hue <= 360; hue++) {
            // set the fill style
            gc.fillStyle = `hsl(${hue}, 100%, 50%)`;
            gc.fillRect(0, hue * 200 / 360, 20, 200 / 360);
        }

        // The current hue for the selected swatch is indicated by the centre of an a 5px tall rectangle. The rectangle is stroked in black and white (to make it easy to see on light and dark colours).
        gc.strokeStyle = "black";
        gc.strokeRect(0, hue * 200 / 360, 20, 5);
        gc.strokeStyle = "white";
        gc.strokeRect(0, hue * 200 / 360, 20, 5);


  
      // show points
    //   gc.font = "14px sans-serif";
    //   gc.fillStyle = "yellow";
    //   gc.fillText(`${point.x}, ${point.y}`, 8, 20);
    //   gc.fillStyle = "red";
    //   gc.fillText(`${movePoint.x}, ${movePoint.y}`, 8, 20 + 20);
    }
  
    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        // onMouseMove={moveHandler}
        onClick={clickHandler}
      />
    );
  }
  