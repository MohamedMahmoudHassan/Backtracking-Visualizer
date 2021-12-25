<template>
  <v-row no-gutters class="text-center">
    <v-col cols="12">
      <v-slider
        class="ma-2 mb-0"
        label="Speed"
        v-model="visualization.speed"
        :color="colors.primary"
        :track-color="colors.base"
        :min="1"
        :max="visualizationSpeedsList.length"
        ticks="always"
        :disabled="isDisabled"
      >
        <template v-slot:thumb-label="{ value }">
          <span style="font-size: 9px">
            {{ visualizationSpeedsList.find((s) => s.value == value).label }}
          </span>
        </template>
      </v-slider>
    </v-col>
    <v-col cols="12">
      <v-row no-gutters class="mb-2">
        <v-col cols="4">
          <v-btn
            block
            tile
            depressed
            :color="colors.base"
            :disabled="isDisabled"
            @click="StepBack()"
          >
            <span v-if="!($vuetify.breakpoint.sm || $vuetify.breakpoint.md)">Back</span>
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn
            v-if="visualization.mode != visualizationModes.active"
            block
            tile
            depressed
            :color="colors.primary"
            :disabled="isDisabled"
            :dark="!isDisabled"
            @click="AutoPlay()"
          >
            <span v-if="!($vuetify.breakpoint.sm || $vuetify.breakpoint.md)">Play</span>
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn
            v-else
            block
            tile
            depressed
            :color="colors.primary"
            :disabled="isDisabled"
            :dark="!isDisabled"
            @click="Pause()"
          >
            <span v-if="!($vuetify.breakpoint.sm || $vuetify.breakpoint.md)">Pause</span>
            <v-icon>mdi-pause</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn
            block
            tile
            depressed
            :color="colors.base"
            :disabled="isDisabled"
            @click="StepForward()"
          >
            <span v-if="!($vuetify.breakpoint.sm || $vuetify.breakpoint.md)">Next</span>
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn
        block
        tile
        depressed
        :color="colors.base"
        :disabled="isDisabled"
        :dark="!isDisabled"
        @click="StopVisualization()"
      >
        <span> Stop Visualization</span>
        <v-icon v-if="!$vuetify.breakpoint.sm"> mdi-stop </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { visualConfig } from "../config";

export default {
  name: "visualization-controller",
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
  data: function () {
    return {
      visualizationModes: visualConfig.modesEnum,
      visualizationSpeedsList: visualConfig.speedsList,
      visualizationMiniSpeedsList: visualConfig.miniSpeedsList,
      open: true,
    };
  },
};
</script>

<style></style>
