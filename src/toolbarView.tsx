// local imports
// import { Observer } from "./observer";
// import { Model } from "./model";
import { count, addToSwatches, deleteSelectedSwatch } from "./AppState";

import style from "./css/toolbarView.module.css";


export default function ToolbarView() {
  return (
    <div class={style.root}>
      <button id="addButton" onClick={() => addToSwatches()} disabled={count.value > 15}>Add</button>
      <button id="deleteButton" onClick={() => deleteSelectedSwatch()} disabled={count.value <= 1}>Delete</button>
    </div>
  );
}
