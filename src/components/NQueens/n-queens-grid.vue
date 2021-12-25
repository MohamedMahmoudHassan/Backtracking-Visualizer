<template>
  <v-container class="pa-3 fill-height">
    <v-row
      no-gutters
      v-for="row in chessGrid"
      :key="row.id"
      :style="{ height: 100 / chessGrid.length + '%' }"
    >
      <v-col v-for="cell in row.value" :key="cell.Id">
        <div :style="{ fontSize: 1 / chessGrid.length + 'em' }" :class="getCellClass(cell)">
          <img
            v-if="grid.find((q) => q.value.row == cell.row && q.value.col == cell.col)"
            src="../../assets/images/queen_chess.svg"
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
    getCellClass: function (cell) {
      var queen = this.grid.find((q) => q.value.row == cell.row && q.value.col == cell.col);
      return [
        "grid-cell",
        queen &&
        queen.state != this.cellStatesEnum.const &&
        queen.state != this.cellStatesEnum.normal
          ? queen.state
          : (cell.row + cell.col) % 2
          ? "black-cell"
          : "white-cell",
      ];
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
