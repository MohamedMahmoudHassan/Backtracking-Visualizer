<template>
  <v-card style="margin: 20px 20px 0px 0px; float: right" width="350">
    <v-progress-linear
      :color="colors.primary"
      :value="isDisabled ? 0 : (visualization.currentStepId * 100) / visualization.steps.length"
    ></v-progress-linear>
    <v-card height="380" tile outlined>
      <v-timeline dense v-if="!isDisabled && visualization.speed <= 3">
        <v-slide-x-transition group hide-on-leave>
          <v-timeline-item
            v-for="step in visualization.descriptionList"
            :key="step.id"
            :color="colors.primary"
            >{{ step.value }}</v-timeline-item
          >
        </v-slide-x-transition>
      </v-timeline>
    </v-card>
    <v-btn
      :color="colors.primary"
      elevation="4"
      block
      :disabled="isDisabled"
      :dark="!isDisabled"
      tile
      >{{ visualization.currentStepId }} of {{ visualization.steps.length }} steps</v-btn
    >
    <v-card tile outlined>
      <v-slider
        style="margin: 10px 20px 0px 20px"
        v-model="visualization.speed"
        :color="colors.primary"
        :track-color="colors.base"
        :tick-labels="visualizationSpeedsList.map((sp) => sp.label)"
        :min="1"
        :max="visualizationSpeedsList.length"
        ticks="always"
        tick-size="4"
        :disabled="isDisabled"
      >
      </v-slider>
      <v-card tile style="text-align: center">
        <v-btn @click="StepBack()" tile width="116" :color="colors.base" :disabled="isDisabled">
          <span class="hidden-sm-and-down">Back</span>
          <v-icon dark> mdi-skip-previous </v-icon>
        </v-btn>
        <v-btn
          v-if="visualization.mode != visualizationModes.active"
          @click="AutoPlay()"
          tile
          width="115"
          :color="colors.primary"
          :disabled="isDisabled"
          :dark="!isDisabled"
        >
          <span class="hidden-sm-and-down">Play</span>
          <v-icon> mdi-play </v-icon>
        </v-btn>
        <v-btn
          v-else
          @click="Pause()"
          tile
          width="115"
          :color="colors.primary"
          :disabled="isDisabled"
          :dark="!isDisabled"
        >
          <span class="hidden-sm-and-down">Pause</span>
          <v-icon dark> mdi-pause </v-icon>
        </v-btn>
        <v-btn @click="StepForward()" tile width="116" :color="colors.base" :disabled="isDisabled">
          <span class="hidden-sm-and-down">Forward</span>
          <v-icon dark> mdi-skip-next </v-icon>
        </v-btn>
        <v-btn
          @click="StopVisualization()"
          block
          tile
          :color="colors.base"
          :disabled="isDisabled"
          :dark="!isDisabled"
          style="margin-top: 3px"
        >
          <v-icon dark> mdi-stop </v-icon>
          <span class="hidden-sm-and-down">Stop Visualization</span>
        </v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>
<script>
import { visualConfig } from "../config";

export default {
  name: "visualization-controller",
  props: [
    "visualization",
    "AutoPlay",
    "Pause",
    "StepForward",
    "StepBack",
    "StopVisualization",
    "isDisabled",
    "colors",
  ],
  data: function () {
    return {
      visualizationModes: visualConfig.modesEnum,
      visualizationSpeedsList: visualConfig.speedsList,
    };
  },
};
</script>
