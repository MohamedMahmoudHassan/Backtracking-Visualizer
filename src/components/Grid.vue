<template>
  <div>
    <div class="grid">
      <div class="grid-row" v-for="row in grid" :key="row.id">
        <div
          :class="[
            'grid-cell',
            { 'last-group-row': cell.row % 3 == 0 },
            { 'last-group-column': cell.col % 3 == 0 },
          ]"
          v-for="cell in row.value"
          :key="cell.row + '-' + cell.col"
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
      cells: [],
      grid: [],
      rowsNo: 9,
      colsNo: 9,
      states: { empty: 1, const: 2, try: 3, fail: 4, good: 5 },
    };
  },

  methods: {
    getRandValue: function (items) {
      return items[Math.floor(Math.random() * items.length)];
    },
    InSameSubgrid: function (cell1, cell2) {
      return (
        Math.ceil(cell1.row / 3) == Math.ceil(cell2.row / 3) &&
        Math.ceil(cell1.col / 3) == Math.ceil(cell2.col / 3)
      );
    },

    GetValidCellValues: function (cells, rowId, colId) {
      var validValues = Array.from({ length: 9 }, (_, i) => i + 1);
      for (const cell of cells) {
        if (
          cell.row == rowId ||
          cell.col == colId ||
          this.InSameSubgrid(
            { row: rowId, col: colId },
            { row: cell.row, col: cell.col }
          )
        )
          validValues = validValues.filter((value) => value != cell.value);
      }
      return validValues;
    },

    CreateSubgrid: function (subgRow, subgCol) {
      var subgrid = this.cells.filter(
        (cell) => cell.subgridRow == subgRow && cell.subgridCol == subgCol
      );

      for (const cell of subgrid) {
        cell.value = this.getRandValue(
          this.GetValidCellValues(this.cells, cell.row, cell.col)
        );
        cell.state = this.states.const;
      }
    },

    CreateGridWithBacktracking: function (cells, id) {
      if (id == cells.length) return true;
      var cell = cells[id];
      if (cell.state == this.states.const)
        return this.CreateGridWithBacktracking(cells, id + 1);
      var validValues = this.GetValidCellValues(this.cells, cell.row, cell.col);

      while (validValues.length) {
        cell.state = this.try;
        cell.value = this.getRandValue(validValues);
        if (this.CreateGridWithBacktracking(cells, id + 1)) return true;
        validValues = validValues.filter((val) => val != cell.value);
        cell.state = this.fail;
        cell.value = 0;
      }
      return false;
    },

    ClearCells: function (cells) {
      for (const cell of cells) {
        cell.value = 0;
        cell.state = this.states.empty;
      }
    },

    FillGrid: function () {
      this.ClearCells(this.cells);
      for (var subg = 1; subg <= 3; subg++) this.CreateSubgrid(subg, subg);
      var cells = this.cells.filter(
        (cell) => cell.subgridRow != cell.subgridCol
      );
      this.CreateGridWithBacktracking(cells, 0);
    },

    InitGrid: function (cells) {
      var grid = [];
      for (var rowId = 1; rowId <= this.rowsNo; rowId++) {
        var row = { id: rowId, value: [] };
        grid.push(row);
        for (var colId = 1; colId <= this.colsNo; colId++)
          row.value.push(
            cells.find((cell) => cell.row == rowId && cell.col == colId)
          );
      }
      return grid;
    },

    InitCells: function () {
      var cells = [];
      for (var rowId = 1; rowId <= this.rowsNo; rowId++)
        for (var colId = 1; colId <= this.colsNo; colId++)
          cells.push({
            row: rowId,
            col: colId,
            subgridRow: Math.ceil(rowId / 3),
            subgridCol: Math.ceil(colId / 3),
            state: this.states.empty,
            value: 0,
          });
      return cells;
    },
  },

  created: function () {
    this.cells = this.InitCells();
    this.grid = this.InitGrid(this.cells);
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