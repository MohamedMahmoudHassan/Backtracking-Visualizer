<template>
  <v-card tile class="visualization-grid">
    <v-progress-linear
      :value="isDisabled ? 0 : (visualization.currentStepId * 100) / visualization.steps.length"
      :color="colors.primary"
    ></v-progress-linear>
    <v-row no-gutters>
      <v-col cols="12">
        <visualization-stepper
          :isDisabled="isDisabled"
          :colors="colors"
          :visualization="visualization"
        ></visualization-stepper>
      </v-col>
      <v-col cols="12" class="visualization-bottom">
        <v-card tile outlined>
          <v-btn
            elevation="4"
            block
            :small="$vuetify.breakpoint.xs"
            :disabled="isDisabled"
            :dark="!isDisabled"
            tile
            :color="colors.primary"
          >
            {{ visualization.currentStepId }} of {{ visualization.steps.length }} steps
          </v-btn>
          <visualization-controller
            :isDisabled="isDisabled"
            :colors="colors"
            :visualization="visualization"
            :AutoPlay="AutoPlay"
            :Pause="Pause"
            :StepForward="StepForward"
            :StepBack="StepBack"
            :StopVisualization="StopVisualization"
          ></visualization-controller>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import visualizationStepper from "./visualization-stepper.vue";
import visualizationController from "./visualization-controller.vue";

import { visualConfig } from "../config";
export default {
  name: "visualization-card",
  props: [
    "isDisabled",
    "colors",
    "visualization",
    "AutoPlay",
    "Pause",
    "StepForward",
    "StepBack",
    "StopVisualization",
  ],
  components: { visualizationStepper, visualizationController },
  data: function () {
    return {
      visualizationModes: visualConfig.modesEnum,
    };
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .stepper {
    height: 60px;
  }
}
@media only screen and (min-width: 600px) {
  .visualization-grid {
    height: 320px;
    width: 320px;
  }
  .visualization-bottom {
    position: absolute;
    bottom: 0;
  }

  .stepper {
    height: 135px;
  }
}
@media only screen and (min-width: 960px) {
  .visualization-grid {
    height: 450px;
    width: 450px;
  }
  .stepper {
    height: 265px;
  }
}
@media only screen and (min-width: 1264px) {
  .visualization-grid {
    height: 560px;
    width: 560px;
  }
  .stepper {
    height: 375px;
  }
}
@media only screen and (min-width: 1904px) {
  .visualization-grid {
    height: 750px;
    width: 750px;
  }
  .stepper {
    height: 565px;
  }
}
</style>
