// local imports
import { Model } from "./model";
import { toolBar } from "./toolbarView";
import { editorView } from "./editorView";
import { swatchListView } from "./swatchListView";
import { statusBar } from "./statusBarView";

// data
const model = new Model();
model.selectSwatch(0);

// user interface
// add views to main panel
new toolBar(model);
new editorView(model);
new swatchListView(model);
new statusBar(model);
