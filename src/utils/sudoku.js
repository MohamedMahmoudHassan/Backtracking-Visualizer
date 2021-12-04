import { sudoku } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum, optionsEnum } = sudoku;
var steps = [];

var InitCells = function (options) {
  var cells = [];
  var size = options.gridSize * options.gridSize;
  for (var rowId = 1; rowId <= size; rowId++)
    for (var colId = 1; colId <= size; colId++)
      cells.push({
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
      row.value.push(cells.find((cell) => cell.row == rowId && cell.col == colId));
  }
  return grid;
};

var FillGrid = function (options) {
  steps = [];
  var cells = InitCells(options);
  if (options[optionsEnum.diagonalsFirst]) {
    var diagSubGridsCells = cells.filter((cell) => cell.subGridRow == cell.subGridCol);
    FillDiagonalSubGrids(diagSubGridsCells, options);

    var nonDiagSubGridsCells = cells.filter((cell) => cell.subGridRow != cell.subGridCol);
    FillCellsWithBacktracking(nonDiagSubGridsCells, cells, 0, options);
    UpdateCells(nonDiagSubGridsCells, { state: cellStatesEnum.succeed }, options);
    UpdateCells(nonDiagSubGridsCells, { state: cellStatesEnum.const }, options);
  } else {
    FillCellsWithBacktracking(cells, cells, 0, options);
    UpdateCells(cells, { state: cellStatesEnum.succeed }, options);
    UpdateCells(cells, { state: cellStatesEnum.const }, options);
  }
  RemoveRandCells(cells, options);
  return steps;
};

var FillCellsWithBacktracking = function (cells, gridCells, id, options) {
  if (id == cells.length) return true;
  var cell = cells[id];
  var validValues = GetValidCellValues(gridCells, cell, options);
  while (validValues.length) {
    UpdateCells(
      [cell],
      {
        value: GetRandFromList(validValues),
        state: cellStatesEnum.try,
        validValues,
      },
      options
    );
    if (FillCellsWithBacktracking(cells, gridCells, id + 1, options)) return true;

    validValues = validValues.filter((val) => val != cell.value);
    UpdateCells([cell], { state: cellStatesEnum.failed }, options);
    UpdateCells([cell], { state: cellStatesEnum.empty }, options);
  }
  return false;
};

var FillDiagonalSubGrids = function (cells, options) {
  for (const cell of cells)
    UpdateCells(
      [cell],
      {
        value: GetRandFromList(GetValidCellValues(cells, cell, options)),
        state: cellStatesEnum.const,
      },
      options
    );
};

var CellsConflict = function (cell1, cell2) {
  return (
    cell1.row == cell2.row ||
    cell1.col == cell2.col ||
    (cell1.subGridRow == cell2.subGridRow && cell1.subGridCol == cell2.subGridCol)
  );
};

var GetValidCellValues = function (cells, cell, options) {
  var maxValue = options.gridSize * options.gridSize;
  var validValues = Array.from({ length: maxValue }, (_, i) => i + 1);
  for (const c of cells)
    if (CellsConflict(c, cell)) validValues = validValues.filter((value) => value != c.value);
  return validValues;
};

var DescribeStep = function (cells, step, options) {
  if (step.state == cellStatesEnum.succeed) return "Success!";
  if (step.state == cellStatesEnum.failed) return "Can't continue with value " + cells[0].value;
  if (step.state == cellStatesEnum.empty) return "Removing value " + cells[0].value;
  if (step.state == cellStatesEnum.const)
    return cells.length == options.gridSize * options.gridSize
      ? "Putting value " + cells[0].value
      : "Grid is complete!";
  if (step.state == cellStatesEnum.try)
    return step.validValues.length
      ? "Valid values: " + step.validValues + " | trying: " + step.value
      : "No valid values";
};

var UpdateCells = function (cells, after, options) {
  var actions = [];
  var description = DescribeStep(cells, after, options);
  for (const cell of cells) {
    var action = { cell, before: { ...cell } };
    cell.state = after.state;
    if (after.value) cell.value = after.value;
    if (after.state == cellStatesEnum.empty) cell.value = 0;
    action.after = { ...cell };
    actions.push(action);
  }
  steps.push({ actions, description });
};

var RemoveRandCells = function (cells, options) {
  var needToRemove = Math.round((options.gridEmptiness * cells.length) / 100);
  while (needToRemove) {
    var cell = GetRandFromList(cells);
    if (cell.state != cellStatesEnum.empty) {
      UpdateCells([cell], { state: cellStatesEnum.empty }, options);
      needToRemove--;
    }
  }
};

var ApplyForwardAction = function (actions, cells) {
  for (const action of actions) {
    const { cell, after } = action;
    var gridCell = cells.find((c) => c.row == cell.row && c.col == cell.col);
    gridCell.value = after.value;
    gridCell.state = after.state;
  }
};

var ApplyBackAction = function (actions, cells) {
  for (const action of actions) {
    const { cell, before } = action;
    var gridCell = cells.find((c) => c.row == cell.row && c.col == cell.col);
    gridCell.value = before.value;
    gridCell.state = before.state;
  }
};

export { InitCells, InitGrid, FillGrid, ApplyForwardAction, ApplyBackAction };
