<template>
  <v-card tile outlined>
    <v-timeline dense class="overflow-y-auto stepper" v-if="!this.isDisabled">
      <!-- <v-slide-x-transition v-if="this.visualization.speed <= 3" group hide-on-leave> -->
        <v-timeline-item
          v-for="step in visualization.descriptionList"
          :key="step.id"
          small
          :icon="step.id == visualization.currentStepId ? 'mdi-timer-outline' : ''"
          :color="colors[step.color]"
        >
          <span>{{ step.text }}</span>
        </v-timeline-item>
      <!-- </v-slide-x-transition> -->
    </v-timeline>
  </v-card>
</template>

<script>
import { visualConfig } from "../config";
export default {
  name: "visualization-stepper",
  props: ["isDisabled", "colors", "visualization"],
  data: function () {
    return {
      visualizationModes: visualConfig.modesEnum,
    };
  },
};
</script>
