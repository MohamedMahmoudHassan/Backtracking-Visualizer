<template>
  <v-container class="pa-3 fill-height">
    <v-row
      no-gutters
      v-for="row in chessGrid"
      :key="row.id"
      :style="{ height: 100 / chessGrid.length + '%' }"
    >
      <v-col v-for="cell in row.value" :key="cell.id">
        <div :style="{ fontSize: 1 / chessGrid.length + 'em' }" :class="getCellClass(cell)">
          <img
            v-if="cell.value == Math.max(...grid.map((c) => c.value))"
            src="../../assets/images/knight_chess.svg"
            class="chess-image"
          />
          <div v-else-if="cell.value != -1">{{ cell.value }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { InitGrid } from "../../utils/knightTour";
import { mainConfig } from "../../config";

export default {
  name: "knight-tour-grid",
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
      return [
        "grid-cell pa-24",
        cell.state != this.cellStatesEnum.empty && cell.state != this.cellStatesEnum.normal
          ? cell.state
          : (cell.row + cell.col) % 2
          ? "black-cell"
          : "white-cell",
      ];
    },
  },
  created: function () {
    this.chessGrid = InitGrid(this.grid, this.options);
  },
  watch: {
    grid: function () {
      this.chessGrid = InitGrid(this.grid, this.options);
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
