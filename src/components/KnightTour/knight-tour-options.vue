<template>
  <v-row no-gutters>
    <v-col md="12" sm="6" cols="12">
      <div>
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
      </div>
    </v-col>
    <v-col sm="6" v-if="$vuetify.breakpoint.sm" class="mt-10">
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
import { knightTourConfig } from "../../config";

export default {
  name: "knight-tour-options",
  props: ["options", "isDisabled", "colors", "ChooseOption", "StartVisualization"],
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
