<template>
  <v-app>
    <app-header
      :colors="colors"
      :chooseColor="(c, prop) => (colors[prop] = c)"
      :problem="problem"
      :chooseProblem="(p) => (problem = p)"
    ></app-header>
    <options-controller
      :isDisabled="false"
      :colors="colors"
      :options="options"
      :chooseOption="(opt, prop) => changeOption(opt, prop)"
      :startVisualization="(steps) => startVisualization(steps)"
    ></options-controller>
    <problem-grid
      :grid="grid"
      :changeGrid="(newGrid) => (grid = newGrid)"
      :options="options"
      :colors="colors"
    ></problem-grid>
    <visualization-controller></visualization-controller>
  </v-app>
</template>

<script>
import appHeader from "./components/app-header.vue";
import optionsController from "./components/options-controller.vue";
import problemGrid from "./components/problem-grid.vue";

import { InitCells, FillGrid, StepForward } from "./utils/sudoku";
import { optionsDefault, visualization, sudoku } from "./config";

export default {
  name: "App",
  components: { appHeader, optionsController, problemGrid },
  data: function () {
    return {
      problem: optionsDefault.problem,
      colors: optionsDefault.colors,
      options: {},
      optionsNeedRecreate: [],
      grid: {},
      visualization: visualization.optionsDefault,
    };
  },
  methods: {
    changeOption: function (opt, prop) {
      this.options[prop] = opt;
      if (this.optionsNeedRecreate.includes(prop)) this.grid = InitCells(this.options);
    },
    startVisualization: function () {
      this.visualization.steps = FillGrid(this.options);
      this.visualization.mode = visualization.modesEnum.active;
      this.Autoplay();
    },

    StepForward: function () {
      if (this.visualization.currentStepId >= this.visualization.steps.length) {
        this.visualization.mode = visualization.modesEnum.disabled;
        return false;
      }
      const { actions } = this.visualization.steps[this.visualization.currentStepId++];
      StepForward(actions, this.grid);
      return true;
    },

    Autoplay: function () {
      if (this.visualization.mode == visualization.modesEnum.active && this.StepForward())
        setTimeout(() => this.Autoplay(), this.visualization.speed);
    },
  },
  created: function () {
    this.optionsNeedRecreate = sudoku.optionsNeedRecreate;
  },
};
</script>
