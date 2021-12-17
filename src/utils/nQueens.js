import { mainConfig, visualConfig, nQueenConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum, optionsEnum } = nQueenConfig;
var steps = [];

var InitQueens = function (options) {
  var queens = [];
  var size = options.gridSize;
  for (var id = 1; id <= size; id++)
    queens.push({
      id,
      row: -1,
      col: -1,
      state: cellStatesEnum.empty,
    });
  return queens;
};

var UpdateQueens = function (options, changedOption, cells) {
  if (changedOption == optionsEnum.gridSize) return InitQueens(options);
  return cells;
};

var InitGrid = function (options) {
  var grid = [];
  var size = options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++) {
    var row = { id: rowId, value: [] };
    grid.push(row);
    for (var colId = 1; colId <= size; colId++)
      row.value.push({ id: (rowId - 1) * size + colId, row: rowId, col: colId });
  }
  return grid;
};

var Solve = function (options) {
  steps = [];
  var queens = InitQueens(options);
  if (!SolveWithBacktracking(queens, 0, options)) return Solve(options);
  AddStep(queens, { state: cellStatesEnum.succeed }, options);
  AddStep(queens, { state: cellStatesEnum.const }, options);
  return steps;
};

var ApplyForwardAction = function (actions, queens) {
  for (const action of actions) {
    const { queen, after } = action;
    var gridQueen = queens.find((q) => q.id == queen.id);
    gridQueen.row = after.row;
    gridQueen.col = after.col;
    gridQueen.state = after.state;
  }
};

var ApplyBackAction = function (actions, queens) {
  for (const action of actions) {
    const { queen, before } = action;
    var gridQueen = queens.find((q) => q.id == queen.id);
    gridQueen.row = before.row;
    gridQueen.col = before.col;
    gridQueen.state = before.state;
  }
};

var isFreeCell = function (cell, queens) {
  return !queens.filter(
    (queen) =>
      queen.row != -1 &&
      queen.col != -1 &&
      (queen.row == cell.row ||
        queen.col == cell.col ||
        Math.abs(queen.row - cell.row) == Math.abs(queen.col - cell.col))
  ).length;
};

var GetValidValues = function (queens, options) {
  var validValues = [];
  for (var row = 1; row <= options.gridSize; row++)
    for (var col = 1; col <= options.gridSize; col++)
      if (isFreeCell({ row, col }, queens)) validValues.push({ row, col });
  return validValues;
};

var SolveWithBacktracking = function (queens, id, options) {
  if (id == queens.length) return true;
  var queen = queens[id];
  var validValues = GetValidValues(queens, options).filter(
    (queen) => !options.rowByRow || queen.row == id + 1
  );
  while (validValues.length) {
    var cell = GetRandFromList(validValues);
    AddStep([queen], { ...cell, state: cellStatesEnum.try, validValues }, options);
    if (SolveWithBacktracking(queens, id + 1, options)) return true;
    if (steps.length > visualConfig.defaultValues.stepsNoLimit) return false;

    validValues = validValues.filter((val) => val.row != queen.row || val.col != queen.col);
    AddStep([queen], { state: cellStatesEnum.failed }, options);
    AddStep([queen], { state: cellStatesEnum.empty }, options);
  }
  return false;
};

var DescribeStep = function (queens, step, options) {
  var oldCell = "(" + queens[0].row + ", " + queens[0].col + ")";
  var newCell = "(" + step.row + ", " + step.col + ")";
  var text = "";
  if (step.state == cellStatesEnum.succeed) text = "Success!";
  if (step.state == cellStatesEnum.failed) text = "Can't continue with: " + oldCell;
  if (step.state == cellStatesEnum.empty) text = "Removing queen from: " + oldCell;
  if (step.state == cellStatesEnum.const)
    text =
      queens.length == options.gridSize * options.gridSize
        ? "Putting queen in " + newCell
        : "Grid is complete!";
  if (step.state == cellStatesEnum.try)
    text = step.validValues.length
      ? step.validValues.length + " valid cells, Trying: " + newCell
      : "No valid cells";
  var color = mainConfig.cellStatesList.find((state) => state.value == step.state).color;
  return { text, color };
};

var AddStep = function (queens, after, options) {
  var actions = [];
  var description = DescribeStep(queens, after, options);
  for (const queen of queens) {
    var action = { queen, before: { ...queen } };
    queen.state = after.state;
    if (after.row) {
      queen.row = after.row;
      queen.col = after.col;
    }
    if (after.state == cellStatesEnum.empty) queen.row = queen.col = -1;
    action.after = { ...queen };
    actions.push(action);
  }
  steps.push({ actions, description });
};

export { InitQueens, UpdateQueens, InitGrid, Solve, ApplyForwardAction, ApplyBackAction };
