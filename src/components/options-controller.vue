<template>
  <v-navigation-drawer :color="colors.base" dark width="300" permanent absolute>
    <sudoku-generator-options
      :colors="colors"
      :options="options"
      :chooseOption="chooseOption"
    ></sudoku-generator-options>
  </v-navigation-drawer>
</template>

<script>
import sudokuGeneratorOptions from "./Sudoku/generator-options.vue";
export default {
  name: "options-controller",
  components: { sudokuGeneratorOptions },
  props: ["options", "chooseOption", "colors"],
  data: function () {
    return {};
  },
};
</script>
