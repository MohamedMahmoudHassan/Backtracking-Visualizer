<template>
  <div class="fill-height secondary">
    <v-card class="pa-3 secondary" dark tile outlined>
      <sudoku-generator-options
        v-if="problem == problemsEnum.sudokuGenerator"
        :isDisabled="isDisabled"
        :colors="colors"
        :options="options"
        :ChooseOption="ChooseOption"
        :StartVisualization="StartVisualization"
      ></sudoku-generator-options>
      <sudoku-solver-options
        v-else-if="problem == problemsEnum.sudokuSolver"
        :isDisabled="isDisabled"
        :colors="colors"
        :options="options"
        :ChooseOption="ChooseOption"
        :StartVisualization="StartVisualization"
      >
      </sudoku-solver-options>
      <n-queens-options
        v-else-if="problem == problemsEnum.nQueens"
        :isDisabled="isDisabled"
        :colors="colors"
        :options="options"
        :ChooseOption="ChooseOption"
        :StartVisualization="StartVisualization"
      ></n-queens-options>
      <knight-tour-options
        v-else-if="problem == problemsEnum.knightTour"
        :isDisabled="isDisabled"
        :colors="colors"
        :options="options"
        :ChooseOption="ChooseOption"
        :StartVisualization="StartVisualization"
      ></knight-tour-options>
    </v-card>
    <v-btn
      elevation="4"
      tile
      block
      v-if="!$vuetify.breakpoint.sm"
      dark
      :disabled="isDisabled"
      :color="colors.primary"
      @click="StartVisualization()"
    >
      Start Visualization
    </v-btn>
  </div>
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
