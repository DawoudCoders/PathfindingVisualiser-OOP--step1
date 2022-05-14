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
    this.#renderEvents();
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

  #renderGridCell() {
    const {
      grid: { numCols, numRows },
    } = this;
    this.isBlocked = false;
    this.isOutCell = this.position === "0-0";
    this.isInCell = this.position === `${numRows - 1}-${numCols - 1}`;
  }

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

  //renderOutInCells();

  renderBlockedCells() {
    this.gridCellElement.classList[this.isBlocked ? "add" : "remove"](
      "blocked"
    );
  }

  //  -----------

  #renderEvents() {
    this.#renderClickEvent();
    this.#renderHoverEvent();
    //this.#renderDragDropEvent();
  }

  #renderClickEvent() {
    const { gridCellElement } = this;
    gridCellElement.addEventListener("click", () => {
      if (this.isOutCell || this.isInCell) return;
      this.isBlocked = !this.isBlocked;
      this.renderBlockedCells();
    });
  }
  #renderHoverEvent() {
    const { gridCellElement } = this;
    gridCellElement.addEventListener("mouseover", () => {
      if (this.isOutCell || this.isInCell) {
        gridCellElement.style.cursor = "grab";
      } else if (!this.isBlocked) {
        gridCellElement.style.cursor = "pointer";
      } else {
        gridCellElement.style.cursor = "crosshair";
      }
    });
  }
  #renderDragDropEvent() {}
}

export default GridCell;
