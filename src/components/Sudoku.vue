<template>
  <v-card>
    <AppBar title="Backtracking Visulaizer"></AppBar>
    <OptionsControllers
      :options="options"
      :colors="colors"
      :OnChangeGridBase="Init"
      :FillGrid="FillGrid"
      :Solve="Solve"
    ></OptionsControllers>
    <v-row no-gutters>
      <v-col>
        <Grid :grid="grid" :gridBase="options.gridBase" :states="states"></Grid>
      </v-col>
      <v-col>
        <VisualizationControllers
          :options="visualization"
          :Autoplay="Autoplay"
          :StepBack="StepBack"
          :StepForward="StepForward"
          :colors="colors"
        ></VisualizationControllers>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AppBar from "./AppBar.vue";
import Grid from "./Grid.vue";
import OptionsControllers from "./OptionsControllers.vue";
import VisualizationControllers from "./VisualizationControllers.vue";
export default {
  components: { AppBar, Grid, OptionsControllers, VisualizationControllers },
  data: function () {
    return {
      cells: [],
      grid: [],
      steps: [],
      options: {
        gridBase: 3,
        includeInvalidAsStep: false,
        gridGenerationMode: null,
        visualizeSteps: false,
        removeMode: null,
        emptyCellsPercentage: 50,
      },
      visualization: {
        currentStepId: 0,
        steps: [],
        visualSpeed: 2,
      },
      states: {
        empty: "empty-cell",
        const: "const-cell",
        try: "try-cell",
        failed: "faild-cell",
        succeed: "succeed-cell",
        invalid: "invalid-cell",
      },
      generationModes: {
        naive: 1,
        diagonal: 2,
      },
      randomRemoveModes: {
        percentageBased: 1,
        cellsBased: 2,
      },
      colors: {
        primary: "orange",
      },
      colorsList: [
        "red",
        "pink",
        "purple",
        "deep-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "green",
        "light-green",
        "lime",
        "yellow",
        "amber",
        "orange",
        "deep-orange",
        "brown",
        "blue-grey",
        "grey",
      ],
    };
  },

  methods: {
    DescripeStep: function (cells, step) {
      if (step.state == this.states.succeed) return "Success!";
      if (step.state == this.states.failed) return "Can't continue with value " + cells[0].value;
      if (step.state == this.states.empty) return "Removing value " + cells[0].value;
      if (step.state == this.states.const)
        return cells.length == 1 ? "Putting value " + cells[0].value : "Grid is complete!";
      if (step.state == this.states.try)
        return step.validValues.length
          ? "Valid values: " + step.validValues + " | trying: " + step.value
          : "No valid values";
    },

    UpdateCells: function (cells, after, addStep = true) {
      var actions = [];
      var description = this.DescripeStep(cells, after);
      for (const cell of cells) {
        var action = { cell, before: { ...cell } };
        cell.state = after.state;
        if (after.value) cell.value = after.value;
        if (after.state == this.states.empty) cell.value = 0;
        if (addStep) {
          action.after = { ...cell };
          actions.push(action);
        }
      }
      if (addStep) this.steps.push({ actions, description });
    },

    GetRandValue: function (items) {
      return items[Math.floor(Math.random() * items.length)];
    },

    CellsConfilct: function (cell1, cell2) {
      return (
        cell1.row == cell2.row ||
        cell1.col == cell2.col ||
        (cell1.subgridRow == cell2.subgridRow && cell1.subgridCol == cell2.subgridCol)
      );
    },

    //Need optimization
    GetValidCellValues: function (cells, cell) {
      var gridSize = this.options.gridBase * this.options.gridBase;
      var validValues = Array.from({ length: gridSize }, (_, i) => i + 1);
      for (const c of cells)
        if (this.CellsConfilct(c, cell)) validValues = validValues.filter((value) => value != c.value);
      return validValues;
    },

    FillCellsWithBacktracking: function (cells, gridCells, id) {
      if (id == cells.length) return true;
      var cell = cells[id];
      var validValues = this.GetValidCellValues(gridCells, cell);
      while (validValues.length) {
        this.UpdateCells([cell], { value: this.GetRandValue(validValues), state: this.states.try, validValues });
        if (this.FillCellsWithBacktracking(cells, gridCells, id + 1)) return true;

        validValues = validValues.filter((val) => val != cell.value);
        this.UpdateCells([cell], { state: this.states.failed });
        this.UpdateCells([cell], { state: this.states.empty });
      }
      if (this.options.includeInvalidAsStep) {
        this.UpdateCells([cell], { state: this.states.invalid });
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
      this.visualization.currentStepId = 0;
      this.ClearCells(this.cells);
      var cells = this.InitCells();

      if (this.options.gridGenerationMode == this.generationModes.diagonal) {
        var diagSubgridsCells = cells.filter((cell) => cell.subgridRow == cell.subgridCol);
        this.FillDiagonalSubgrids(diagSubgridsCells);

        var nonDiagSubgridsCells = cells.filter((cell) => cell.subgridRow != cell.subgridCol);
        this.FillCellsWithBacktracking(nonDiagSubgridsCells, cells, 0);
        this.UpdateCells(nonDiagSubgridsCells, { state: this.states.succeed });
        this.UpdateCells(nonDiagSubgridsCells, { state: this.states.const });
      } else {
        this.FillCellsWithBacktracking(cells, cells, 0);
        this.UpdateCells(cells, { state: this.states.succeed });
        this.UpdateCells(cells, { state: this.states.const });
      }
      this.RemoveRandCells(cells);
      if (!this.options.visualizeSteps) {
        this.cells = cells;
        this.grid = this.InitGrid(cells);
        this.steps = [];
      }
    },

    RemoveRandCells: function (cells) {
      var needToRemove = Math.ceil((this.options.emptyCellsPercentage * this.cells.length) / 100);
      if (this.options.removeMode == this.randomRemoveModes.percentageBased) {
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

    Solve: function () {
      this.steps = [];
      this.visualization.currentStepId = 0;
      var gridCells = this.cells.map((cell) => {
        return { ...cell };
      });
      var cells = gridCells.filter((cell) => cell.state == this.states.empty);
      this.FillCellsWithBacktracking(cells, gridCells, 0);
      this.UpdateCells(cells, { state: this.states.succeed });
      this.UpdateCells(cells, { state: this.states.const });
    },

    StepBack: function () {
      if (!this.visualization.currentStepId) return false;
      const { actions } = this.steps[--this.visualization.currentStepId];
      for (const action of actions) {
        const { cell, before } = action;
        var gridCell = this.cells.find((c) => c.row == cell.row && c.col == cell.col);
        gridCell.value = before.value;
        gridCell.state = before.state;
      }

      this.visualization.steps.splice(0, 1);
      if (this.visualization.currentStepId > 4)
        this.visualization.steps.push({
          description: this.steps[this.visualization.currentStepId - 5].description,
          id: this.visualization.currentStepId - 5,
        });
      return true;
    },

    StepForward: function () {
      if (this.visualization.currentStepId >= this.steps.length) return false;
      const { actions, description } = this.steps[this.visualization.currentStepId++];
      for (const action of actions) {
        const { cell, after } = action;
        var gridCell = this.cells.find((c) => c.row == cell.row && c.col == cell.col);
        gridCell.value = after.value;
        gridCell.state = after.state;
      }

      this.visualization.steps = [{ description, id: this.visualization.currentStepId }, ...this.visualization.steps];
      if (this.visualization.steps.length > 5) this.visualization.steps.pop();
      return true;
    },

    Autoplay: function () {
      if (this.StepForward()) setTimeout(() => this.Autoplay(), 10000 / (5 * this.visualization.visualSpeed));
    },

    ClearCells: function (cells) {
      for (const cell of cells) this.UpdateCells([cell], { state: this.states.empty }, false);
    },

    InitGrid: function (cells) {
      var grid = [];
      var gridSize = this.options.gridBase * this.options.gridBase;
      for (var rowId = 1; rowId <= gridSize; rowId++) {
        var row = { id: rowId, value: [] };
        grid.push(row);
        for (var colId = 1; colId <= gridSize; colId++)
          row.value.push(cells.find((cell) => cell.row == rowId && cell.col == colId));
      }
      return grid;
    },

    InitCells: function () {
      var cells = [];
      var gridSize = this.options.gridBase * this.options.gridBase;
      for (var rowId = 1; rowId <= gridSize; rowId++)
        for (var colId = 1; colId <= gridSize; colId++)
          cells.push({
            row: rowId,
            col: colId,
            subgridRow: Math.ceil(rowId / this.options.gridBase),
            subgridCol: Math.ceil(colId / this.options.gridBase),
            state: this.states.empty,
            value: 0,
          });
      return cells;
    },

    Init: function () {
      this.cells = this.InitCells();
      this.grid = this.InitGrid(this.cells);
    },
  },

  created: function () {
    this.Init();
    this.options.gridGenerationMode = this.generationModes.naive;
    this.options.removeMode = this.randomRemoveModes.cellsBasedased;
    this.colors.primary = this.GetRandValue(this.colorsList);
  },
};
</script>

<style></style>
