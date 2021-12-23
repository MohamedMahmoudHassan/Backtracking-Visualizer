<template>
  <div class="pa-2 fill-height">
    <v-card class="visualization-controller">
      <v-progress-linear
        :value="isDisabled ? 0 : (visualization.currentStepId * 100) / visualization.steps.length"
        :color="colors.primary"
      ></v-progress-linear>
      <!-- <v-card height="360" tile outlined>
        <v-timeline dense v-if="ShowDescription()">
          <v-slide-x-transition group hide-on-leave>
            <v-timeline-item
              v-for="step in visualization.descriptionList"
              :key="step.id"
              small
              :color="colors[step.color]"
            >
              <span>{{ step.text }}</span>
            </v-timeline-item>
          </v-slide-x-transition>
        </v-timeline>
        <v-card v-else-if="!isDisabled" outlined class="unavailable-description" tile disabled>
          Steps description is not available in fast mode. Animation looks bad :(
        </v-card>
      </v-card>
      <v-btn
        elevation="4"
        block
        :disabled="isDisabled"
        :dark="!isDisabled"
        tile
        :color="colors.primary"
      >
        {{ visualization.currentStepId }} of {{ visualization.steps.length }} steps
      </v-btn>
      <v-card tile outlined>
        <v-slider
          class="speed-slider"
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
          <v-btn
            tile
            width="116"
            depressed
            :color="colors.base"
            :disabled="isDisabled"
            @click="StepBack()"
          >
            <span class="hidden-sm-and-down">Back</span>
            <v-icon> mdi-skip-previous </v-icon>
          </v-btn>
          <v-btn
            v-if="visualization.mode != visualizationModes.active"
            tile
            depressed
            width="115"
            :color="colors.primary"
            :disabled="isDisabled"
            :dark="!isDisabled"
            @click="AutoPlay()"
          >
            <span class="hidden-sm-and-down">Play</span>
            <v-icon> mdi-play </v-icon>
          </v-btn>
          <v-btn
            v-else
            tile
            depressed
            width="115"
            :color="colors.primary"
            :disabled="isDisabled"
            :dark="!isDisabled"
            @click="Pause()"
          >
            <span class="hidden-sm-and-down">Pause</span>
            <v-icon> mdi-pause </v-icon>
          </v-btn>
          <v-btn
            tile
            depressed
            width="116"
            :color="colors.base"
            :disabled="isDisabled"
            @click="StepForward()"
          >
            <span class="hidden-sm-and-down">Forward</span>
            <v-icon> mdi-skip-next </v-icon>
          </v-btn>
          <v-btn
            block
            tile
            depressed
            :color="colors.base"
            :disabled="isDisabled"
            :dark="!isDisabled"
            style="margin-top: 3px"
            @click="StopVisualization()"
          >
            <v-icon> mdi-stop </v-icon>
            <span class="hidden-sm-and-down">Stop Visualization</span>
          </v-btn>
        </v-card>
      </v-card> -->
    </v-card>
  </div>
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
    };
  },
  methods: {
    ShowDescription: function () {
      return (
        !this.isDisabled &&
        (this.visualization.speed <= 3 || this.visualization.mode != this.visualizationModes.active)
      );
    },
  },
};
</script>

<style>
.speed-slider {
  margin: 10px 20px 0px 20px;
}

.unavailable-description {
  margin: 140px 30px;
  padding: 10px;
}

@media only screen and (max-width: 600px) {
  .visualization-controller {
    height: 200px;
    width: 200px;
  }
}
@media only screen and (min-width: 600px) {
  .visualization-controller {
    height: 320px;
    width: 320px;
    font-size: 144px;
  }
}

@media only screen and (min-width: 960px) {
  .visualization-controller {
    height: 450px;
    width: 450px;
    font-size: 162px;
  }
}

@media only screen and (min-width: 1264px) {
  .visualization-controller {
    height: 560px;
    width: 560px;
    font-size: 180px;
  }
}

@media only screen and (min-width: 1904px) {
  .visualization-controller {
    height: 750px;
    width: 750px;
    font-size: 234px;
  }
}
</style>
