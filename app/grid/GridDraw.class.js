import generateQueryConstructor from "../utils/object.utils.js";
import GridPathFinding from "./GridPathFinding.class.js";

class GridDraw {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }
  get outCell() {
    const gridCells = Object.values(this.grid.gridCells);
    return gridCells.find((gridCell) => gridCell.isOutCell);
  }
  get inCell() {
    const gridCells = Object.values(this.grid.gridCells);
    return gridCells.find((gridCell) => gridCell.isInCell);
  }
  draw() {
    const { outCell, inCell, grid } = this;
    const gridPathFinding = new GridPathFinding({ grid, outCell, inCell });
    this.helperPath = gridPathFinding.generateHelperPath();
  }
}

export default GridDraw;
