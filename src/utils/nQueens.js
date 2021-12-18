import { mainConfig, visualConfig, nQueenConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum, optionsEnum } = nQueenConfig;

var InitQueens = function (options) {
  var queens = [];
  var size = options.gridSize;
  for (var id = 0; id < size; id++)
    queens.push({
      id,
      value: {
        row: -1,
        col: -1,
      },
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
  var steps = [];
  var queens = InitQueens(options);
  if (!SolveWithBacktracking(steps, 0, queens, options)) return -1;
  AddStep(steps, queens, { state: cellStatesEnum.succeed });
  AddStep(steps, queens, { state: cellStatesEnum.normal });
  return steps;
};

var ApplyForwardAction = function (actions, queens) {
  for (const action of actions) {
    var gridQueen = queens[action.queenId];
    gridQueen.value = action.newValue;
    gridQueen.state = action.newState;
  }
};

var ApplyBackAction = function (actions, cells) {
  for (const action of actions) {
    var gridCell = cells[action.queenId];
    gridCell.value = action.oldValue;
    gridCell.state = action.oldState;
  }
};

var isFreeCell = function (cell, queens) {
  return !queens.filter(
    (queen) =>
      queen.value.row != -1 &&
      queen.value.col != -1 &&
      (queen.value.row == cell.row ||
        queen.value.col == cell.col ||
        Math.abs(queen.value.row - cell.row) == Math.abs(queen.value.col - cell.col))
  ).length;
};

var GetValidValues = function (queens, options) {
  var validValues = [];
  for (var row = 1; row <= options.gridSize; row++)
    for (var col = 1; col <= options.gridSize; col++)
      if (isFreeCell({ row, col }, queens)) validValues.push({ row, col });
  return validValues;
};

var SolveWithBacktracking = function (steps, id, queens, options) {
  if (id == queens.length) return true;
  var queen = queens[id];
  var validValues = GetValidValues(queens, options).filter(
    (value) => !options.rowByRow || value.row == id + 1
  );
  while (validValues.length) {
    var change = {
      state: cellStatesEnum.try,
      newValue: GetRandFromList(validValues),
      validValuesCount: validValues.length,
    };
    AddStep(steps, [queen], change);
    if (SolveWithBacktracking(steps, id + 1, queens, options)) return true;
    visualConfig;
    if (steps.length > visualConfig.defaultValues.stepsNoLimit) return false;

    validValues = validValues.filter((val) => val.row != queen.value.row || val.col != queen.value.col);
    AddStep(steps, [queen], { state: cellStatesEnum.failed });
    AddStep(steps, [queen], { state: cellStatesEnum.empty });
  }
  return false;
};

var CellAsPair = function (cell) {
  return "(" + cell.row + ", " + cell.col + ")";
};

var DescribeStep = function (change) {
  var text = "";
  switch (change.state) {
    case cellStatesEnum.normal:
      text = "All queens was placed!";
      break;
    case cellStatesEnum.succeed:
      text = "Success!";
      break;
    case cellStatesEnum.failed:
      text = text = "Can't continue with: " + CellAsPair(change.oldValue);
      break;
    case cellStatesEnum.empty:
      text = text = "Removing queen from: " + CellAsPair(change.oldValue);
      break;
    case cellStatesEnum.const:
      text = text =
        change.validValuesCount + " valid cells, Putting queen in: " + CellAsPair(change.newValue);
      break;
    case cellStatesEnum.try:
      text = change.validValuesCount
        ? change.validValuesCount + " valid cells, Trying: " + CellAsPair(change.newValue)
        : "No valid cells";
  }
  var color = mainConfig.cellStatesList.find((state) => state.value == change.state).color;
  return { text, color };
};

var AddStep = function (steps, queens, change) {
  var actions = [];
  change.oldValue = queens[0].value;
  var description = DescribeStep(change);
  var { state, newValue, validValuesCount } = change;
  for (const queen of queens) {
    var action = {
      queenId: queen.id,
      oldState: queen.state,
      newState: change.state,
      oldValue: queen.value,
      newValue: state == cellStatesEnum.empty ? { row: -1, col: -1 } : newValue || queen.value,
      validValuesCount,
    };
    queen.state = action.newState;
    queen.value = action.newValue;
    actions.push(action);
  }
  steps.push({ actions, description });
};

export { InitQueens, UpdateQueens, InitGrid, Solve, ApplyForwardAction, ApplyBackAction };
