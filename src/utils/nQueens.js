import { nQueenConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum } = nQueenConfig;

var InitQueens = function (options) {
  var queens = [];
  var size = options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++)
    queens.push({
      id: rowId,
      row: rowId,
      col: -1,
      state: cellStatesEnum.empty,
    });
  Solve(queens, options);
  return queens;
};

var InitGrid = function (queens, options) {
  var grid = [];
  var size = options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++) {
    var row = { id: rowId, value: [], queen: queens.find((queen) => queen.row == rowId) };
    grid.push(row);
    for (var colId = 1; colId <= size; colId++)
      row.value.push({ id: (rowId - 1) * size + colId, row: rowId, col: colId });
  }
  return grid;
};

var Solve = function (queens, options) {
  SolveWithBacktracking(queens, 0, options);
};

var isFreeCell = function (cell, queens) {
  for (var queen of queens) {
    if (
      queen.col != -1 &&
      (queen.row == cell.row ||
        queen.col == cell.col ||
        Math.abs(queen.row - cell.row) == Math.abs(queen.col - cell.col))
    )
      return false;
  }
  return true;
};

var GetValidValues = function (queens, queen, options) {
  var validValues = [];
  for (var value = 1; value <= options.gridSize; value++) {
    if (isFreeCell({ row: queen.row, col: value }, queens)) validValues.push(value);
  }
  return validValues;
};

var SolveWithBacktracking = function (queens, id, options) {
  if (id == queens.length) return true;
  var queen = queens[id];
  var validValues = GetValidValues(queens, queen, options);
  while (validValues.length) {
    queen.col = GetRandFromList(validValues);
    if (SolveWithBacktracking(queens, id + 1, options)) return true;
    validValues = validValues.filter((val) => val != queen.col);
    queen.col = -1;
  }
  return false;
};

export { InitQueens, InitGrid, Solve };
