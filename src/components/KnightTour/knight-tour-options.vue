<template>
  <v-card :color="colors.base" tile outlined class="options-container">
    <v-card :color="colors.base" tile outlined class="option-item">
      <v-subheader class="pl-0">Grid Size</v-subheader>
      <v-slider
        v-model="gridSize"
        :min="gridSizeLimits.min"
        :max="gridSizeLimits.max"
        :step="1"
        thumb-label
        :disabled="isDisabled"
        :color="colors.primary"
        @change="ChooseOption(gridSize, 'gridSize')"
      >
      </v-slider>
    </v-card>
  </v-card>
</template>
<script>
import { knightTourConfig } from "../../config";

export default {
  name: "knight-tour-options",
  props: ["options", "isDisabled", "colors", "ChooseOption"],
  data: function () {
    return {
      gridSize: this.options.gridSize,
      gridSizeLimits: knightTourConfig.gridSizeLimits,
    };
  },
};
</script>
