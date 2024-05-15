import { render } from "preact";

import LeftView from "./Left";
// import { Model } from "./model";
import  ToolbarView  from "./toolbarView";
import  EditorView  from "./editorView";
import  SwatchListView  from "./swatchListView";
import  StatusBar  from "./statusBarView";

// global styles (e.g. reset)
import "./css/style.css";

// component styles
import style from "./css/main.module.css";

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
      // app "root"
    //   <div class={style.root}>
        // {/* container */}
        // {/* <div class={style.container}> */}
        //   {/* views */}
        // //   <LeftView />
        // //   <ToolbarView />
        //   {/* <RightView colour="lightblue" /> */}
        // {/* </div> */}
    //   </div>
    );
  }
  
  render(<App />, app);
  
