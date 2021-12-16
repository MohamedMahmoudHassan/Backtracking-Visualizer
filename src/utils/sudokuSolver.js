import {  sudokuGenConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum } = sudokuGenConfig;

var InitCells = function (options) {
  var cells = [];
  var size = options.gridSize * options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++)
    for (var colId = 1; colId <= size; colId++)
      cells.push({
        id: (rowId - 1) * size + colId - 1,
        row: rowId,
        col: colId,
        subGridRow: Math.ceil(rowId / options.gridSize),
        subGridCol: Math.ceil(colId / options.gridSize),
        state: cellStatesEnum.empty,
        value: 0,
      });
  return cells;
};

var InitGrid = function (cells, options) {
  var grid = [];
  var size = options.gridSize * options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++) {
    var row = { id: rowId, value: [] };
    grid.push(row);
    for (var colId = 1; colId <= size; colId++)
      row.value.push(cells[(rowId - 1) * options.gridSize + colId]);
  }
  return grid;
};

var Solve = function (options) {
  var cells = InitCells(options);
  if (!SolveWithBacktracking(0, cells, cells, options)) return -1;
  return cells;
};

var SolveWithBacktracking = function (id, cells, gridCells, options) {
  if (id == cells.length) return true;
  var cell = cells[id];
  var validValues = GetValidValues(gridCells, cell, options);
  while (validValues.length) {
    cell.value = GetRandFromList(validValues);
    cell.state = cellStatesEnum.const;

    if (SolveWithBacktracking(id + 1, cells, gridCells, options)) return true;
    validValues = validValues.filter((val) => val != cell.value);

    cell.value = 0;
    cell.state = cellStatesEnum.empty;
  }
  return false;
};

var CellsConflict = function (cell1, cell2) {
  return (
    cell1.row == cell2.row ||
    cell1.col == cell2.col ||
    (cell1.subGridRow == cell2.subGridRow && cell1.subGridCol == cell2.subGridCol)
  );
};

var GetValidValues = function (cells, cell, options) {
  var maxValue = options.gridSize * options.gridSize;
  var allValues = Array.from({ length: maxValue }, (_, i) => i + 1);
  var invalidValues = cells.filter((c) => CellsConflict(c, cell)).map((c) => c.value);
  return allValues.filter((value) => !invalidValues.includes(value));
};

export { InitCells, InitGrid, Solve };
