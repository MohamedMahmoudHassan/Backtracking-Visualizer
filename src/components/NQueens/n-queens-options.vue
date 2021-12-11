<template>
  <v-card :color="colors.base" tile outlined class="options-container">
    <v-card :color="colors.base" tile outlined class="option-item">
      <v-subheader class="pl-0">Grid Size (N)</v-subheader>
      <v-slider
        v-model="gridSize"
        :min="gridSizeLimits.min"
        :max="gridSizeLimits.max"
        :step="1"
        thumb-label
        :disabled="isDisabled"
        :color="colors.primary"
        @change="ChangeGridSize()"
      >
      </v-slider>
    </v-card>
    <v-card :color="colors.base" tile outlined>
      <v-switch
        label="Solve row by row"
        v-model="rowByRow"
        :disabled="isDisabled || disableRowByRow"
        :color="colors.primary"
        @change="ChangeRowByRow()"
      ></v-switch>
    </v-card>
  </v-card>
</template>

<script>
import { nQueenConfig } from "../../config";

export default {
  name: "n-queens-options",
  props: ["options", "isDisabled", "colors", "ChooseOption"],
  data: function () {
    return {
      gridSize: this.options.gridSize,
      rowByRow: this.options.rowByRow,
      disableRowByRow: false,
      gridSizeLimits: nQueenConfig.gridSizeLimits,
    };
  },
  methods: {
    ChangeGridSize: function () {
      this.ChooseOption(this.gridSize, "gridSize");
      if (this.gridSize > this.gridSizeLimits.forceRowByRow) {
        this.rowByRow = true;
        this.disableRowByRow = true;
        this.ChangeRowByRow();
      }
      else
        this.disableRowByRow = false;
    },

    ChangeRowByRow: function () {
      this.ChooseOption(this.rowByRow, "rowByRow");
    },
  },
};
</script>
