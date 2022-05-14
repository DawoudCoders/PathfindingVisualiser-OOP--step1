import generateQueryConstructor from "../utils/object.utils.js";
import renderEvents from "./gridCell/gridcell-events.methods.js";

class GridCell {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
    
  }
  get position() {
    return `${this.row}-${this.col}`;
  }

  render() {
    this.#renderHTMLElement();
    this.#renderHtmlStyling();
    this.#renderAttributes();
    this.renderGridCellDynamics();
    renderEvents.call(this);
  }

  #renderHTMLElement() {
    console.log(this);
    const {
      grid: { gridElement },
    } = this;

    const gridCellElement = document.createElement("div");
    gridCellElement.classList.add("gridCell");
    gridCellElement.setAttribute("position", this.position);
    gridElement.append(gridCellElement);
    this.gridCellElement = gridCellElement;
  }

  #renderHtmlStyling() {
    const {
      gridCellElement,
      grid: {
        settings: { cellSize, borderSize, borderColor },
      },
    } = this;

    Object.assign(gridCellElement.style, {
      width: `${cellSize}px`,
      height: `${cellSize}px`,
      border: `${borderSize}px solid ${borderColor}`,
    });
    gridCellElement.setAttribute("draggable", true);
  }

  #renderAttributes() {
    const {
      grid: { numCols, numRows },
    } = this;
    this.isBlocked = false;
    this.isOutCell = this.position === "0-0";
    this.isInCell = this.position === `${numRows - 1}-${numCols - 1}`;
  }

  renderGridCellDynamics() {
    this.gridCellElement.classList[this.isOutCell ? "add" : "remove"](
      "outCell"
    );
    this.gridCellElement.classList[this.isInCell ? "add" : "remove"]("inCell");
    this.gridCellElement.classList[this.isBlocked ? "add" : "remove"](
      "blocked"
    );
  }

  //  -----------

  resetCell() {
    this.isInCell = false;
    this.isOutCell = false;
    this.isBlocked = false;
    this.renderGridCellDynamics();
  }
}

export default GridCell;
