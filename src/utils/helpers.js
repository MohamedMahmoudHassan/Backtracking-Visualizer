import { mainConfig, sudokuGenConfig, sudokuSolConfig, nQueenConfig } from "../config";

import {
  InitCells as SudokuGenInit,
  InitFilledCells as SudokuSolInit,
  FillGrid as SudokuGenSolve,
  SolveGrid as SudokuSolSolve,
  ApplyForwardAction as SudokuApplyForward,
  ApplyBackAction as SudokuApplyBack,
} from "./sudoku";

import { InitQueens } from "./nQueens";

var { problemsEnum } = mainConfig;

var GetRandFromList = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var GetDefaultOptions = function (problem) {
  if (problem == problemsEnum.sudokuGenerator) return sudokuGenConfig.defaultValues;
  if (problem == problemsEnum.sudokuSolver) return sudokuSolConfig.defaultValues;
  if (problem == problemsEnum.nQueens) return nQueenConfig.defaultValues;
};

var GetOptionsNeedRecreate = function (problem) {
  if (problem == problemsEnum.sudokuGenerator) return sudokuGenConfig.optionsNeedRecreate;
  if (problem == problemsEnum.sudokuSolver) return sudokuSolConfig.optionsNeedRecreate;
  if (problem == problemsEnum.nQueens) return nQueenConfig.optionsNeedRecreate;
};

var InitGrid = function (problem, options) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGenInit(options);
  if (problem == problemsEnum.sudokuSolver) return SudokuSolInit(options);
  if (problem == problemsEnum.nQueens) return InitQueens(options);
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
