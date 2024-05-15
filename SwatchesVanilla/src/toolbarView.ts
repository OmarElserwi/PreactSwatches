// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class toolBar implements Observer {
  //#region observer pattern

  update(): void {
    // Dont need to do anything here
  }

  //#endregion

  addButton: HTMLButtonElement;
  deleteButton: HTMLButtonElement;

  constructor(private model: Model) {
    // get reference to add button
    const el = document.getElementById("addButton") as HTMLButtonElement;
    if (!el) throw new Error("Toolbar 'addButton' not found");
    this.addButton = el;

    // get reference to button
    const el2 = document.getElementById("deleteButton") as HTMLButtonElement;
    if (!el2) throw new Error("Toolbar 'deleteButton' not found");
    this.deleteButton = el2;

    // this is the Controller for add
    this.addButton.addEventListener("click", () => {
      if (this.deleteButton.disabled) {
        this.deleteButton.disabled = false;
      }

      if (this.model.count == 15) {
        model.increment();
        this.addButton.disabled = true;
        return;
      } else if (this.model.count == 16) {
        return;
      }
      model.increment();
    });

    // this is the Controller for delete
    this.deleteButton.addEventListener("click", () => {
      if (this.addButton.disabled) {
        this.addButton.disabled = false;
      }

      if (this.model.count == 1) {
        this.deleteButton.disabled = true;
        return;
      } else if (this.model.count == 2) {
        model.decrement();
        this.deleteButton.disabled = true;
        return;
      }
      model.decrement();
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
