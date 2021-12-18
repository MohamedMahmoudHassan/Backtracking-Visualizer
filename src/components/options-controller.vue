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
    <n-queens-options
      v-else-if="problem == problemsEnum.nQueens"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :ChooseOption="ChooseOption"
    ></n-queens-options>
    <knight-tour-options
      v-else-if="problem == problemsEnum.knightTour"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :ChooseOption="ChooseOption"
    ></knight-tour-options>
    <v-btn
      class="option-item"
      elevation="4"
      block
      tile
      :disabled="isDisabled"
      :color="colors.primary"
      @click="StartVisualization()"
    >
      Start Visualization
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import sudokuGeneratorOptions from "./Sudoku/generator-options.vue";
import sudokuSolverOptions from "./Sudoku/solver-options.vue";
import nQueensOptions from "./NQueens/n-queens-options.vue";
import knightTourOptions from "./KnightTour/knight-tour-options.vue";

import { mainConfig } from "../config";
var { problemsEnum } = mainConfig;

export default {
  name: "options-controller",
  components: { sudokuGeneratorOptions, sudokuSolverOptions, nQueensOptions, knightTourOptions },
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
