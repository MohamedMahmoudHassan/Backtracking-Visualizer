<template>
  <v-card style="margin: 80px 0px 0px 20px" width="350">
    <v-progress-linear
      :color="colors.primary"
      :value="(visualization.currentStepId * 100) / visualization.steps.length"
    ></v-progress-linear>
    <v-card height="400">
      <!-- <v-timeline dense v-if="!isDisabled">
        <v-slide-x-transition group hide-on-leave>
          <v-timeline-item
            v-for="step in visualization.steps"
            :key="step.id"
            :color="colors.primary"
            >{{ step.description }}</v-timeline-item
          >
        </v-slide-x-transition>
      </v-timeline> -->
    </v-card>
    <v-btn :color="colors.primary" elevation="4" block :disabled="isDisabled" :dark="!isDisabled"
      >{{ visualization.currentStepId }} of {{ visualization.steps.length }} steps</v-btn
    >
    <v-card tile>
      <v-slider
        style="margin: 10px 20px 0px 20px"
        v-model="visualization.speed"
        :color="colors.primary"
        track-color="secondary"
        :tick-labels="visualizationSpeedsList.map((sp) => sp.label)"
        :min="1"
        :max="visualizationSpeedsList.length"
        ticks="always"
        tick-size="4"
        :disabled="isDisabled"
      >
      </v-slider>
      <v-card tile style="padding: 3px; text-align: center">
        <v-btn
          class="mx-2"
          depressed
          fab
          small
          @click="StepBack()"
          color="secondary"
          :disabled="isDisabled"
        >
          <v-icon dark> mdi-skip-previous </v-icon>
        </v-btn>
        <v-btn
          v-if="visualization.mode != visualizationModes.active"
          class="mx-2"
          depressed
          fab
          @click="AutoPlay()"
          :color="colors.primary"
          :disabled="isDisabled"
          :dark="!isDisabled"
        >
          <v-icon> mdi-play </v-icon>
        </v-btn>
        <v-btn
          v-else
          class="mx-2"
          depressed
          fab
          @click="Pause()"
          :color="colors.primary"
          :disabled="isDisabled"
        >
          <v-icon dark> mdi-pause </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          depressed
          fab
          small
          @click="StepForward()"
          color="secondary"
          :disabled="isDisabled"
        >
          <v-icon dark> mdi-skip-next </v-icon>
        </v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>
<script>
import { visualConfig } from "../config";

export default {
  name: "visualization-controller",
  props: ["visualization", "AutoPlay", "Pause", "StepForward", "StepBack", "isDisabled", "colors"],
  data: function () {
    return {
      visualizationModes: visualConfig.modesEnum,
      visualizationSpeedsList: visualConfig.speedsList,
    };
  },
};
</script>
