// local imports
import { swatches, selectSwatch } from "./AppState";

import style from "./css/swatchListView.module.css";

export default function SwatchListView() {
  return (
    <div class={style.swatchList}>
      {swatches.value.map((swatch) => (
        <span
          class={style.swatch}
          style={{
            backgroundColor: `hsl(${swatch.hue}deg, ${swatch.sat}%, ${swatch.lum}%)`,
            border: `1px solid ${swatch.selected ? "black" : "lightgray"}`,
          }}
          onClick={() => {
            console.log("clicked swatch " + `${swatch.index}`);
            selectSwatch(swatch.index);
          }}
        />
      ))}
    </div>
  );
}
