import { mainConfig, sudokuGenConfig, sudokuSolConfig } from "../config";

import {
  InitCells as SudokuGenInit,
  InitFilledCells as SudokuSolInit,
  FillGrid as SudokuGenSolve,
  SolveGrid as SudokuSolSolve,
  ApplyForwardAction as SudokuApplyForward,
  ApplyBackAction as SudokuApplyBack,
} from "./sudoku";

var { problemsEnum } = mainConfig;

var GetRandFromList = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var GetDefaultOptions = function (problem) {
  if (problem == problemsEnum.sudokuGenerator) return sudokuGenConfig.defaultValues;
  if (problem == problemsEnum.sudokuSolver) return sudokuSolConfig.defaultValues;
};

var GetOptionsNeedRecreate = function (problem) {
  if (problem == problemsEnum.sudokuGenerator) return sudokuGenConfig.optionsNeedRecreate;
  if (problem == problemsEnum.sudokuSolver) return sudokuSolConfig.optionsNeedRecreate;
};

var InitGrid = function (problem, options) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGenInit(options);
  if (problem == problemsEnum.sudokuSolver) return SudokuSolInit(options);
};

var Solve = function (problem, options, grid) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGenSolve(options, grid);
  if (problem == problemsEnum.sudokuSolver) return SudokuSolSolve(options, grid);
};

var ApplyForwardAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver)
    return SudokuApplyForward(actions, grid);
};

var ApplyBackAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver)
    return SudokuApplyBack(actions, grid);
};

export {
  GetRandFromList,
  GetDefaultOptions,
  GetOptionsNeedRecreate,
  InitGrid,
  Solve,
  ApplyForwardAction,
  ApplyBackAction,
};
