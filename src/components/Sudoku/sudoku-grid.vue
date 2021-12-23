<template>
  <v-container class="pa-3 fill-height">
    <v-row
      no-gutters
      v-for="row in sudokuGrid"
      :key="row.id"
      :style="{ height: 100 / sudokuGrid.length + '%' }"
    >
      <v-col v-for="cell in row.value" :key="cell.id">
        <div
          :style="{ fontSize: 1 / sudokuGrid.length + 'em' }"
          :class="[
            'grid-cell',
            cell.state,
            {
              'first-row': cell.row == 1,
              'first-col': cell.col == 1,
              'last-group-row': cell.row % options.gridSize == 0,
              'last-group-column': cell.col % options.gridSize == 0,
            },
          ]"
        >
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
