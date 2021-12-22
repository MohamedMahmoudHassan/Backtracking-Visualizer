<template>
  <div>
    <v-radio-group v-model="size" @change="ChooseGridSize(size)" :disabled="isDisabled">
      <v-row>
        <v-col xl="4" lg="4" md="6" cols="4" v-for="size in gridSizesList" :key="size.id">
          <v-radio :label="size.label" :value="size.value" :color="colors.primary">
            <template v-slot:label>
              <div style="font-size: .9rem">{{size.label}}</div>
            </template>
          </v-radio>
        </v-col>
      </v-row>
    </v-radio-group>
  </div>
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
