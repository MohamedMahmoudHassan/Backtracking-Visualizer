<template>
  <v-card elevation="3" width="600" class="main-grid">
    <sudoku-grid
      v-if="problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver"
      :grid="grid"
      :options="options"
      :colors="colors"
    ></sudoku-grid>
    <n-queens-grid v-else :grid="grid" :options="options" :colors="colors"></n-queens-grid>
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
