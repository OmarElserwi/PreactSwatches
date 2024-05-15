import { render } from "preact";

import ToolbarView from "./toolbarView";
import EditorView from "./editorView";
import SwatchListView from "./swatchListView";
import StatusBar from "./statusBarView";

// global styles (e.g. reset)
import "./css/style.css";

// get ref for node to insert the app
const app = document.querySelector("div#app");
if (!app) throw new Error("no app div");

export default function App() {
  return (
    <>
      <ToolbarView />
      <EditorView />
      <SwatchListView />
      <StatusBar />
    </>
  );
}

render(<App />, app);
