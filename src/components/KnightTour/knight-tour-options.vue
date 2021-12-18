<template>
  <v-card :color="colors.base" tile outlined class="options-container">
    <v-card :color="colors.base" tile outlined class="option-item">
      <v-subheader class="pl-0">Grid Size</v-subheader>
      <v-row justify="space-around">
        <v-radio-group
          row
          v-model="gridSize"
          @change="ChooseOption(gridSize, 'gridSize')"
          :disabled="isDisabled"
        >
          <v-radio
            v-for="size in gridSizesList"
            :key="size.id"
            :label="size.label"
            :value="size.value"
            :color="colors.primary"
          ></v-radio>
        </v-radio-group>
      </v-row>
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
      gridSizesList: knightTourConfig.gridSizesList,
    };
  },
  watch: {
    options: {
      handler: function (val, oldVal) {
        if (val.gridSize != oldVal.gridSize) this.gridSize = this.options.gridSize;
      },
      deep: true,
    },
  },
};
</script>
