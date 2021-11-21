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
    <button @click="Autoplay()">Autoplay</button>
    <button @click="StepBack()">StepBack</button>
    <button @click="StepForward()">StepForward</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      cells: [],
      grid: [],
      steps: [],
      gridGenerationMode: null,
      visualizeGeneration: false,
      removeMode: null,
      EmptyCellsNumber: 18,
      visualSpeed: 20,
      currentStepId: 0,
      rowsNo: 9,
      colsNo: 9,
      states: {
        empty: "empty-cell",
        const: "const-cell",
        try: "try-cell",
        failed: "faild-cell",
        succeed: "succeed-cell",
      },
      generationModes: {
        naive: 1,
        diagonal: 2,
      },
      randomRemoveModes: {
        percentageBased: 1,
        cellsBased: 2,
      },
    };
  },

  methods: {
    UpdateCells: function (cells, after, addStep = true) {
      var actions = [];
      for (const cell of cells) {
        var action = { cell, before: { ...cell } };
        cell.state = after.state;
        if (after.value) cell.value = after.value;
        if (after.state == this.states.empty) cell.value = 0;
        if (addStep && this.visualizeGeneration) {
          action.after = { ...cell };
          actions.push(action);
        }
      }
      if (addStep && this.visualizeGeneration) this.steps.push(actions);
    },

    GetRandValue: function (items) {
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
      var validValues = this.GetValidCellValues(gridCells, cell);
      while (validValues.length) {
        this.UpdateCells([cell], {
          value: this.GetRandValue(validValues),
          state: this.states.try,
        });

        if (this.CreateGridWithBacktracking(cells, gridCells, id + 1))
          return true;

        validValues = validValues.filter((val) => val != cell.value);
        this.UpdateCells([cell], { state: this.states.failed });
        this.UpdateCells([cell], { state: this.states.empty });
      }
      return false;
    },

    FillDiagonalSubgrids: function (cells) {
      for (const cell of cells)
        this.UpdateCells([cell], {
          value: this.GetRandValue(this.GetValidCellValues(cells, cell)),
          state: this.states.const,
        });
    },

    FillGrid: function () {
      this.steps = [];
      this.currentStepId = 0;
      this.ClearCells(this.cells);
      var cells = this.InitCells();

      if (this.gridGenerationMode == this.generationModes.diagonal) {
        var diagSubgridsCells = cells.filter(
          (cell) => cell.subgridRow == cell.subgridCol
        );
        this.FillDiagonalSubgrids(diagSubgridsCells);

        var nonDiagSubgridsCells = cells.filter(
          (cell) => cell.subgridRow != cell.subgridCol
        );
        this.CreateGridWithBacktracking(nonDiagSubgridsCells, cells, 0);
        this.UpdateCells(cells, { state: this.states.succeed });
        this.UpdateCells(cells, { state: this.states.const });
      } else {
        this.CreateGridWithBacktracking(cells, cells, 0);
        this.UpdateCells(cells, { state: this.states.succeed });
        this.UpdateCells(cells, { state: this.states.const });
      }
      this.RemoveRandCells(cells);
      if (!this.visualizeGeneration) {
        this.cells = cells;
        this.grid = this.InitGrid(cells);
      }
    },

    RemoveRandCells: function (cells) {
      var needToRemove = this.EmptyCellsNumber;
      if (this.removeMode == this.randomRemoveModes.percentageBased) {
        for (var i = 0; i < cells.length && needToRemove; i++) {
          if (Math.random() <= needToRemove / (cells.length - i)) {
            this.UpdateCells([cells[i]], { state: this.states.empty });
            needToRemove--;
          }
        }
      } else {
        while (needToRemove) {
          var cell = this.GetRandValue(cells);
          if (cell.state != this.states.empty) {
            this.UpdateCells([cell], { state: this.states.empty });
            needToRemove--;
          }
        }
      }
    },

    StepBack: function () {
      if (!this.currentStepId) return false;
      const actions = this.steps[--this.currentStepId];
      for (const action of actions) {
        const { cell, before } = action;
        var gridCell = this.cells.find(
          (c) => c.row == cell.row && c.col == cell.col
        );
        gridCell.value = before.value;
        gridCell.state = before.state;
      }
      return true;
    },

    StepForward: function () {
      if (this.currentStepId >= this.steps.length) return false;
      const actions = this.steps[this.currentStepId++];
      for (const action of actions) {
        const { cell, after } = action;
        var gridCell = this.cells.find(
          (c) => c.row == cell.row && c.col == cell.col
        );
        gridCell.value = after.value;
        gridCell.state = after.state;
      }
      return true;
    },

    Autoplay: function () {
      if (this.StepForward())
        setTimeout(() => this.Autoplay(), 1000 / this.visualSpeed);
    },

    ClearCells: function (cells) {
      for (const cell of cells)
        this.UpdateCells([cell], { state: this.states.empty }, false);
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
    this.gridGenerationMode = this.generationModes.naive;
    this.removeMode = this.randomRemoveModes.cellsBasedased;
    this.visualizeGeneration = true;
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
  color: blueviolet;
}

.faild-cell {
  color: red;
}

.succeed-cell {
  color: rgb(13, 185, 13);
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