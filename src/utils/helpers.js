import {
  mainConfig,
  sudokuGenConfig,
  sudokuSolConfig,
  nQueenConfig,
  knightTourConfig,
} from "../config";

import {
  InitFilledCells as SudokuSolInit,
  SolveGrid as SudokuSolSolve,
  ApplyForwardAction as SudokuApplyForward,
  ApplyBackAction as SudokuApplyBack,
} from "./sudoku";

import {
  InitCells as SudokuGeneratorInit,
  Solve as SolveSudokuGenerator,
  ApplyForwardAction as SudokuGeneratorApplyForward,
  ApplyBackAction as SudokuGeneratorApplyBack,
} from "./SudokuGenerator";

import {
  InitQueens as NQueensInit,
  Solve as SolveNQueens,
  ApplyForwardAction as NQueensApplyForward,
  ApplyBackAction as NQueensApplyBack,
} from "./nQueens";

import {
  InitCells as KnightTourInit,
  Solve as SolveKnightTour,
  ApplyForwardAction as KnightTourApplyForward,
  ApplyBackAction as KnightTourApplyBack,
} from "./knightTour";

var { problemsEnum } = mainConfig;

var GetRandFromList = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var GetDefaultOptions = function (problem) {
  if (problem == problemsEnum.sudokuGenerator) return sudokuGenConfig.defaultValues;
  if (problem == problemsEnum.sudokuSolver) return sudokuSolConfig.defaultValues;
  if (problem == problemsEnum.nQueens) return nQueenConfig.defaultValues;
  if (problem == problemsEnum.knightTour) return knightTourConfig.defaultValues;
};

var GetOptionsNeedRecreate = function (problem) {
  if (problem == problemsEnum.sudokuGenerator) return sudokuGenConfig.optionsNeedRecreate;
  if (problem == problemsEnum.sudokuSolver) return sudokuSolConfig.optionsNeedRecreate;
  if (problem == problemsEnum.nQueens) return nQueenConfig.optionsNeedRecreate;
  if (problem == problemsEnum.knightTour) return knightTourConfig.optionsNeedRecreate;
};

var InitGrid = function (problem, options) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGeneratorInit(options);
  if (problem == problemsEnum.sudokuSolver) return SudokuSolInit(options);
  if (problem == problemsEnum.nQueens) return NQueensInit(options);
  if (problem == problemsEnum.knightTour) return KnightTourInit(options);
};

var Solve = function (problem, options, grid) {
  if (problem == problemsEnum.sudokuGenerator) return SolveSudokuGenerator(options);
  if (problem == problemsEnum.sudokuSolver) return SudokuSolSolve(options, grid);
  if (problem == problemsEnum.nQueens) return SolveNQueens(options);
  if (problem == problemsEnum.knightTour) return SolveKnightTour(options);
};

var ApplyForwardAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator) SudokuGeneratorApplyForward(actions, grid);
  if (problem == problemsEnum.sudokuSolver) return SudokuApplyForward(actions, grid);
  if (problem == problemsEnum.nQueens) return NQueensApplyForward(actions, grid);
  if (problem == problemsEnum.knightTour) return KnightTourApplyForward(actions, grid);
};

var ApplyBackAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator) SudokuGeneratorApplyBack(actions, grid);
  if (problem == problemsEnum.sudokuSolver) return SudokuApplyBack(actions, grid);
  if (problem == problemsEnum.nQueens) return NQueensApplyBack(actions, grid);
  if (problem == problemsEnum.knightTour) return KnightTourApplyBack(actions, grid);
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
