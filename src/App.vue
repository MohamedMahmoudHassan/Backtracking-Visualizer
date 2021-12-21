<template>
  <v-app>
    <v-main class="purple lighten-4">
      <v-row no-gutters style="height: 7%; background-color: lime; width: 100%"> </v-row>
      <v-row no-gutters style="width: 100%; height: 93%; background-color: yellow">
        <v-col
          xl="3"
          lg="3"
          md="12"
          sm="12"
          cols="12"
          order-xl="0"
          order-lg="0"
          order-md="3"
          order-sm="3"
          order="3"
        >
          <div style="width: 100%; height: 100%; background-color: red"></div>
        </v-col>
        <v-col xl="5" lg="5" md="7" sm="7" cols="12">
          <div class="pa-2" style="width: 100%; height: 100%; background-color: blue">
            <v-card class="ma-auto problem-grid" color="red"> </v-card>
          </div>
        </v-col>
        <v-col xl="4" lg="4" md="5" sm="5" cols="12">
          <div style="width: 100%; height: 100%; background-color: green"></div>
        </v-col>
      </v-row>
    </v-main>

    <many-steps-snackbar
      :view="viewManyStepsSnackbar"
      :colors="colors"
      :TryAgain="StartVisualization"
      :ChooseDefaultOptions="ChooseDefaultOptions"
    ></many-steps-snackbar>
    <options-controller
      v-if="false"
      :isDisabled="visualization.mode != modesEnum.disabled"
      :problem="problem"
      :colors="colors"
      :options="options"
      :ChooseOption="(opt, prop) => ChangeOption(opt, prop)"
      :StartVisualization="StartVisualization"
    ></options-controller>
    <app-header
      v-if="false"
      :problem="problem"
      :colors="colors"
      :ChooseColor="(c, prop) => ChangeColor(c, prop)"
      :ChooseProblem="(p) => ChangeProblem(p)"
    ></app-header>
    <v-main class="grey lighten-4" v-if="false">
      <v-container>
        <v-row>
          <v-col xl="5" lg="7">
            <problem-grid
              :grid="grid"
              :problem="problem"
              :isSearching="visualization.mode == modesEnum.searching"
              :options="options"
              :colors="colors"
            ></problem-grid>
          </v-col>
          <v-col v-if="false" lg="4" class="pd-2" co>
            <visualization-controller
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
      </v-container>
    </v-main>
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
      viewManyStepsSnackbar: false,
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
      this.viewManyStepsSnackbar = false;
      this.visualization = { ...visualConfig.defaultValues };
      this.grid = InitGrid(this.problem, this.options);
    },

    ChooseDefaultOptions: function () {
      this.options = GetDefaultOptions(this.problem);
      this.InitProblem();
    },

    ChangeOption: function (opt, prop) {
      this.viewManyStepsSnackbar = false;
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
        this.viewManyStepsSnackbar = false;
      }
      setTimeout(() => {
        if (this.visualization.mode == visualConfig.modesEnum.searching) {
          var solution = (solution = Solve(this.problem, this.options, this.grid));
          if (solution == -1) {
            if (triesCounter == 5) {
              this.visualization.mode = visualConfig.modesEnum.disabled;
              this.viewManyStepsSnackbar = true;
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
@media only screen and (max-width: 600px) {
  .problem-grid {
    height: 280px;
    width: 280px;
  }
}
@media only screen and (min-width: 600px) {
  .problem-grid {
    height: 320px;
    width: 320px;
  }
}

@media only screen and (min-width: 960px) {
  .problem-grid {
    height: 450px;
    width: 450px;
  }
}

@media only screen and (min-width: 1264px) {
  .problem-grid {
    height: 500px;
    width: 500px;
  }
}

@media only screen and (min-width: 1904px) {
  .problem-grid {
    height: 750px;
    width: 750px;
  }
}

.grid-cell {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: "center";
  /* height: unset !important;
  padding-top: 100%; */
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
