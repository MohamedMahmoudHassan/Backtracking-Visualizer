<template>
  <div>
    <v-subheader class="pl-0">Grid Emptiness Level</v-subheader>
    <v-slider
      :class="$vuetify.breakpoint.sm ? 'mt-4' : ''"
      v-model="emptiness"
      :min="gridEmptinessLimits.min"
      :max="gridSize == 4 ? gridEmptinessLimits.max16 : gridEmptinessLimits.max"
      :step="1"
      thumb-label
      :disabled="isDisabled"
      :color="colors.primary"
      @change="ChooseGridEmptiness(emptiness)"
    >
      <template v-slot:thumb-label="{ value }">
        {{ value + "%" }}
      </template>
    </v-slider>
  </div>
</template>

<script>
import { sudokuSolConfig } from "../../config";

export default {
  name: "grid-emptiness-options",
  props: ["gridEmptiness", "isDisabled", "gridSize", "colors", "ChooseGridEmptiness"],
  data: function () {
    return {
      emptiness: this.gridEmptiness,
      gridEmptinessLimits: sudokuSolConfig.gridEmptinessLimits,
    };
  },
  watch: {
    gridEmptiness: function () {
      this.emptiness = this.gridEmptiness;
    },
    gridSize: function () {
      if (this.gridSize == 4 && this.emptiness > this.gridEmptinessLimits.max16)
        this.ChooseGridEmptiness(this.gridEmptinessLimits.max16);
    },
  },
};
</script>
