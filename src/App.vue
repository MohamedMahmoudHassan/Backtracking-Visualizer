<template>
  <v-app>
    <options-controller
      :isDisabled="onVisualization()"
      :colors="colors"
      :options="options"
      :chooseOption="(opt, prop) => changeOption(opt, prop)"
      :StartVisualization="(steps) => startVisualization(steps)"
    ></options-controller>
    <app-header
      :colors="colors"
      :chooseColor="(c, prop) => (colors[prop] = c)"
      :problem="problem"
      :chooseProblem="(p) => (problem = p)"
    ></app-header>
    <v-main color="grey lighten-4">
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
            :StepBack="StepBack"
            :StopVisualization="StopVisualization"
            :colors="colors"
            :isDisabled="!onVisualization()"
          ></visualization-controller>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import appHeader from "./components/app-header.vue";
import optionsController from "./components/options-controller.vue";
import problemGrid from "./components/problem-grid.vue";
import visualizationController from "./components/visualization-controller.vue";

import { InitCells, FillGrid, ApplyForwardAction, ApplyBackAction } from "./utils/sudoku";
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
      this.StopVisualization();
      this.visualization.steps = FillGrid(this.options);
      this.StartAutoPlay(); // setTimeout(() => this.StartAutoPlay(), 500);
    },

    StepForward: function () {
      if (this.visualization.currentStepId >= this.visualization.steps.length) return false;
      const { actions, description } = this.visualization.steps[this.visualization.currentStepId++];
      ApplyForwardAction(actions, this.grid);

      this.visualization.descriptionList = [
        { value: description, id: this.visualization.currentStepId },
        ...this.visualization.descriptionList,
      ];
      if (this.visualization.descriptionList.length > 5) this.visualization.descriptionList.pop();
      return true;
    },

    StepBack: function () {
      if (!this.visualization.currentStepId) return false;
      const { actions } = this.visualization.steps[--this.visualization.currentStepId];
      ApplyBackAction(actions, this.grid);

      this.visualization.descriptionList.splice(0, 1);
      if (this.visualization.currentStepId > 4)
        this.visualization.descriptionList.push({
          value: this.visualization.steps[this.visualization.currentStepId - 5].description,
          id: this.visualization.currentStepId - 5,
        });
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
    StopVisualization: function () {
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
