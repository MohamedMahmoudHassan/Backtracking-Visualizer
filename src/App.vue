<template>
  <v-app>
    <v-main>
      <app-header
        :problem="problem"
        :colors="colors"
        :ChooseColor="(c, prop) => ChangeColor(c, prop)"
        :ChooseProblem="(p) => ChangeProblem(p)"
      ></app-header>
      <v-row no-gutters class="fill-height grey lighten-4">
        <v-col lg="3" md="3" cols="12" order-md="0" order="3">
          <options-controller
            :isDisabled="visualization.mode != modesEnum.disabled"
            :problem="problem"
            :colors="colors"
            :options="options"
            :ChooseOption="(opt, prop) => ChangeOption(opt, prop)"
            :StartVisualization="StartVisualization"
          ></options-controller>
        </v-col>
        <v-col lg="6" md="6" sm="7" cols="12">
          <problem-grid
            :grid="grid"
            :problem="problem"
            :isSearching="visualization.mode == modesEnum.searching"
            :options="options"
            :colors="colors"
          ></problem-grid>
        </v-col>
        <v-col lg="3" md="3" sm="5" cols="12">
          <visualization-controller
          v-if="false"
            :isDisabled="
              visualization.mode != modesEnum.paused && visualization.mode != modesEnum.active
            "
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
    <many-steps-snackbar
      :show="showManyStepsSnackbar"
      :colors="colors"
      :TryAgain="StartVisualization"
      :ChooseDefaultOptions="ChooseDefaultOptions"
    ></many-steps-snackbar>
  </v-app>
</template>

<script>
import appHeader from "./components/app-header.vue";
import optionsController from "./components/options-controller.vue";
import problemGrid from "./components/problem-grid.vue";
import visualizationController from "./components/visualization-controller.vue";
import manyStepsSnackbar from "./components/many-steps-snackbar.vue";

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
    manyStepsSnackbar,
  },
  data: function () {
    return {
      showManyStepsSnackbar: false,
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
      this.showManyStepsSnackbar = false;
      this.visualization = { ...visualConfig.defaultValues };
      this.grid = InitGrid(this.problem, this.options);
    },

    ChooseDefaultOptions: function () {
      this.options = GetDefaultOptions(this.problem);
      this.InitProblem();
    },

    ChangeOption: function (opt, prop) {
      this.showManyStepsSnackbar = false;
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

    StartVisualization: function (triesCounter = 0) {
      if (!triesCounter) {
        this.visualization.mode = visualConfig.modesEnum.searching;
        this.showManyStepsSnackbar = false;
      }
      setTimeout(() => {
        if (this.visualization.mode == visualConfig.modesEnum.searching) {
          var solution = (solution = Solve(this.problem, this.options, this.grid));
          if (solution == -1) {
            if (triesCounter == 5) {
              this.visualization.mode = visualConfig.modesEnum.disabled;
              this.showManyStepsSnackbar = true;
            } else this.StartVisualization(triesCounter + 1);
          } else {
            this.visualization.steps = solution;
            this.StartAutoPlay();
          }
        }
      }, 900);
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
  height: 100%;
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
