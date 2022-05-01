import generateQueryConstructor from "../utils/object.utils.js";

class GridCell {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }
  get position() {
    return `${this.row}|${this.col}`;
  }
  render() {
    // this.#renderElement();
    // this.#renderGridCell();
    // this.#renderHtml();
    // this.renderOutInCells();
    // this.#renderEvents();
  }
  //   #renderElement();
  //   #renderGridCell();
  //   #renderHtml();
  //   renderOutInCells();
  //   #renderEvents();
}

export default GridCell;
