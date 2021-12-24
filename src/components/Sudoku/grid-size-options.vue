<template>
  <div>
    <v-subheader class="pl-0">Grid Size</v-subheader>
    <v-radio-group v-model="size" @change="ChooseGridSize(size)" :disabled="isDisabled">
      <v-row no-gutters>
        <v-col lg="4" md="6" cols="4" v-for="size in gridSizesList" :key="size.id">
          <v-radio :value="size.value" :color="colors.primary">
            <template v-slot:label>
              <div >{{ size.label }}</div>
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
