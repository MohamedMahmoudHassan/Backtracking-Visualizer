import { mainConfig, sudokuGenConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum, optionsEnum } = sudokuGenConfig;

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
  var steps = [];
  var cells = InitCells(options);
  if (options[optionsEnum.diagonalsFirst]) {
    var diagSubGridsCells = cells.filter((cell) => cell.subGridRow == cell.subGridCol);
    FillDiagonalSubGrids(steps, diagSubGridsCells, options);

    var nonDiagSubGridsCells = cells.filter((cell) => cell.subGridRow != cell.subGridCol);
    if (!SolveWithBacktracking(steps, 0, nonDiagSubGridsCells, cells, options)) return -1;
    AddStep(steps, nonDiagSubGridsCells, { state: cellStatesEnum.succeed });
    AddStep(steps, nonDiagSubGridsCells, { state: cellStatesEnum.normal });
  } else {
    if (!SolveWithBacktracking(steps, 0, cells, cells, options)) return -1;
    AddStep(steps, cells, { state: cellStatesEnum.succeed });
    AddStep(steps, cells, { state: cellStatesEnum.normal });
  }
  RemoveRandCells(steps, cells, options);
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

var SolveWithBacktracking = function (steps, id, cells, gridCells, options) {
  if (id == cells.length) return true;
  var cell = cells[id];
  var validValues = GetValidValues(gridCells, cell, options);
  while (validValues.length) {
    var change = {
      state: cellStatesEnum.try,
      newValue: GetRandFromList(validValues),
      validValuesCount: validValues.length,
    };
    AddStep(steps, [cell], change);

    if (SolveWithBacktracking(steps, id + 1, cells, gridCells, options)) return true;
    if (steps.length > sudokuGenConfig.stepsNoLimit) return false;

    validValues = validValues.filter((val) => val != cell.value);
    AddStep(steps, [cell], { state: cellStatesEnum.failed });
    AddStep(steps, [cell], { state: cellStatesEnum.empty });
  }
  return false;
};

var FillDiagonalSubGrids = function (steps, cells, options) {
  for (const cell of cells) {
    var validValues = GetValidValues(cells, cell, options);
    var change = {
      state: cellStatesEnum.const,
      newValue: GetRandFromList(validValues),
      validValuesCount: validValues.length,
    };
    AddStep(steps, [cell], change);
  }
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

var RemoveRandCells = function (steps, cells, options) {
  var needToRemove = Math.round((options.gridEmptiness * cells.length) / 100);
  while (needToRemove) {
    var cell = GetRandFromList(cells);
    if (cell.state != cellStatesEnum.empty) {
      AddStep(steps, [cell], { state: cellStatesEnum.empty });
      needToRemove--;
    }
  }
};

var DescribeStep = function (change) {
  var text = "";
  switch (change.state) {
    case cellStatesEnum.normal:
      text = "Grid is complete!";
      break;
    case cellStatesEnum.succeed:
      text = "Success!";
      break;
    case cellStatesEnum.failed:
      text = text = "Can't continue with value: " + change.oldValue;
      break;
    case cellStatesEnum.empty:
      text = text = "Removing value: " + change.oldValue;
      break;
    case cellStatesEnum.const:
      text = text = change.validValuesCount + " valid values, Putting: " + change.newValue;
      break;
    case cellStatesEnum.try:
      text = change.validValuesCount
        ? change.validValuesCount + " valid values, Trying: " + change.newValue
        : "No valid values";
  }
  var color = mainConfig.cellStatesList.find((state) => state.value == change.state).color;
  return { text, color };
};

var AddStep = function (steps, cells, change) {
  var actions = [];
  change.oldValue = cells[0].value;
  var description = DescribeStep(change);
  var { state, newValue, validValuesCount } = change;
  for (const cell of cells) {
    var action = {
      cellId: cell.id,
      oldState: cell.state,
      newState: change.state,
      oldValue: cell.value,
      newValue: state == cellStatesEnum.empty ? 0 : newValue || cell.value,
      validValuesCount,
    };
    cell.state = action.newState;
    cell.value = action.newValue;
    actions.push(action);
  }
  steps.push({ actions, description });
};

export { InitCells, InitGrid, Solve, ApplyForwardAction, ApplyBackAction };
