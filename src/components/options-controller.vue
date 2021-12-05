<template>
  <v-navigation-drawer :color="colors.base" dark width="300" permanent absolute>
    <sudoku-generator-options
      v-if="problem == problemsEnum.sudokuGenerator"
      :isDisabled="isDisabled"
      :colors="colors"
      :options="options"
      :chooseOption="chooseOption"
      :StartVisualization="StartVisualization"
    ></sudoku-generator-options>
  </v-navigation-drawer>
</template>

<script>
import sudokuGeneratorOptions from "./Sudoku/generator-options.vue";

import { problemsEnum } from "../config";
export default {
  name: "options-controller",
  components: { sudokuGeneratorOptions },
  props: ["options", "chooseOption", "isDisabled", "StartVisualization", "problem", "colors"],
  data: function () {
    return {
      problemsEnum: problemsEnum,
    };
  },
};
</script>
