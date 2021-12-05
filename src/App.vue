<template>
  <v-app>
    <options-controller
      :isDisabled="visualization.mode != modesEnum.disabled"
      :problem="problem"
      :colors="colors"
      :options="options"
      :chooseOption="(opt, prop) => ChangeOption(opt, prop)"
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
            :problem="problem"
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
            :isDisabled="visualization.mode == modesEnum.disabled"
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

import { InitGrid, Solve, ApplyForwardAction, ApplyBackAction } from "./utils/helpers";
import { optionsDefault, visualConfig } from "./config";

export default {
  name: "App",
  components: { appHeader, optionsController, problemGrid, visualizationController },
  data: function () {
    return {
      problem: optionsDefault.problem,
      colors: optionsDefault.colors,
      grid: {},
      options: optionsDefault.options,
      optionsNeedRecreate: optionsDefault.optionsNeedRecreate,
      visualization: visualConfig.optionsDefault,
      modesEnum: visualConfig.modesEnum,
    };
  },
  methods: {
    ChangeOption: function (opt, prop) {
      this.options[prop] = opt;
      if (this.optionsNeedRecreate.includes(prop)) InitGrid(this.problem, this.options);
    },

    startVisualization: function () {
      this.StopVisualization();
      this.visualization.steps = Solve(this.problem, this.options, this.grid);
      this.StartAutoPlay();
    },

    StepForward: function () {
      if (this.visualization.currentStepId >= this.visualization.steps.length) return false;
      const { actions, description } = this.visualization.steps[this.visualization.currentStepId++];
      ApplyForwardAction(this.problem, actions, this.grid);

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
      ApplyBackAction(this.problem, actions, this.grid);

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
      this.grid = InitGrid(this.problem, this.options);
    },
  },
  created: function () {
    this.grid = InitGrid(this.problem, this.options);
  },
};
</script>
