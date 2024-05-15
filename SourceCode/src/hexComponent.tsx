import { swatches, selected, updateHex } from "./AppState";
import { useEffect, useState } from "preact/hooks";
import style from "./css/hexComponent.module.css";

export default function HexComponent() {
  // local state for the input values
  const [inputValue, setInputValue] = useState(
    swatches.value[selected.value].hex
  );

  // update local state when app state changes
  useEffect(() => {
    setInputValue(swatches.value[selected.value].hex);
  }, [swatches.value]);

  // regex validation for hex
  const isValid = (text: string) => /^#[0-9a-f]{6}$/i.test(text);

  // handler for input changes
  const handleInput = (e: Event) => {
    const newValue = (e.target as HTMLInputElement).value;
    // Update local state immediately
    setInputValue(newValue);

    // only if valid, update the app state
    if (isValid(newValue)) {
      swatches.value[selected.value].hex = newValue;
      updateHex(newValue);
    }
  };

  return (
    <>
      <input
        class={style.hexField}
        value={inputValue}
        type="text"
        onInput={handleInput}
        // always leave input field with valid value
        onChange={() => setInputValue(swatches.value[selected.value].hex)}
      />
      {!isValid(inputValue) && (
        <p class={style.invalid}>Invalid: must be valid hex colour</p>
      )}
    </>
  );
}
