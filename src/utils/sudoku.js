import { sudoku } from "../config";

var InitCells = function (options) {
  var cells = [];
  var gridSize = options.gridSize * options.gridSize;
  for (var rowId = 1; rowId <= gridSize; rowId++)
    for (var colId = 1; colId <= gridSize; colId++)
      cells.push({
        row: rowId,
        col: colId,
        subGridRow: Math.ceil(rowId / options.gridSize),
        subGridCol: Math.ceil(colId / options.gridSize),
        state: sudoku.cellStatesEnum.empty,
        value: 0,
      });
  return cells;
};

var InitGrid = function (cells, options) {
  var grid = [];
  var gridSize = options.gridSize * options.gridSize;
  for (var rowId = 1; rowId <= gridSize; rowId++) {
    var row = { id: rowId, value: [] };
    grid.push(row);
    for (var colId = 1; colId <= gridSize; colId++)
      row.value.push(cells.find((cell) => cell.row == rowId && cell.col == colId));
  }
  return grid;
};

export { InitCells, InitGrid };
