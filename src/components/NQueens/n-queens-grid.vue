<template>
  <v-container>
    <v-row no-gutters v-for="row in chessGrid" :key="row.id">
      <v-col v-for="cell in row.value" :key="cell.Id">
        <div :style="getCellStyle()" :class="getCellClass(cell)" outlined tile>
          <img
            v-if="row.queen.col == cell.col"
            src="../../assets/queen_chess.svg"
            :height="getQueenHeight()"
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
    getCellClass: function ({ row, col }) {
      return ["grid-cell pa-24", (row + col) % 2 ? "black-cell" : "white-cell"];
    },
    getQueenHeight: function () {
      return (this.getCellLength() * 3) / 4;
    },
    getCellStyle: function () {
      return {
        height: this.getCellLength() + "px",
        fontSize: this.getFontSize() + "px",
      };
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
.grid-cell {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: "center";
}

.black-cell {
  background-color: #7e7e7e;
}

.white-cell {
  background-color: #80d9ff00;
}
</style>
