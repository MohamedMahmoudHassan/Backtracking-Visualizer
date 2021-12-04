<template>
  <v-navigation-drawer :color="colors.base" dark width="300" permanent absolute>
    <sudoku-generator-options
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
export default {
  name: "options-controller",
  components: { sudokuGeneratorOptions },
  props: ["options", "chooseOption", "isDisabled", "StartVisualization", "colors"],
  data: function () {
    return {};
  },
};
</script>
