<template>
  <div>
    <div class="grid">
      <div class="grid-row" v-for="row in grid" :key="row.id">
        <div
          :class="[
            'grid-cell',
            { 'last-group-row': row.id % 3 == 0 },
            { 'last-group-column': cell.id.col % 3 == 0 },
          ]"
          v-for="cell in row.value"
          :key="cell.id.row + '-' + cell.id.col"
        >
          {{ cell.state == states.empty ? "" : cell.value }}
        </div>
      </div>
    </div>
    <button @click="FillGrid()">Fill</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      grid: [],
      rowsNo: 9,
      colsNo: 9,
      states: {
        empty: 1,
        const: 2,
        try: 3,
        fail: 4,
        good: 5,
      },
    };
  },

  methods: {
    InSameSubgrid: function (cell1, cell2) {
      return (
        Math.ceil(cell1.row / 3) == Math.ceil(cell2.row / 3) &&
        Math.ceil(cell1.col / 3) == Math.ceil(cell2.col / 3)
      );
    },

    CreateCellValue: function (grid, rowId, colId) {
      var validValues = Array.from({ length: 9 }, (_, i) => i + 1);
      for (const row of grid) {
        for (const cell of row.value) {
          if (!cell.state == this.states.empty) break;
          if (
            cell.id.row == rowId ||
            cell.id.col == colId ||
            this.InSameSubgrid(
              { row: rowId, col: colId },
              { row: cell.id.row, col: cell.id.col }
            )
          )
            validValues = validValues.filter((value) => value != cell.value);
        }
      }
      var validValuesLen = validValues.length;
      if (!validValuesLen) return 0;
      return validValues[Math.floor(Math.random() * validValuesLen)];
    },

    CreateSubgrid: function (stRow, stCol) {
      var subgrid = this.grid
        .filter((row) => row.id >= stRow && row.id <= stRow + 2)
        .map((row) =>
          row.value.filter(
            (cell) => cell.id.col >= stCol && cell.id.col <= stCol + 2
          )
        );
      for (const row of subgrid)
        for (const cell of row) {
          cell.value = this.CreateCellValue(
            this.grid,
            cell.id.row,
            cell.id.col
          );
          cell.state = cell.value ? this.states.const : this.state.empty;
        }
    },

    CreateGrid: function () {
      for (var rc = 1; rc <= 9; rc += 3) this.CreateSubgrid(rc, rc);
      for (var row = 1; row <= 9; row += 3)
        for (var col = 1; col <= 9; col += 3)
          if (row != col) this.CreateSubgrid(row, col);
    },

    CreateEmptyGrid: function () {
      var grid = [];
      for (var rowId = 1; rowId <= this.rowsNo; rowId++) {
        var row = { id: rowId, value: [] };
        grid.push(row);
        for (var colId = 1; colId <= this.colsNo; colId++) {
          var cell = {
            id: { row: rowId, col: colId },
            state: this.states.empty,
            value: 0,
          };
          row.value.push(cell);
        }
      }
      return grid;
    },

    FillGrid: function () {
      this.CreateGrid({});
    },
  },

  created: function () {
    this.grid = this.CreateEmptyGrid();
  },
};
</script>

<style>
.grid-cell {
  box-sizing: border-box;
  border-color: black;
  border-bottom-style: solid;
  border-right-style: solid;
  border-bottom-width: 1px;
  border-right-width: 1px;
  width: 60px;
  height: 60px;
  font-size: x-large;
  float: left;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.grid {
  box-sizing: border-box;
  border-top-style: solid;
  width: fit-content;
}

.grid-row {
  box-sizing: border-box;
  border-left-style: solid;
  overflow: hidden;
}

.last-group-row {
  box-sizing: border-box;
  border-bottom-width: initial;
}

.last-group-column {
  box-sizing: border-box;
  border-right-width: initial;
}
</style>