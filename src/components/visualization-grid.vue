<template>
  <div class="fill-height">
    <v-bottom-sheet
      v-if="$vuetify.breakpoint.xs"
      inset
      hide-overlay
      persistent
      no-click-animation
      :value="!isDisabled"
    >
      <visualization-card
        :isDisabled="isDisabled"
        :colors="colors"
        :visualization="visualization"
        :AutoPlay="AutoPlay"
        :Pause="Pause"
        :StepForward="StepForward"
        :StepBack="StepBack"
        :StopVisualization="StopVisualization"
      ></visualization-card>
    </v-bottom-sheet>
    <v-container v-else class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col>
          <visualization-card
            :isDisabled="isDisabled"
            :colors="colors"
            :visualization="visualization"
            :AutoPlay="AutoPlay"
            :Pause="Pause"
            :StepForward="StepForward"
            :StepBack="StepBack"
            :StopVisualization="StopVisualization"
          ></visualization-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import visualizationCard from "./visualization-card.vue";

export default {
  name: "visualization-grid",
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
  components: { visualizationCard },
};
</script>
