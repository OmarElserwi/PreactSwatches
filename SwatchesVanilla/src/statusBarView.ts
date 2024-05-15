// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class statusBar implements Observer {
  //#region observer pattern

  update(): void {
    // The status bar always shows the number of swatches in the list and which swatch is selected, like this: “5 swatches (selected #4)”.
    this.statusBar.innerHTML = `${this.model.count} swatches (selected #${
      this.model.selectedSwatch + 1
    })`;
  }

  //#endregion
  statusBar: HTMLElement;

  constructor(private model: Model) {
    const el = document.querySelector("#statusBar") as HTMLElement;
    if (!el) throw new Error("statusBar not found");
    this.statusBar = el;

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
