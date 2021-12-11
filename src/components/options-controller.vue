<template>
  <v-navigation-drawer :color="colors.base" dark width="300" permanent absolute>
    <sudoku-generator-options
      v-if="problem == problemsEnum.sudokuGenerator"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :ChooseOption="ChooseOption"
    ></sudoku-generator-options>
    <sudoku-solver-options
      v-else-if="problem == problemsEnum.sudokuSolver"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :ChooseOption="ChooseOption"
    >
    </sudoku-solver-options>
    <nQueensOptions
      v-else-if="problem == problemsEnum.nQueens"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :ChooseOption="ChooseOption"
    ></nQueensOptions>
    <v-btn
      class="option-item"
      elevation="4"
      block
      tile
      :disabled="isDisabled"
      :color="colors.primary"
      @click="StartVisualization"
    >
      Start Visualization
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import sudokuGeneratorOptions from "./Sudoku/generator-options.vue";
import sudokuSolverOptions from "./Sudoku/solver-options.vue";
import nQueensOptions from "./NQueens/n-queens-options";

import { mainConfig } from "../config";
var { problemsEnum } = mainConfig;

export default {
  name: "options-controller",
  components: { sudokuGeneratorOptions, sudokuSolverOptions, nQueensOptions },
  props: ["options", "ChooseOption", "isDisabled", "StartVisualization", "problem", "colors"],
  data: function () {
    return {
      problemsEnum: problemsEnum,
    };
  },
};
</script>
<style>
.options-container {
  margin: 80px 10px 0px 10px;
}

.option-item {
  margin-top: 20px;
}
</style>
