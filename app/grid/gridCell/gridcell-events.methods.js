export default function () {
  renderClickEvent.call(this);
  renderHoverEvent.call(this);
  renderDragDropEvents.call(this);
}

function renderClickEvent() {
  const { grid, gridCellElement } = this;

  gridCellElement.addEventListener("click", () => {
    if (this.isOutCell || this.isInCell) return;

    this.isBlocked = !this.isBlocked;
    this.renderGridCellDynamics();
    grid.draw();
  });
}

function renderHoverEvent() {
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

function renderDragDropEvents() {
  const { gridCellElement, grid } = this;

  gridCellElement.addEventListener("dragstart", (event) => {
    if (dontAllowDrag.call(this)) {
      event.preventDefault();
      return;
    }
    grid.draggedGridCell = this;
  });

  gridCellElement.addEventListener("dragover", (event) => {
    if (dontAllowDrop.call(this)) return;
    //dropping inside of an element is disabled by default
    event.preventDefault();
  });

  gridCellElement.addEventListener("drop", () => {
    this.resetCell();

    this.isOutCell = grid.draggedGridCell.isOutCell;
    this.isInCell = grid.draggedGridCell.isInCell;

    this.renderGridCellDynamics();

    grid.draggedGridCell.resetCell();
    grid.draw();
  });
}

function dontAllowDrag() {
  return !this.isOutCell && !this.isInCell;
}

function dontAllowDrop() {
  const { gridCellElement, grid } = this;

  if (grid.draggedGridCell.gridCellElement === gridCellElement) return true;
  if (grid.draggedGridCell.isOutCell && this.isInCell) return true;
  if (grid.draggedGridCell.isInCell && this.isOutCell) return true;

  return false;
}
