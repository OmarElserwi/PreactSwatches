// local imports
import { count, selected } from "./AppState";

import style from "./css/statusBarView.module.css";

export default function ToolbarView() {
  return (
    <div class={style.statusBar}>{count.value} swatches (selected #{selected.value + 1})</div>
  );
}
