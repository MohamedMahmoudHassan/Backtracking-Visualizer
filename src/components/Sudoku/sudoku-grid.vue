<template>
  <v-container>
    <v-row no-gutters v-for="row in sudokuGrid" :key="row.id">
      <v-col v-for="cell in row.value" :key="cell.row + '-' + cell.col">
        <div :style="getCellStyle()" :class="getCellClass(cell)">
          {{ cell.state == cellStatesEnum.empty ? "" : cell.value }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { InitGrid } from "../../utils/sudoku";
import { mainConfig } from "../../config";

export default {
  name: "sudoku-grid",
  props: ["grid", "options", "colors"],
  data: function () {
    return {
      sudokuGrid: [],
      cellStatesEnum: mainConfig.cellStatesEnum,
    };
  },
  methods: {
    getCellLength: function () {
      return (36 * 15) / (this.options.gridSize * this.options.gridSize);
    },
    getFontSize: function () {
      return (36 * 6) / (this.options.gridSize * this.options.gridSize);
    },
    getCellClass: function (cell) {
      return [
        "grid-cell pa-24",
        cell.state,
        { "first-row": cell.row == 1 },
        { "first-col": cell.col == 1 },
        { "last-group-row": cell.row % this.options.gridSize == 0 },
        { "last-group-column": cell.col % this.options.gridSize == 0 },
      ];
    },

    getCellStyle: function () {
      return {
        height: this.getCellLength() + "px",
        fontSize: this.getFontSize() + "px",
      };
    },
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

<style scoped>
.first-row {
  border-top-color: rgba(0, 0, 0, 0.4);
}

.first-col {
  border-left-color: rgba(0, 0, 0, 0.4);
}

.last-group-row {
  border-bottom-color: rgba(0, 0, 0, 0.4);
}

.last-group-column {
  border-right-color: rgba(0, 0, 0, 0.4);
}
</style>
