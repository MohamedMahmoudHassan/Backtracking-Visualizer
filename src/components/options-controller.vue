<template>
  <v-navigation-drawer :color="colors.base" dark width="300" permanent absolute>
    <sudoku-generator-options
      v-if="problem == problemsEnum.sudokuGenerator"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :chooseOption="chooseOption"
    ></sudoku-generator-options>
    <sudoku-solver-options
      v-else-if="problem == problemsEnum.sudokuSolver"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :chooseOption="chooseOption"
    >
    </sudoku-solver-options>
    <v-btn
      :color="colors.primary"
      elevation="4"
      block
      tile
      :disabled="isDisabled"
      @click="StartVisualization"
      style="margin-top: 20px"
      >Start Visualization</v-btn
    >
  </v-navigation-drawer>
</template>

<script>
import sudokuGeneratorOptions from "./Sudoku/generator-options.vue";
import sudokuSolverOptions from "./Sudoku/solver-options.vue";

import { mainConfig } from "../config";
var { problemsEnum } = mainConfig;

export default {
  name: "options-controller",
  components: { sudokuGeneratorOptions, sudokuSolverOptions },
  props: ["options", "chooseOption", "isDisabled", "StartVisualization", "problem", "colors"],
  data: function () {
    return {
      problemsEnum: problemsEnum,
    };
  },
};
</script>
