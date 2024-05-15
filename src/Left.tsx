// app state
import { count, increment } from "./AppState";

import style from "./css/Left.module.css";

export default function LeftView() {
  return (
    <div class={style.root}>
      <button onClick={() => increment()}>{count.value}</button>
    </div>
  );
}
