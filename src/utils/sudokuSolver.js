import { sudokuSolConfig } from "../config";
import { GetRandFromList } from "./helpers";
import { AddStep, GetValidValues, InitEmptyCells, SolveWithBacktracking } from "./sudoku";
import { GetGridFromBucket } from "./sudokuGridsBucket";

var { cellStatesEnum, optionsEnum } = sudokuSolConfig;

var InitCells = function (options) {
  var cells = InitEmptyCells(options);
  var startTime = Date.now();
  if (!FillWithBacktracking(0, cells, options, startTime))
    cells = InitCellsFromBucket(options, cells);
  return RemoveRandCells(cells, options);
};

var UpdateCells = function (options, changedOption, cells) {
  if (changedOption == optionsEnum.gridSize) return InitCells(options);
  if (changedOption == optionsEnum.gridEmptiness) return RemoveRandCells(cells, options);
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

var Solve = function (options, grid) {
  var steps = [];
  var gridCells = grid.map((cell) => {
    return { ...cell };
  });
  var cells = gridCells.filter((cell) => cell.state == cellStatesEnum.empty);
  for (var cell of cells) cell.value = 0;
  if (!SolveWithBacktracking(steps, 0, cells, gridCells, options)) return -1;
  AddStep(steps, cells, { state: cellStatesEnum.succeed });
  AddStep(steps, cells, { state: cellStatesEnum.normal });
  return steps;
};

// var SolveGrid = function (options, grid) {
//   steps = [];
//   var gridCells = grid.map((cell) => {
//     return { ...cell };
//   });
//   var cells = gridCells.filter((cell) => cell.state == cellStatesEnum.empty);
//   SolveWithBacktracking(cells, gridCells, 0, options);
//   UpdateCells(cells, { state: cellStatesEnum.succeed }, options);
//   UpdateCells(cells, { state: cellStatesEnum.const }, options);
//   return steps;
// };
var InitCellsFromBucket = function (options, cells) {
  var values = GetGridFromBucket(options);
  for (var id = 0; id < values.length; id++) {
    cells[id].value = values[id];
    cells[id].state = cellStatesEnum.const;
  }
  return cells;
};

var FillWithBacktracking = function (id, cells, options, startTime) {
  if (id == cells.length) return true;
  var cell = cells[id];
  var validValues = GetValidValues(cells, cell, options);
  while (validValues.length) {
    cell.value = GetRandFromList(validValues);
    cell.state = cellStatesEnum.const;

    if (FillWithBacktracking(id + 1, cells, options, startTime)) return true;
    if (Date.now() - startTime > 300) return false;
    validValues = validValues.filter((val) => val != cell.value);

    cell.value = 0;
    cell.state = cellStatesEnum.empty;
  }
  return false;
};

var RemoveRandCells = function (cells, options) {
  for (var cell of cells) cell.state = cellStatesEnum.const;
  var needToRemove = Math.round((options.gridEmptiness * cells.length) / 100);
  while (needToRemove) {
    var remCell = GetRandFromList(cells);
    if (remCell.state != cellStatesEnum.empty) {
      remCell.state = cellStatesEnum.empty;
      needToRemove--;
    }
  }
  return cells;
};

export { InitCells, UpdateCells, InitGrid, Solve };
