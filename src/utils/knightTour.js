import { mainConfig, visualConfig, knightTourConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum, optionsEnum } = knightTourConfig;

var InitCells = function (options) {
  var cells = [];
  for (var rowId = 1; rowId <= options.gridSize; rowId++)
    for (var colId = 1; colId <= options.gridSize; colId++)
      cells.push({
        id: (rowId - 1) * options.gridSize + colId - 1,
        row: rowId,
        col: colId,
        value: -1,
        state: cellStatesEnum.empty,
      });
  cells[0].value = 1;
  return cells;
};

var UpdateCells = function (options, changedOption, cells) {
  if (changedOption == optionsEnum.gridSize) return InitCells(options);
  return cells;
};

var InitGrid = function (cells, options) {
  var grid = [];
  var size = options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++) {
    var row = { id: rowId, value: [] };
    grid.push(row);
    for (var colId = 1; colId <= size; colId++)
      row.value.push(cells[(rowId - 1) * size + colId - 1]);
  }
  return grid;
};

var Solve = function (options) {
  var steps = [];
  var cells = InitCells(options);
  if (!SolveWithBacktracking(steps, 1, cells, options)) return -1;
  AddStep(steps, cells, { state: cellStatesEnum.succeed });
  AddStep(steps, cells, { state: cellStatesEnum.normal });
  return steps;
};

var ApplyForwardAction = function (actions, cells) {
  for (const action of actions) {
    var gridCell = cells[action.cellId];
    gridCell.value = action.newValue;
    gridCell.state = action.newState;
  }
};

var ApplyBackAction = function (actions, cells) {
  for (const action of actions) {
    var gridCell = cells[action.cellId];
    gridCell.value = action.oldValue;
    gridCell.state = action.oldState;
  }
};

var GetValidValues = function (knightCell, cells) {
  return cells.filter(
    (c) =>
      c.value == -1 &&
      ((Math.abs(knightCell.row - c.row) == 1 && Math.abs(knightCell.col - c.col) == 2) ||
        (Math.abs(knightCell.row - c.row) == 2 && Math.abs(knightCell.col - c.col) == 1))
  );
};

var GetKnightCell = function (cells, id) {
  return cells.find((c) => c.value == id);
};

var SolveWithBacktracking = function (steps, id, cells, options) {
  if (id == cells.length) return true;
  var knightCell = GetKnightCell(cells, id);
  var validValues = GetValidValues(knightCell, cells, options);
  while (validValues.length) {
    var cell = GetRandFromList(validValues);
    var change = {
      state: cellStatesEnum.try,
      newValue: id + 1,
      validValuesCount: validValues.length,
    };

    AddStep(steps, [cell], change);
    if (SolveWithBacktracking(steps, id + 1, cells, options)) return true;
    if (steps.length > visualConfig.defaultValues.stepsNoLimit) return false;

    validValues = validValues.filter((val) => val.id != cell.id);
    AddStep(steps, [cell], { state: cellStatesEnum.failed });
    AddStep(steps, [cell], { state: cellStatesEnum.empty });
  }
  return false;
};

var getCellPair = function (cell) {
  return "(" + cell.row + ", " + cell.col + ")";
};

var DescribeStep = function (change, cell) {
  var text = "";
  switch (change.state) {
    case cellStatesEnum.normal:
      text = "Knight visited all cells!";
      break;
    case cellStatesEnum.succeed:
      text = "Success!";
      break;
    case cellStatesEnum.failed:
      text = text = "Can't continue with: " + getCellPair(cell);
      break;
    case cellStatesEnum.empty:
      text = text = "Retreating from: " + getCellPair(cell);
      break;
    case cellStatesEnum.const:
      text = text =
        change.validValuesCount +
        " valid cells, Putting knight in: " +
        getCellPair(change.newValue);
      break;
    case cellStatesEnum.try:
      text = change.validValuesCount
        ? change.validValuesCount + " valid cells, Trying: " + getCellPair(cell)
        : "No valid cells";
  }
  var color = mainConfig.cellStatesList.find((state) => state.value == change.state).color;
  return { text, color };
};

var AddStep = function (steps, cells, change) {
  var actions = [];
  change.oldValue = cells[0].value;
  var description = DescribeStep(change, { row: cells[0].row, col: cells[0].col });
  var { state, newValue, validValuesCount } = change;
  for (const cell of cells) {
    var action = {
      cellId: cell.id,
      oldState: cell.state,
      newState: change.state,
      oldValue: cell.value,
      newValue: state == cellStatesEnum.empty ? -1 : newValue || cell.value,
      validValuesCount,
    };
    cell.state = action.newState;
    cell.value = action.newValue;
    actions.push(action);
  }
  steps.push({ actions, description });
};

export { InitCells, UpdateCells, InitGrid, Solve, ApplyForwardAction, ApplyBackAction };
