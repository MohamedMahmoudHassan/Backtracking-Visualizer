<template>
  <v-card elevation="3" width="600" class="main-grid">
    <sudoku-grid
      v-if="problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver"
      :grid="grid"
      :options="options"
      :colors="colors"
    ></sudoku-grid>
    <n-queens-grid
      v-else-if="problem == problemsEnum.nQueens"
      :grid="grid"
      :options="options"
      :colors="colors"
    ></n-queens-grid>
    <knight-tour-grid
      v-else-if="problem == problemsEnum.knightTour"
      :grid="grid"
      :options="options"
      :colors="colors"
    ></knight-tour-grid>
  </v-card>
</template>

<script>
import sudokuGrid from "./Sudoku/sudoku-grid.vue";
import nQueensGrid from "./NQueens/n-queens-grid.vue";
import knightTourGrid from "./KnightTour/knight-tour-grid.vue";

import { mainConfig } from "../config";
var { problemsEnum } = mainConfig;

export default {
  name: "problem-grid",
  components: { sudokuGrid, nQueensGrid, knightTourGrid },
  props: ["grid", "problem", "options", "colors"],
  data: function () {
    return {
      problemsEnum: problemsEnum,
    };
  },
};
</script>

<style>
.main-grid {
  margin: 20px 0px 0px 350px;
}
</style>
