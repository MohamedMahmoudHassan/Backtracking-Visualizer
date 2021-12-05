<template>
  <v-card elevation="3" color="grey lighten-5" width="600" style="margin: 20px 0px 0px 350px">
    <generator-grid
      v-if="problem == problemsEnum.sudokuGenerator"
      :grid="grid"
      :changeGrid="changeGrid"
      :options="options"
      :colors="colors"
    ></generator-grid>
  </v-card>
</template>

<script>
import generatorGrid from "./Sudoku/generator-grid.vue";

import { problemsEnum } from "../config";
export default {
  name: "problem-grid",
  components: { generatorGrid },
  props: ["grid", "changeGrid", "options", "problem", "colors"],
  data: function () {
    return {
      problemsEnum: problemsEnum,
    };
  },
};
</script>
