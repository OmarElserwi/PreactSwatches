// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class swatchListView implements Observer {
  //#region observer pattern

  update(): void {
    let html = "";
    for (let i = 0; i < this.model.count; i++) {
      const swatchColors = this.model.swatchByIndex(i);
      const fill = `hsl(${swatchColors.hue}deg, ${swatchColors.sat}%, ${swatchColors.lum}%)`;
      let border = "lightgray";
      if (swatchColors.selected) {
        border = "black";
      }
      html += `<div id="swatch${i}" class="swatch" style="background-color: ${fill}; border: 1px solid ${border};"></div>`;
    }

    this.container.innerHTML = html;

    // add event listeners to each swatch
    const swatches = this.container.querySelectorAll(".swatch");
    swatches.forEach((swatch, i) => {
      swatch.addEventListener("click", () => {
        console.log(`swatch ${i} clicked`);
        this.model.selectSwatch(i);
      });
    });
  }

  //#endregion

  container: HTMLElement;

  constructor(private model: Model) {
    // get reference to container using querySelector
    const el = document.querySelector("#swatchList") as HTMLElement;
    if (!el) throw new Error("swatchList div not found");
    this.container = el;

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
