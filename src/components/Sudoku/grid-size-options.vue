<template>
  <v-card :color="colors.base" tile outlined>
    <v-subheader class="pl-0">Grid Size</v-subheader>
    <v-row justify="space-around">
      <v-radio-group row v-model="size" @change="chooseGridSize(size)" :disabled="isDisabled">
        <v-radio
          :color="colors.primary"
          v-for="size in gridSizesList"
          :key="size.id"
          :label="size.label"
          :value="size.value"
        ></v-radio>
      </v-radio-group>
    </v-row>
  </v-card>
</template>

<script>
import { sudoku } from "../../config";

export default {
  name: "grid-size-options",
  props: ["gridSize", "chooseGridSize", "isDisabled", "colors"],
  data: function () {
    return {
      gridSizesList: sudoku.gridSizesList,
      size: this.gridSize,
    };
  },
};
</script>
