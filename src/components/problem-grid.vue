<template>
  <v-card elevation="3"  width="600" class="main-grid">
    <sudoku-grid
      v-if="problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver"
      :grid="grid"
      :options="options"
      :colors="colors"
      :ChangeGrid="ChangeGrid"
    ></sudoku-grid>
    <n-queens-grid v-else :colors="colors"></n-queens-grid>
  </v-card>
</template>

<script>
import sudokuGrid from "./Sudoku/sudoku-grid.vue";
import nQueensGrid from "./NQueens/n-queens-grid.vue";

import { mainConfig } from "../config";
var { problemsEnum } = mainConfig;

export default {
  name: "problem-grid",
  components: { sudokuGrid, nQueensGrid },
  props: ["grid", "problem", "options", "colors", "ChangeGrid"],
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
