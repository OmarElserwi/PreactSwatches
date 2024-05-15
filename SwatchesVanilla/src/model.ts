import { Subject } from "./observer";

export class Model extends Subject {
  // model data (i.e. model state)
  private _count = 10;

  // create a list of swatches, with 10 initial swatches, with random hue, sat, and lum
  private _swatches = new Array(10).fill(0).map((e, index) => {
    return {
      hue: Math.floor(Math.random() * 360),
      sat: Math.floor(Math.random() * 100),
      lum: Math.floor(Math.random() * 100),
      selected: false,
      index: index,
    };
  });

  private _selectedSwatch = 0;
  get count() {
    return this._count;
  }

  get selectedSwatch() {
    return this._selectedSwatch;
  }

  swatchByIndex(index: number) {
    return this._swatches[index];
  }

  selectSwatch(index: number) {
    this._swatches[this._selectedSwatch].selected = false;
    this._swatches[index].selected = true;
    this._selectedSwatch = index;
    this.notifyObservers();
  }

  deleteSelectedSwatch() {
    this._swatches.splice(this._selectedSwatch, 1);
    this._selectedSwatch = 0; // safe way to do this, since we know there is at least one swatch and assignment didnt specify
    this.selectSwatch(0);

    // update swatches array indices
    for (let i = 0; i < this._swatches.length; i++) {
      this._swatches[i].index = i;
    }

    this.notifyObservers();
  }

  updateSwatch(hue: number, sat: number, lum: number) {
    this._swatches[this._selectedSwatch].hue = hue;
    this._swatches[this._selectedSwatch].sat = sat;
    this._swatches[this._selectedSwatch].lum = lum;
    this.notifyObservers();
  }

  updateHue(hue: number) {
    this._swatches[this._selectedSwatch].hue = hue;
    this.notifyObservers();
  }

  updateSat(sat: number) {
    this._swatches[this._selectedSwatch].sat = sat;
    this.notifyObservers();
  }

  updateLum(lum: number) {
    this._swatches[this._selectedSwatch].lum = lum;
    this.notifyObservers();
  }

  // model "business logic"
  increment() {
    this._count++;

    // create a new swatch with a random hue, sat, and lum and select it
    this._swatches.push({
      hue: Math.floor(Math.random() * 360),
      sat: Math.floor(Math.random() * 100),
      lum: Math.floor(Math.random() * 100),
      selected: false,
      index: this._swatches.length,
    });

    this.selectSwatch(this._swatches.length - 1);

    console.log(this._swatches);

    // need to notify observers anytime the model changes
    this.notifyObservers();
  }

  decrement() {
    this._count--;
    // delete selected swatch which is at index _selectedSwatch
    this.deleteSelectedSwatch();

    console.log(this._swatches);

    // need to notify observers anytime the model changes
    this.notifyObservers();
  }
}
