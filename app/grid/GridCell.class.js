import generateQueryConstructor from "../utils/object.utils.js";

class GridCell {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }
  get position() {
    return `${this.row}-${this.col}`;
  }

  render() {
    this.#renderElement();
    this.#renderGridCell();
    this.#renderHtml();
    //this.renderOutInCells();
    //this.#renderEvents();
  }

  #renderElement() {
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

  #renderGridCell() {}

  #renderHtml() {
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
  }

  //   renderOutInCells();
  //   #renderEvents();
}

export default GridCell;
