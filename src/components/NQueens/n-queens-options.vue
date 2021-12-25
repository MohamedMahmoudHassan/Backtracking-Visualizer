<template>
  <v-row no-gutters>
    <v-col md="12" sm="6" cols="12">
      <div>
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
      </div>
    </v-col>
    <v-col md="12" sm="6" cols="12">
      <v-switch
        :class="$vuetify.breakpoint.sm ? 'mt-12 ml-12' : ''"
        label="Solve row by row"
        v-model="rowByRow"
        :disabled="isDisabled || disableRowByRow"
        :color="colors.primary"
        @change="ChangeRowByRow()"
      ></v-switch>
    </v-col>
    <v-col sm="12" v-if="$vuetify.breakpoint.sm">
      <div class="text-center">
        <v-btn
          elevation="4"
          tile
          dark
          :disabled="isDisabled"
          :color="colors.primary"
          @click="StartVisualization()"
        >
          Start Visualization
        </v-btn>
      </div>
    </v-col>
  </v-row>
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
      } else this.disableRowByRow = false;
    },

    ChangeRowByRow: function () {
      this.ChooseOption(this.rowByRow, "rowByRow");
    },
  },
  watch: {
    options: {
      handler: function (val, oldVal) {
        if (val.gridSize != oldVal.gridSize) this.gridSize = this.options.gridSize;
        if (val.rowByRow != oldVal.rowByRow) this.rowByRow = this.options.rowByRow;
      },
      deep: true,
    },
  },
};
</script>
