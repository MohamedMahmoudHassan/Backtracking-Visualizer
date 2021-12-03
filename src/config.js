var colorsList = [
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
  { id: 13, label: "Yellow", value: "yellow" },
  { id: 14, label: "Amber", value: "amber" },
  { id: 15, label: "Orange", value: "orange" },
  { id: 16, label: "Deep Orange", value: "deep-orange" },
  { id: 17, label: "Brown", value: "brown" },
  { id: 18, label: "Blue Grey", value: "blue-grey" },
  { id: 19, label: "Grey", value: "grey" },
];

var problemsList = [
  {
    id: 1,
    label: "Sudoku Generator",
    value: "SudokuGenerator",
    color: colorsList.find((c) => c.value == "red"),
  },
  {
    id: 2,
    label: "Sudoku Solver",
    value: "SudokuSolver",
    color: colorsList.find((c) => c.value == "blue"),
  },
  {
    id: 3,
    label: "N-Queens",
    value: "NQueens",
    color: colorsList.find((c) => c.value == "purple"),
  },
];

var sudoku = {
  gridSizesList: [
    // { id: 1, label: "1 x 1", value: 1 },
    { id: 2, label: "2 x 2", value: 2 },
    { id: 3, label: "3 x 3", value: 3 },
    { id: 4, label: "4 x 4", value: 4 },
  ],
};

export { colorsList, problemsList, sudoku };
