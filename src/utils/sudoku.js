import { mainConfig, visualConfig } from "../config";
import { GetRandFromList } from "./helpers";

var { cellStatesEnum } = mainConfig;

var InitEmptyCells = function (options) {
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
      row.value.push(cells[(rowId - 1) * size + colId - 1]);
  }
  return grid;
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
  var cell = options.bestFirst ? GetBestCell(cells, gridCells, options) : cells[id];
  var validValues = GetValidValues(gridCells, cell, options);
  while (validValues.length) {
    var change = {
      state: cellStatesEnum.try,
      newValue: GetRandFromList(validValues),
      validValuesCount: validValues.length,
    };
    AddStep(steps, [cell], change);

    if (SolveWithBacktracking(steps, id + 1, cells, gridCells, options)) return true;
    if (steps.length > visualConfig.defaultValues.stepsNoLimit) return false;

    validValues = validValues.filter((val) => val != cell.value);
    AddStep(steps, [cell], { state: cellStatesEnum.failed });
    AddStep(steps, [cell], { state: cellStatesEnum.empty });
  }
  return false;
};

var GetBestCell = function (cells, gridCells, options) {
  var bestCell = { id: -1, validValuesCount: options.gridSize * options.gridSize + 1 };
  for (var cell of cells) {
    if (cell.state == cellStatesEnum.empty) {
      var validValuesCount = GetValidValues(gridCells, cell, options).length;
      if (validValuesCount < bestCell.validValuesCount)
        bestCell = { id: cell.id, validValuesCount };
    }
  }
  return gridCells[bestCell.id];
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

export {
  InitEmptyCells,
  InitGrid,
  ApplyForwardAction,
  ApplyBackAction,
  SolveWithBacktracking,
  GetValidValues,
  AddStep,
};
