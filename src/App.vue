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
      :ChooseColor="(c, prop) => ChangeColor(c, prop)"
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
  UpdateGrid,
  Solve,
  ApplyForwardAction,
  ApplyBackAction,
} from "./utils/helpers";
import { mainConfig, visualConfig } from "./config";
var { defaultValues } = mainConfig;

export default {
  name: "App",
  components: {
    appHeader,
    optionsController,
    problemGrid,
    visualizationController,
  },
  data: function () {
    return {
      problem: "",
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
      if (this.options[prop] == opt) return;
      this.options[prop] = opt;
      this.grid = UpdateGrid(this.problem, this.options, prop, this.grid);
    },

    ChangeColor: function (color, prop) {
      this.colors[prop] = color;
    },

    ChangeProblem: function (problem) {
      if (this.problem == problem) return;
      this.problem = problem;
      this.ChangeColor(mainConfig.problemsList.find((p) => p.value == problem).color, "primary");
      this.options = GetDefaultOptions(problem);
      this.InitProblem();
    },

    StartVisualization: function () {
      var solution = Solve(this.problem, this.options, this.grid);
      if (solution == -1) {
        console.log("Too many steps");
        return;
      }
      this.visualization.steps = solution;
      this.StartAutoPlay();
    },

    StepForward: function () {
      if (this.visualization.currentStepId >= this.visualization.steps.length) {
        this.Pause();
        return false;
      }
      const { actions, description } = this.visualization.steps[this.visualization.currentStepId++];
      ApplyForwardAction(this.problem, actions, this.grid);

      var { text, color } = description;
      this.visualization.descriptionList = [
        { text, color, id: this.visualization.currentStepId },
        ...this.visualization.descriptionList,
      ];
      if (this.visualization.descriptionList.length > visualConfig.defaultValues.descriptionNoLimit)
        this.visualization.descriptionList.pop();
      return true;
    },

    StepBack: function () {
      this.Pause();
      var { currentStepId } = this.visualization;
      if (!currentStepId) return false;

      const { actions } = this.visualization.steps[--this.visualization.currentStepId];
      ApplyBackAction(this.problem, actions, this.grid);
      this.visualization.descriptionList.splice(0, 1);

      var { descriptionNoLimit } = visualConfig.defaultValues;
      if (currentStepId > descriptionNoLimit - 1) {
        var { text, color } =
          this.visualization.steps[currentStepId - descriptionNoLimit].description;
        this.visualization.descriptionList.push({
          text,
          color,
          id: currentStepId - descriptionNoLimit,
        });
      }
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
    this.ChangeProblem(defaultValues.problem);
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

.normal-cell {
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

.valid-cell {
  background-color: #ea80fc;
}

.black-cell {
  background-color: #757575;
}

.white-cell {
  background-color: #eeeeee;
}
</style>
