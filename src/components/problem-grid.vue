<template>
  <v-card elevation="3" color="grey lighten-5" width="600" style="margin: 20px 0px 0px 350px">
    <sudoku-grid
      v-if="problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver"
      :grid="grid"
      :changeGrid="changeGrid"
      :options="options"
      :colors="colors"
    ></sudoku-grid>
  </v-card>
</template>

<script>
import sudokuGrid from "./Sudoku/sudoku-grid.vue";

import { mainConfig } from "../config";
var { problemsEnum } = mainConfig;

export default {
  name: "problem-grid",
  components: { sudokuGrid },
  props: ["grid", "changeGrid", "options", "problem", "colors"],
  data: function () {
    return {
      problemsEnum: problemsEnum,
    };
  },
};
</script>
