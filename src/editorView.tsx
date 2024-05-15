// local imports
// import { Observer } from "./observer";
// import { Model } from "./model";
import {
  swatches,
  selected,
  updateHue,
  updateSat,
  updateLum,
  updateRed,
  updateGreen,
  updateBlue,
} from "./AppState";
import { useState } from "preact/hooks";
import { signal } from "@preact/signals";

import style from "./css/editorView.module.css";
import HexComponent from "./hexComponent";
import DmSquareComponent from "./dmSquareComponent";
import HueRectComponent from "./hueRectComponent";

const size = 200;

export default function EditorView() {
  // local state for the input value
  // const inputValue = signal(0);
  const [inputValue, setInputValue] = useState("HSL");
  const [point, setPoint] = useState({ x: size / 2, y: size / 2 });
  const [lineY, setLineY] = useState({ y: swatches.value[selected.value].hue });

  const canvasHandler = (x: number, y: number) => {
    console.log(
      `canvasHandler (${point.x}, ${point.y}) => (${x}, ${y})`
    );
    setPoint({ x: x, y: y });
    updateSat(Math.min(100, Math.max(0, Math.round(x/2))));
    updateLum(Math.min(100, Math.max(0, Math.round((200 - y)/2))));
  }; 
  
  const rectHandler = (y: number) => {
    console.log(
      `rectHandler (${lineY.y}) => (${y})`
    );
    setLineY({ y: y });
    updateHue(Math.min(360, Math.max(0, Math.round(y/200*360))));
  };

  const handleHueTextInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
    let newHue = parseInt(tf.value) || 0; // convert to number for counter
    newHue > 360 ? (newHue = 360) : newHue < 0 ? (newHue = 0) : newHue;
    updateHue(newHue);
  };

  const handleSatTextInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
    let newSat = parseInt(tf.value) || 0; // convert to number for counter
    newSat > 100 ? (newSat = 100) : newSat < 0 ? (newSat = 0) : newSat;
    updateSat(newSat);
  };

  const handleLumTextInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
    let newLum = parseInt(tf.value) || 0; // convert to number for counter
    newLum > 100 ? (newLum = 100) : newLum < 0 ? (newLum = 0) : newLum;
    updateLum(newLum);
  };

  const handleRedTextInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
    let newRed = parseInt(tf.value) || 0; // convert to number for counter
    newRed > 255 ? (newRed = 255) : newRed < 0 ? (newRed = 0) : newRed;
    updateRed(newRed);
  };

  const handleGreenTextInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
    let newGreen = parseInt(tf.value) || 0; // convert to number for counter
    newGreen > 255 ? (newGreen = 255) : newGreen < 0 ? (newGreen = 0) : newGreen;
    updateGreen(newGreen);
  };

  const handleBlueTextInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
    let newBlue = parseInt(tf.value) || 0; // convert to number for counter
    newBlue > 255 ? (newBlue = 255) : newBlue < 0 ? (newBlue = 0) : newBlue;
    updateBlue(newBlue);
  }

  const handleHueSliderInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    let newHue = parseInt(tf.value) || 0; // convert to number for counter
    newHue > 360 ? (newHue = 360) : newHue < 0 ? (newHue = 0) : newHue;
    updateHue(newHue);
  };

  const handleSatSliderInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    let newSat = parseInt(tf.value) || 0; // convert to number for counter
    newSat > 100 ? (newSat = 100) : newSat < 0 ? (newSat = 0) : newSat;
    updateSat(newSat);
  };

  const handleLumSliderInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    let newLum = parseInt(tf.value) || 0; // convert to number for counter
    newLum > 100 ? (newLum = 100) : newLum < 0 ? (newLum = 0) : newLum;
    updateLum(newLum);
  };

  const handleRedSliderInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    let newRed = parseInt(tf.value) || 0; // convert to number for counter
    newRed > 255 ? (newRed = 255) : newRed < 0 ? (newRed = 0) : newRed;
    updateRed(newRed);
  };
  
  const handleGreenSliderInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    let newGreen = parseInt(tf.value) || 0; // convert to number for counter
    newGreen > 255 ? (newGreen = 255) : newGreen < 0 ? (newGreen = 0) : newGreen;
    updateGreen(newGreen);
  };
  
  const handleBlueSliderInput = (e: Event) => {
    const tf = e.target as HTMLInputElement;
    let newBlue = parseInt(tf.value) || 0; // convert to number for counter
    newBlue > 255 ? (newBlue = 255) : newBlue < 0 ? (newBlue = 0) : newBlue;
    updateBlue(newBlue);
  }

  return (
    <div class={style.root}>
      <div class={style.dmArea}>
        <DmSquareComponent
          point={point}
          width={size}
          height={size}
          callback={canvasHandler}
         />
         <HueRectComponent 
          lineY={lineY}
          width={20}
          height={200}
          callback={rectHandler}
         />
      </div>
      <span class={style.form}>
        <div class={style.radioButton}>
          <input
            type="radio"
            class={style.radioButton}
            name="editorType"
            id="HSL"
            value="0"
            onChange={() => {
              setInputValue("HSL");
              console.log("inputValue changed to " + `${inputValue}`);
            }}
            checked={inputValue == "HSL"}
          />
          <label for="HSL">HSL</label>
          <input
            type="radio"
            class={style.radioButton}
            name="editorType"
            id="RGB"
            value="1"
            onChange={() => {
              setInputValue("RGB");
              console.log("inputValue changed to " + `${inputValue}`);
            }}
          />
          <label for="RGB">RGB</label>
          <input
            type="radio"
            class={style.radioButton}
            name="editorType"
            id="Hex"
            value="2"
            onChange={() => {
              setInputValue("Hex");
              console.log("inputValue changed to " + `${inputValue}`);
            }}
          />
          <label for="Hex">Hex</label>
        </div>
        {inputValue == "HSL" && (
          <>
            <div id="HueContainer" class={style.formContainer}>
              <label for="hueText">Hue</label>
              <input
                id="hueText"
                type="number"
                class={style.textField}
                min="0"
                max="360"
                value={swatches.value[selected.value].hue}
                onInput={handleHueTextInput}
              />
              <input
                type="range"
                id="hueSlider"
                class={style.slider}
                min="0"
                max="360"
                value={swatches.value[selected.value].hue}
                onInput={handleHueSliderInput}
              />
            </div>

            <div id="SatContainer" class={style.formContainer}>
              <label for="satText">Sat</label>
              <input
                id="satText"
                type="number"
                class={style.textField}
                min="0"
                max="100"
                value={swatches.value[selected.value].sat}
                onInput={handleSatTextInput}
              />
              <input
                type="range"
                id="satSlider"
                class={style.slider}
                min="0"
                max="100"
                value={swatches.value[selected.value].sat}
                onInput={handleSatSliderInput}
              />
            </div>

            <div id="LumContainer" class={style.formContainer}>
              <label for="lumText">Lum</label>
              <input
                id="lumText"
                type="number"
                class={style.textField}
                min="0"
                max="100"
                value={swatches.value[selected.value].lum}
                onInput={handleLumTextInput}
              />
              <input
                type="range"
                id="lumSlider"
                class={style.slider}
                min="0"
                max="100"
                value={swatches.value[selected.value].lum}
                onInput={handleLumSliderInput}
              />
            </div>
          </>
        )}
        {inputValue == "RGB" && (
          <>
            <div id="RedContainer" class={style.formContainer}>
              <label for="redText">R</label>
              <input
                id="redText"
                type="number"
                class={style.textField}
                min="0"
                max="255"
                value={swatches.value[selected.value].red}
                onInput={handleRedTextInput}
              />
              <input
                type="range"
                id="redSlider"
                class={style.slider}
                min="0"
                max="255"
                value={swatches.value[selected.value].red}
                onInput={handleRedSliderInput}
              />
            </div>

            <div id="GreenContainer" class={style.formContainer}>
              <label for="greenText">G</label>
              <input
                id="greenText"
                type="number"
                class={style.textField}
                min="0"
                max="255"
                value={swatches.value[selected.value].green}
                onInput={handleGreenTextInput}
              />
              <input
                type="range"
                id="greenSlider"
                class={style.slider}
                min="0"
                max="255"
                value={swatches.value[selected.value].green}
                onInput={handleGreenSliderInput}
              />
            </div>

            <div id="BlueContainer" class={style.formContainer}>
              <label for="blueText">B</label>
              <input
                id="blueText"
                type="number"
                class={style.textField}
                min="0"
                max="255"
                value={swatches.value[selected.value].blue}
                onInput={handleBlueTextInput}
              />
              <input
                type="range"
                id="blueSlider"
                class={style.slider}
                min="0"
                max="255"
                value={swatches.value[selected.value].blue}
                onInput={handleBlueSliderInput}
              />
            </div>
          </>
        )}
        {inputValue == "Hex" && (
          <HexComponent />
        )
        }
      </span>
    </div>
  );
}
