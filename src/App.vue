<template>
  <v-app>
    <options-controller
      :isDisabled="visualization.mode != modesEnum.disabled"
      :problem="problem"
      :colors="colors"
      :options="options"
      :ChooseOption="(opt, prop) => ChangeOption(opt, prop)"
      :StartVisualization="(steps) => StartVisualization(steps)"
    ></options-controller>
    <app-header
      :problem="problem"
      :colors="colors"
      :ChooseColor="(c, prop) => (colors[prop] = c)"
      :ChooseProblem="(p) => ChangeProblem(p)"
    ></app-header>
    <v-main class="grey lighten-4">
      <v-row no-gutters>
        <v-col>
          <problem-grid
            :grid="grid"
            :problem="problem"
            :options="options"
            :colors="colors"
          ></problem-grid>
        </v-col>
        <v-col>
          <visualization-controller
            :isDisabled="visualization.mode == modesEnum.disabled"
            :colors="colors"
            :visualization="visualization"
            :AutoPlay="StartAutoPlay"
            :Pause="Pause"
            :StepForward="StepForward"
            :StepBack="StepBack"
            :StopVisualization="InitProblem"
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

import {
  InitGrid,
  GetDefaultOptions,
  GetOptionsNeedRecreate,
  Solve,
  ApplyForwardAction,
  ApplyBackAction,
} from "./utils/helpers";
import { mainConfig, visualConfig } from "./config";
var { defaultValues } = mainConfig;

export default {
  name: "App",
  components: { appHeader, optionsController, problemGrid, visualizationController },
  data: function () {
    return {
      problem: defaultValues.problem,
      colors: defaultValues.colors,
      grid: {},
      options: {},
      optionsNeedRecreate: [],
      visualization: { ...visualConfig.defaultValues },
      modesEnum: visualConfig.modesEnum,
    };
  },
  methods: {
    InitProblem: function () {
      this.visualization = { ...visualConfig.defaultValues };
      this.grid = InitGrid(this.problem, this.options);
    },

    ChangeOption: function (opt, prop) {
      this.options[prop] = opt;
      if (this.optionsNeedRecreate.includes(prop)) this.InitProblem();
    },

    ChangeProblem: function (problem) {
      this.problem = problem;
      this.options = GetDefaultOptions(problem);
      this.optionsNeedRecreate = GetOptionsNeedRecreate(problem);
      this.InitProblem();
    },

    StartVisualization: function () {
      this.visualization.steps = Solve(this.problem, this.options, this.grid);
      if (this.visualization.steps == -1) return this.StartVisualization();
      this.StartAutoPlay();
    },

    StepForward: function () {
      if (this.visualization.currentStepId >= this.visualization.steps.length) {
        this.Pause();
        return false;
      }
      const { actions, description } = this.visualization.steps[this.visualization.currentStepId++];
      ApplyForwardAction(this.problem, actions, this.grid);

      this.visualization.descriptionList = [
        { value: description, id: this.visualization.currentStepId },
        ...this.visualization.descriptionList,
      ];
      if (this.visualization.descriptionList.length > visualConfig.defaultValues.descriptionNoLimit)
        this.visualization.descriptionList.pop();
      return true;
    },

    StepBack: function () {
      this.Pause();
      if (!this.visualization.currentStepId) return false;
      const { actions } = this.visualization.steps[--this.visualization.currentStepId];
      ApplyBackAction(this.problem, actions, this.grid);

      this.visualization.descriptionList.splice(0, 1);
      if (this.visualization.currentStepId > visualConfig.defaultValues.descriptionNoLimit - 1)
        this.visualization.descriptionList.push({
          value: this.visualization.steps[this.visualization.currentStepId - 5].description,
          id: this.visualization.currentStepId - visualConfig.defaultValues.descriptionNoLimit,
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
  },
  created: function () {
    this.ChangeProblem(this.problem);
  },
};
</script>

<style>
.grid-cell {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: "center";
}

.const-cell {
  background-color: #eeeeee;
}

.try-cell {
  background-color: #80d8ff;
}

.failed-cell {
  background-color: #ff8a80;
}

.succeed-cell {
  background-color: #ccff90;
}

.black-cell {
  background-color: #757575;
}

.white-cell {
  background-color: #eeeeee;
}
</style>
