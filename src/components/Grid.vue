<template>
  <div>
    <div class="grid">
      <div class="grid-row" v-for="row in grid" :key="row.id">
        <div
          :class="[
            'grid-cell',
            cell.state,
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
      states: {
        empty: "empty-cell",
        const: "const-cell",
        try: "try-cell",
        failed: "faild-cell",
        succeed: "good-cell",
      },
    };
  },

  methods: {
    getRandValue: function (items) {
      return items[Math.floor(Math.random() * items.length)];
    },

    CellsConfilct: function (cell1, cell2) {
      return (
        cell1.row == cell2.row ||
        cell1.col == cell2.col ||
        (cell1.subgridRow == cell2.subgridRow &&
          cell1.subgridCol == cell2.subgridCol)
      );
    },

    GetValidCellValues: function (cells, cell) {
      var validValues = Array.from({ length: 9 }, (_, i) => i + 1);
      for (const c of cells)
        if (this.CellsConfilct(c, cell))
          validValues = validValues.filter((value) => value != c.value);
      return validValues;
    },

    CreateGridWithBacktracking: function (cells, gridCells, id) {
      if (id == cells.length) return true;
      var cell = cells[id];
      if (cell.state == this.states.const)
        return this.CreateGridWithBacktracking(cells, gridCells, id + 1);

      var validValues = this.GetValidCellValues(gridCells, cell);
      while (validValues.length) {
        cell.state = this.states.try;
        cell.value = this.getRandValue(validValues);
        if (this.CreateGridWithBacktracking(cells, gridCells, id + 1)) return true;
        validValues = validValues.filter((val) => val != cell.value);
        cell.state = this.fail;
        cell.value = 0;
      }
      return false;
    },

    FillDiagonalSubgrids: function (cells) {
      for (const cell of cells) {
        cell.value = this.getRandValue(this.GetValidCellValues(cells, cell));
        cell.state = this.states.const;
      }
    },

    FillGrid: function () {
      var cells = this.InitCells();
      var diagSubgridsCells = cells.filter(
        (cell) => cell.subgridRow == cell.subgridCol
      );
      this.FillDiagonalSubgrids(diagSubgridsCells);

      var nonDiagSubgridsCells = cells.filter(
        (cell) => cell.subgridRow != cell.subgridCol
      );
      this.CreateGridWithBacktracking(nonDiagSubgridsCells, cells, 0);

      this.cells = cells;
      this.grid = this.InitGrid(cells);
    },

    ClearCells: function (cells) {
      for (const cell of cells) {
        cell.value = 0;
        cell.state = this.states.empty;
      }
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

.try-cell {
  color: red;
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