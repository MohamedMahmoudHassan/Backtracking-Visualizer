<template>
  <v-container>
    <v-row no-gutters v-for="row in chessGrid" :key="row.id">
      <v-col v-for="cell in row.value" :key="cell.Id">
        <div :style="getCellStyle()" :class="getCellClass(cell)">
          <img
            v-if="grid.filter((q) => q.row == cell.row && q.col == cell.col).length"
            src="../../assets/queen_chess.svg"
            class="chess-image"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { InitGrid } from "../../utils/nQueens";
import { mainConfig } from "../../config";

export default {
  name: "n-queens-grid",
  props: ["grid", "options", "colors"],
  data: function () {
    return {
      chessGrid: [],
      cellStatesEnum: mainConfig.cellStatesEnum,
    };
  },
  methods: {
    getCellLength: function () {
      return (36 * 15) / this.options.gridSize;
    },
    getFontSize: function () {
      return (36 * 6) / this.options.gridSize;
    },
    getCellClass: function (cell) {
      var queen = this.grid.filter((q) => q.row == cell.row && q.col == cell.col);
      return [
        "grid-cell pa-24",
        queen.length && queen[0].state != this.cellStatesEnum.const
          ? queen[0].state
          : (cell.row + cell.col) % 2
          ? "black-cell"
          : "white-cell",
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
    this.chessGrid = InitGrid(this.options);
  },
  watch: {
    grid: function () {
      this.chessGrid = InitGrid(this.options);
    },
  },
};
</script>
<style>
.chess-image {
  height: 80%;
  width: 80%;
}
</style>
