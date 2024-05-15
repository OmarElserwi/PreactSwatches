// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class editorView implements Observer {
  //#region observer pattern

  update(): void {
    const swatchColors = this.model.swatchByIndex(this.model.selectedSwatch);
    const hue = swatchColors.hue;
    const sat = swatchColors.sat;
    const lum = swatchColors.lum;
    this.coloredRect.style.backgroundColor = `hsl(${hue}deg, ${sat}%, ${lum}%)`;

    this.hueText.value = `${hue}`;
    this.satText.value = `${sat}`;
    this.lumText.value = `${lum}`;

    this.hueSlider.value = `${hue}`;
    this.satSlider.value = `${sat}`;
    this.lumSlider.value = `${lum}`;
  }

  //#endregion

  coloredRect: HTMLElement;
  hueText: HTMLInputElement;
  satText: HTMLInputElement;
  lumText: HTMLInputElement;
  hueSlider: HTMLInputElement;
  satSlider: HTMLInputElement;
  lumSlider: HTMLInputElement;

  constructor(private model: Model) {
    const rectEl = document.getElementById("coloredRect") as HTMLElement;
    if (!rectEl) throw new Error("Editor 'coloredRect' not found");
    this.coloredRect = rectEl;

    const hueEl = document.getElementById("hueText") as HTMLInputElement;
    if (!hueEl) throw new Error("Editor 'hueText' not found");
    this.hueText = hueEl;

    const satEl = document.getElementById("satText") as HTMLInputElement;
    if (!satEl) throw new Error("Editor 'satText' not found");
    this.satText = satEl;

    const lumEl = document.getElementById("lumText") as HTMLInputElement;
    if (!lumEl) throw new Error("Editor 'lumText' not found");
    this.lumText = lumEl;

    const hueSliderEl = document.getElementById(
      "hueSlider"
    ) as HTMLInputElement;
    if (!hueSliderEl) throw new Error("Editor 'hueSlider' not found");
    this.hueSlider = hueSliderEl;

    const satSliderEl = document.getElementById(
      "satSlider"
    ) as HTMLInputElement;
    if (!satSliderEl) throw new Error("Editor 'satSlider' not found");
    this.satSlider = satSliderEl;

    const lumSliderEl = document.getElementById(
      "lumSlider"
    ) as HTMLInputElement;
    if (!lumSliderEl) throw new Error("Editor 'lumSlider' not found");
    this.lumSlider = lumSliderEl;

    this.hueText.addEventListener("input", (e) => {
      const tf = e.target as HTMLInputElement;
      tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
      let newHue = parseInt(tf.value) || 0; // convert to number for counter
      newHue > 360 ? (newHue = 360) : newHue < 0 ? (newHue = 0) : newHue;
      this.model.updateHue(newHue);
    });

    this.satText.addEventListener("input", (e) => {
      const tf = e.target as HTMLInputElement;
      tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
      let newSat = parseInt(tf.value) || 0; // convert to number for counter
      newSat > 100 ? (newSat = 100) : newSat < 0 ? (newSat = 0) : newSat;
      this.model.updateSat(newSat);
    });

    this.lumText.addEventListener("input", (e) => {
      const tf = e.target as HTMLInputElement;
      tf.value = tf.value.replace(/[^0-9]/g, ""); // simple text validation
      let newLum = parseInt(tf.value) || 0; // convert to number for counter
      newLum > 100 ? (newLum = 100) : newLum < 0 ? (newLum = 0) : newLum;
      this.model.updateLum(newLum);
    });

    this.hueSlider.addEventListener("input", (e) => {
      const tf = e.target as HTMLInputElement;
      let newHue = parseInt(tf.value) || 0; // convert to number for counter
      newHue > 360 ? (newHue = 360) : newHue < 0 ? (newHue = 0) : newHue;
      this.model.updateHue(newHue);
    });

    this.satSlider.addEventListener("input", (e) => {
      const tf = e.target as HTMLInputElement;
      let newSat = parseInt(tf.value) || 0; // convert to number for counter
      newSat > 100 ? (newSat = 100) : newSat < 0 ? (newSat = 0) : newSat;
      this.model.updateSat(newSat);
    });

    this.lumSlider.addEventListener("input", (e) => {
      const tf = e.target as HTMLInputElement;
      let newLum = parseInt(tf.value) || 0; // convert to number for counter
      newLum > 100 ? (newLum = 100) : newLum < 0 ? (newLum = 0) : newLum;
      this.model.updateLum(newLum);
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
