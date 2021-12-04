<template>
  <v-app>
    <app-header
      :colors="colors"
      :chooseColor="(c, prop) => (colors[prop] = c)"
      :problem="problem"
      :chooseProblem="(p) => (problem = p)"
    ></app-header>
    <v-card color="grey lighten-4">
      <options-controller
        :isDisabled="onVisualization()"
        :colors="colors"
        :options="options"
        :chooseOption="(opt, prop) => changeOption(opt, prop)"
        :startVisualization="(steps) => startVisualization(steps)"
      ></options-controller>
      <v-row no-gutters>
        <v-col>
          <problem-grid
            :grid="grid"
            :changeGrid="(newGrid) => (grid = newGrid)"
            :options="options"
            :colors="colors"
          ></problem-grid>
        </v-col>
        <v-col>
          <visualization-controller
            :visualization="visualization"
            :AutoPlay="StartAutoPlay"
            :Pause="Pause"
            :StepForward="StepForward"
            :colors="colors"
            :isDisabled="!onVisualization()"
          ></visualization-controller>
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
import appHeader from "./components/app-header.vue";
import optionsController from "./components/options-controller.vue";
import problemGrid from "./components/problem-grid.vue";
import visualizationController from "./components/visualization-controller.vue";

import { InitCells, FillGrid, ApplyAction } from "./utils/sudoku";
import { optionsDefault, visualConfig, sudoku } from "./config";

export default {
  name: "App",
  components: { appHeader, optionsController, problemGrid, visualizationController },
  data: function () {
    return {
      problem: optionsDefault.problem,
      colors: optionsDefault.colors,
      options: {},
      optionsNeedRecreate: [],
      grid: {},
      visualization: visualConfig.optionsDefault,
    };
  },
  methods: {
    changeOption: function (opt, prop) {
      this.options[prop] = opt;
      if (this.optionsNeedRecreate.includes(prop)) this.grid = InitCells(this.options);
    },

    onVisualization: function () {
      return this.visualization.mode != visualConfig.modesEnum.disabled;
    },
    startVisualization: function () {
      this.Stop();
      this.visualization.steps = FillGrid(this.options);
      this.StartAutoPlay(); // setTimeout(() => this.StartAutoPlay(), 500);
    },

    StepForward: function () {
      if (this.visualization.currentStepId >= this.visualization.steps.length) {
        this.visualization.mode = visualConfig.modesEnum.disabled;
        return false;
      }
      const { actions } = this.visualization.steps[this.visualization.currentStepId++];
      ApplyAction(actions, this.grid);
      return true;
    },

    StartAutoPlay: function () {
      this.visualization.mode = visualConfig.modesEnum.active;
      this.AutoPlay();
    },

    AutoPlay: function () {
      if (this.visualization.mode == visualConfig.modesEnum.active && this.StepForward())
        setTimeout(
          () => this.AutoPlay(),
          visualConfig.speedsList.find((sp) => sp.value == this.visualization.speed).interval
        );
    },
    Pause: function () {
      this.visualization.mode = visualConfig.modesEnum.paused;
    },
    Stop: function () {
      this.visualization.mode = visualConfig.modesEnum.disabled;
      this.visualization.currentStepId = 0;
      this.grid = InitCells(this.options);
    },
  },
  created: function () {
    this.optionsNeedRecreate = sudoku.optionsNeedRecreate;
  },
};
</script>
