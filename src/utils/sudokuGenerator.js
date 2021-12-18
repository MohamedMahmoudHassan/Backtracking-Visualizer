import { sudokuGenConfig } from "../config";
import { GetRandFromList } from "./helpers";
import { AddStep, GetValidValues, InitEmptyCells, SolveWithBacktracking } from "./sudoku";

var { cellStatesEnum, optionsEnum } = sudokuGenConfig;

var InitCells = function (options) {
  return InitEmptyCells(options);
};

var UpdateCells = function (options, changedOption, cells) {
  if (changedOption == optionsEnum.gridSize) return InitCells(options);
  return cells;
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

export { InitCells, UpdateCells, Solve };
