<template>
  <sudoku-grid :grid="sudokuGrid" :options="options" :colors="colors"></sudoku-grid>
</template>

<script>
import sudokuGrid from "./sudoku-grid.vue";

import { InitGrid } from "../../utils/sudoku";
export default {
  name: "generator-grid",
  components: { sudokuGrid },
  props: ["grid", "changeGrid", "options", "colors"],
  data: function () {
    return {
      sudokuGrid: [],
    };
  },
  created: function () {
    this.sudokuGrid = InitGrid(this.grid, this.options);
  },
  watch: {
    grid: function () {
      this.sudokuGrid = InitGrid(this.grid, this.options);
    },
  },
};
</script>
