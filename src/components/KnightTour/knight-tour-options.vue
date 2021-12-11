<template>
  <v-card :color="colors.base" tile outlined class="options-container">
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
};
</script>
