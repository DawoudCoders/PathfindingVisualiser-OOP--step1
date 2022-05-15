import generateQueryConstructor from "../utils/object.utils.js";
import AStarFinder from "../lib/pathfinding/AStarFinder.js";
import PathfindingGrid from "../lib/pathfinding/Grid.js";

window.AStarFinder = AStarFinder;
window.PathfindingGrid = PathfindingGrid;

class GridPathFinding {
  constructor() {
    generateQueryConstructor.call(this, ...arguments);
  }
  //generateHelperGrid: Creates a mock up matrix with 0's and 1's depicting the non blocked and blocked cells 
  generateHelperGrid() {
    const {
      grid: { gridCells, numRows, numCols },
    } = this;

    const helperGrid = [];

    for (let row = 0; row < numRows; row++) {
      const helperRow = [];
      for (let col = 0; col < numCols; col++) {
        const position = `${row}-${col}`;
        const cell = gridCells[position];
        helperRow.push(cell.isBlocked ? 1 : 0);
      }
      helperGrid.push(helperRow);
    }

    return helperGrid;
  }
  //generateHelperPath: this links into the imported algorithim and uses the helper grid function to find the optimum path 
  generateHelperPath() {
    const helperGrid = this.generateHelperGrid();
    const pathfindingGrid = new PathfindingGrid(helperGrid);
    const outColRow = this.generateColRow(this.outCell.position);
    const inColRow = this.generateColRow(this.inCell.position);

    const aStarFinderConfig = {
      weight: this.grid.settings.verticesWeight,
    };
    const aStarFinder = new AStarFinder(aStarFinderConfig);
    const helperPath = aStarFinder.findPath(
      ...outColRow,
      ...inColRow,
      pathfindingGrid
    );

    return helperPath;
  }
  generateColRow(position) {
    return position
      .split("-")
      .map((item) => parseInt(item))
      .reverse();
  }
}

export default GridPathFinding;
