import {
  mainConfig,
  sudokuGenConfig,
  sudokuSolConfig,
  nQueenConfig,
  knightTourConfig,
} from "../config";

import {
  ApplyForwardAction as SudokuApplyForward,
  ApplyBackAction as SudokuApplyBack,
} from "./sudoku";

import {
  InitCells as SudokuGeneratorInit,
  UpdateCells as SudokuGeneratorUpdate,
  Solve as SolveSudokuGenerator,
} from "./sudokuGenerator";

import {
  InitCells as SudokuSolverInit,
  UpdateCells as SudokuSolverUpdate,
  Solve as SolveSudokuSolver,
} from "./sudokuSolver";

import {
  InitQueens as NQueensInit,
  UpdateQueens as NQueensUpdate,
  Solve as SolveNQueens,
  ApplyForwardAction as NQueensApplyForward,
  ApplyBackAction as NQueensApplyBack,
} from "./nQueens";

import {
  InitCells as KnightTourInit,
  UpdateCells as KnightTourUpdate,
  Solve as SolveKnightTour,
  ApplyForwardAction as KnightTourApplyForward,
  ApplyBackAction as KnightTourApplyBack,
} from "./knightTour";

var { problemsEnum } = mainConfig;

var GetRandFromList = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var GetDefaultOptions = function (problem) {
  if (problem == problemsEnum.sudokuGenerator) return { ...sudokuGenConfig.defaultValues };
  if (problem == problemsEnum.sudokuSolver) return { ...sudokuSolConfig.defaultValues };
  if (problem == problemsEnum.nQueens) return { ...nQueenConfig.defaultValues };
  if (problem == problemsEnum.knightTour) return { ...knightTourConfig.defaultValues };
};

var InitGrid = function (problem, options) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGeneratorInit(options);
  if (problem == problemsEnum.sudokuSolver) return SudokuSolverInit(options);
  if (problem == problemsEnum.nQueens) return NQueensInit(options);
  if (problem == problemsEnum.knightTour) return KnightTourInit(options);
};

var UpdateGrid = function (problem, options, changedOption, grid) {
  if (problem == problemsEnum.sudokuGenerator)
    return SudokuGeneratorUpdate(options, changedOption, grid);
  if (problem == problemsEnum.sudokuSolver) return SudokuSolverUpdate(options, changedOption, grid);
  if (problem == problemsEnum.nQueens) return NQueensUpdate(options, changedOption, grid);
  if (problem == problemsEnum.knightTour) return KnightTourUpdate(options, changedOption, grid);
};

var Solve = function (problem, options, grid) {
  if (problem == problemsEnum.sudokuGenerator) return SolveSudokuGenerator(options);
  if (problem == problemsEnum.sudokuSolver) return SolveSudokuSolver(options, grid);
  if (problem == problemsEnum.nQueens) return SolveNQueens(options);
  if (problem == problemsEnum.knightTour) return SolveKnightTour(options);
};

var ApplyForwardAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver)
    return SudokuApplyForward(actions, grid);
  if (problem == problemsEnum.nQueens) return NQueensApplyForward(actions, grid);
  if (problem == problemsEnum.knightTour) return KnightTourApplyForward(actions, grid);
};

var ApplyBackAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver)
    return SudokuApplyBack(actions, grid);
  if (problem == problemsEnum.nQueens) return NQueensApplyBack(actions, grid);
  if (problem == problemsEnum.knightTour) return KnightTourApplyBack(actions, grid);
};

export {
  GetRandFromList,
  GetDefaultOptions,
  InitGrid,
  UpdateGrid,
  Solve,
  ApplyForwardAction,
  ApplyBackAction,
};
