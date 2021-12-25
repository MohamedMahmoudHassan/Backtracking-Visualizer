var mainConfig = {
  colorsList: [
    { id: 1, label: "Red", value: "red" },
    { id: 2, label: "Pink", value: "pink" },
    { id: 3, label: "Purple", value: "purple" },
    { id: 4, label: "Deep Purple", value: "deep-purple" },
    { id: 5, label: "Indigo", value: "indigo" },
    { id: 6, label: "Blue", value: "blue" },
    { id: 7, label: "Light Blue", value: "light-blue" },
    { id: 8, label: "Cyan", value: "cyan" },
    { id: 9, label: "Teal", value: "teal" },
    { id: 10, label: "Green", value: "green" },
    { id: 11, label: "Light Green", value: "light-green" },
    { id: 12, label: "Lime", value: "lime" },
    { id: 13, label: "Deep Orange", value: "deep-orange" },
    { id: 14, label: "Amber", value: "amber" },
    { id: 15, label: "Orange", value: "orange" },
    // { id: 16, label: "Yellow", value: "yellow" },
    // { id: 17, label: "Brown", value: "brown" },
    // { id: 18, label: "Blue Grey", value: "blue-grey" },
    // { id: 19, label: "Grey", value: "grey" },
  ],
  problemsList: [
    {
      id: 1,
      label: "Sudoku Generator",
      value: "SudokuGenerator",
      color: "orange",
      icon: "mdi-grid",
    },
    { id: 2, label: "Sudoku Solver", value: "SudokuSolver", color: "green", icon: "mdi-grid" },
    { id: 3, label: "N-Queen", value: "NQueens", color: "indigo", icon: "mdi-chess-queen" },
    { id: 4, label: "Knight's Tour", value: "KnightTour", color: "red", icon: "mdi-chess-knight" },
  ],
  problemsEnum: {
    sudokuGenerator: "SudokuGenerator",
    sudokuSolver: "SudokuSolver",
    nQueens: "NQueens",
    knightTour: "KnightTour",
  },
  cellStatesList: [
    { id: 1, label: "Empty", value: "empty-cell", color: "empty" },
    { id: 2, label: "Const", value: "const-cell", color: "const" },
    { id: 3, label: "Try", value: "try-cell", color: "try" },
    { id: 4, label: "Failed", value: "failed-cell", color: "failed" },
    { id: 5, label: "Succeed", value: "succeed-cell", color: "succeed" },
    { id: 6, label: "Normal", value: "normal-cell", color: "const" },
    { id: 7, label: "valid", value: "valid-cell", color: "valid" },
    { id: 8, label: "Invalid", value: "invalid-cell", color: "invalid" },
  ],
  cellStatesEnum: {
    empty: "empty-cell",
    const: "const-cell",
    try: "try-cell",
    failed: "failed-cell",
    succeed: "succeed-cell",
    normal: "normal-cell",
    valid: "valid-cell",
    invalid: "invalid-cell",
  },
  defaultValues: {
    problem: "SudokuGenerator",
    colors: {
      primary: "purple",
      base: "secondary",
      try: "blue",
      failed: "red",
      succeed: "green",
      valid: "purple",
      const: "secondary",
      empty: "secondary",
      white: "white",
      black: "black",
    },
  },
};

var visualConfig = {
  modesEnum: {
    active: "active",
    paused: "paused",
    disabled: "disabled",
    searching: "searching",
  },
  speedsList: [
    { id: 1, label: "Slower", value: 1, interval: 5000 },
    { id: 2, label: "Slow", value: 2, interval: 1000 },
    { id: 3, label: "Normal", value: 3, interval: 500 },
    { id: 4, label: "Fast", value: 4, interval: 100 },
    { id: 5, label: "Faster", value: 5, interval: 0 },
  ],
  defaultValues: {
    mode: "disabled",
    speed: 3,
    currentStepId: 0,
    steps: [],
    descriptionList: [],
    stepsNoLimit: 100000,
    descriptionNoLimit: 7,
  },
};

var sudokuConfig = {
  gridSizesList: [
    // { id: 1, label: "1 x 1", value: 1 },
    { id: 2, label: "4 x 4", value: 2, isBig: false },
    { id: 3, label: "9 x 9", value: 3, isBig: false },
    { id: 4, label: "16 x 16", value: 4, isBig: true },
  ],
};

var sudokuGenConfig = {
  gridSizesList: sudokuConfig.gridSizesList,
  cellStatesList: mainConfig.cellStatesList,
  cellStatesEnum: mainConfig.cellStatesEnum,
  gridEmptinessLimits: { min: 30, max: 70 },
  optionsEnum: {
    gridSize: "gridSize",
    gridEmptiness: "gridEmptiness",
    diagonalsFirst: "diagonalsFirst",
  },
  defaultValues: {
    gridSize: 3,
    gridEmptiness: 50,
    diagonalsFirst: false,
  },
  optionsNeedRecreate: ["gridSize"],
  optionsNeedUpdate: [],
};

var sudokuSolConfig = {
  gridSizesList: sudokuConfig.gridSizesList,
  cellStatesList: mainConfig.cellStatesList,
  cellStatesEnum: mainConfig.cellStatesEnum,
  gridEmptinessLimits: { min: 30, max: 70, max16: 50 },
  optionsEnum: {
    gridSize: "gridSize",
    gridEmptiness: "gridEmptiness",
    bestFirst: "bestFirst",
  },
  defaultValues: {
    gridSize: 3,
    gridEmptiness: 50,
    bestFirst: true,
  },
  optionsNeedRecreate: ["gridSize"],
  optionsNeedUpdate: ["gridEmptiness"],
};

var nQueenConfig = {
  gridSizeLimits: { min: 4, max: 16, forceRowByRow: 10 },
  cellStatesList: mainConfig.cellStatesList,
  cellStatesEnum: mainConfig.cellStatesEnum,
  optionsEnum: {
    gridSize: "gridSize",
    rowByRow: "rowByRow",
  },
  defaultValues: {
    gridSize: 8,
    rowByRow: true,
  },
  optionsNeedRecreate: ["gridSize"],
  optionsNeedUpdate: [],
};

var knightTourConfig = {
  gridSizesList: [
    { id: 1, label: "5 x 5", value: 5 },
    { id: 2, label: "6 x 6", value: 6 },
  ],
  cellStatesList: mainConfig.cellStatesList,
  cellStatesEnum: mainConfig.cellStatesEnum,
  optionsEnum: {
    gridSize: "gridSize",
  },
  defaultValues: {
    gridSize: 5,
  },
  optionsNeedRecreate: ["gridSize"],
  optionsNeedUpdate: [],
};

export {
  mainConfig,
  visualConfig,
  sudokuConfig,
  sudokuGenConfig,
  sudokuSolConfig,
  nQueenConfig,
  knightTourConfig,
};
