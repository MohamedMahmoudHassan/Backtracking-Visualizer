import { problemsEnum } from "../config";

import {
  InitCells as SudokuGenInit,
  FillGrid as SudokuGenSolve,
  ApplyForwardAction as SudokuGenApplyForward,
  ApplyBackAction as SudokuGenApplyBack,
} from "./sudoku";

var GetRandFromList = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var InitGrid = function (problem, options) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGenInit(options);
};

var Solve = function (problem, options, grid) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGenSolve(options, grid);
};

var ApplyForwardAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGenApplyForward(actions, grid);
};

var ApplyBackAction = function (problem, actions, grid) {
  if (problem == problemsEnum.sudokuGenerator) return SudokuGenApplyBack(actions, grid);
};

export { GetRandFromList, InitGrid, Solve, ApplyForwardAction, ApplyBackAction };
