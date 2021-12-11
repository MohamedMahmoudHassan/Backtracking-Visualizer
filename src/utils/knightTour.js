import { mainConfig, visualConfig, knightTourConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum } = knightTourConfig;

var InitCells = function (options) {
  var cells = [];
  for (var rowId = 1; rowId <= options.gridSize; rowId++)
    for (var colId = 1; colId <= options.gridSize; colId++)
      cells.push({
        id: (rowId - 1) * options.gridSize + colId,
        row: rowId,
        col: colId,
        value: -1,
        state: cellStatesEnum.empty,
      });
  cells[0].value = 1;
  return cells;
};

var InitGrid = function (cells, options) {
  var grid = [];
  var size = options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++) {
    var row = { id: rowId, value: [] };
    grid.push(row);
    for (var colId = 1; colId <= size; colId++)
      row.value.push(cells.find((cell) => cell.row == rowId && cell.col == colId));
  }
  return grid;
};

var Solve = function (options) {
  var steps = [];
  var cells = InitCells(options);
  if (!SolveWithBacktracking(cells, 1, options, steps)) return Solve(options);
  AddStep(steps, cells, cellStatesEnum.succeed);
  AddStep(steps, cells, cellStatesEnum.normal);
  return steps;
};

var ApplyForwardAction = function (actions, cells) {
  for (const action of actions) {
    const { cell, after } = action;
    var gridCell = cells.find((c) => c.id == cell.id);
    gridCell.value = after.value;
    gridCell.state = after.state;
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

var GetValidValues = function (knightCell, cells) {
  return cells.filter(
    (c) =>
      c.value == -1 &&
      ((Math.abs(knightCell.row - c.row) == 1 && Math.abs(knightCell.col - c.col) == 2) ||
        (Math.abs(knightCell.row - c.row) == 2 && Math.abs(knightCell.col - c.col) == 1))
  );
};

var SolveWithBacktracking = function (cells, id, options, steps) {
  if (id == cells.length) return true;
  var knightCell = cells.find((c) => c.value == id);
  var validValues = GetValidValues(knightCell, cells, options);
  while (validValues.length) {
    var cell = GetRandFromList(validValues);
    AddStep(steps, [cell], cellStatesEnum.try, {
      validValuesNo: validValues.length,
      value: id + 1,
    });
    if (SolveWithBacktracking(cells, id + 1, options, steps)) return true;
    if (steps.length > visualConfig.defaultValues.stepsNoLimit) return false;
    validValues = validValues.filter((val) => val.id != cell.id);
    AddStep(steps, [cell], cellStatesEnum.failed);
    AddStep(steps, [cell], cellStatesEnum.empty);
  }
  return false;
};

var getCellPair = function (cell) {
  return "(" + cell.row + ", " + cell.col + ")";
};

var DescribeStep = function (state, oldCell, newCell) {
  var text = "";
  if (state == cellStatesEnum.succeed) text = "Success!";
  if (state == cellStatesEnum.normal) text = "Knight visited all cells!";
  if (state == cellStatesEnum.failed) text = "Can't continue with: " + getCellPair(oldCell);
  if (state == cellStatesEnum.empty) text = "Retreating from: " + getCellPair(oldCell);
  if (state == cellStatesEnum.try)
    text = newCell.validValuesNo
      ? newCell.validValuesNo + " valid cells, Trying: " + getCellPair(oldCell)
      : "No valid cells";
  var color = mainConfig.cellStatesList.find((s) => s.value == state).color;
  return { text, color };
};

var AddStep = function (steps, cells, state, newCell) {
  var actions = [];
  var description = DescribeStep(state, cells[0], newCell);
  for (const cell of cells) {
    var action = { cell, before: { ...cell }, after: {} };
    cell.state = state;
    if (state == cellStatesEnum.try || state == cellStatesEnum.const) cell.value = newCell.value;
    if (state == cellStatesEnum.empty) cell.value = -1;
    action.after = { ...cell };
    actions.push(action);
  }
  steps.push({ actions, description });
};

export { InitCells, InitGrid, Solve, ApplyForwardAction, ApplyBackAction };
