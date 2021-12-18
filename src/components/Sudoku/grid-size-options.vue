<template>
  <v-card :color="colors.base" tile outlined>
    <v-subheader class="pl-0">Grid Size</v-subheader>
    <v-row justify="space-around">
      <v-radio-group row v-model="size" @change="ChooseGridSize(size)" :disabled="isDisabled">
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
</template>

<script>
import { sudokuGenConfig } from "../../config";

export default {
  name: "grid-size-options",
  props: ["gridSize", "isDisabled", "colors", "ChooseGridSize"],
  data: function () {
    return {
      size: this.gridSize,
      gridSizesList: sudokuGenConfig.gridSizesList,
    };
  },
  watch: {
    gridSize: function () {
      this.size = this.gridSize;
    },
  },
};
</script>
