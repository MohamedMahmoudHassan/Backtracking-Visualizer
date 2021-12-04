<template>
  <v-card :color="colors.base" tile outlined style="margin: 80px 10px">
    <grid-size-options
      :isDisabled="isDisabled"
      :colors="colors"
      :gridSize="gridSize"
      :chooseGridSize="(size) => chooseOption(size, 'gridSize')"
    ></grid-size-options>
    <grid-emptiness-options
      :isDisabled="isDisabled"
      :colors="colors"
      :gridEmptiness="gridEmptiness"
      :chooseGridEmptiness="(emptiness) => chooseOption(emptiness, 'gridEmptiness')"
    ></grid-emptiness-options>
    <v-card :color="colors.base" tile outlined style="margin-top: 20px">
      <v-switch
        :disabled="isDisabled"
        v-model="diagonalsFirst"
        label="Generate Diagonals First"
        :color="colors.primary"
        @change="chooseOption(diagonalsFirst, 'diagonalsFirst')"
      ></v-switch>
    </v-card>

    <v-row align="center" justify="space-around" style="margin-top: 20px">
      <v-btn :color="colors.primary" elevation="4" :disabled="isDisabled"
        >Start Visualization</v-btn
      >
    </v-row>
  </v-card>
</template>

<script>
import gridSizeOptions from "./grid-size-options.vue";
import gridEmptinessOptions from "./grid-emptiness-options.vue";
export default {
  name: "generator-options",
  components: { gridSizeOptions, gridEmptinessOptions },
  props: ["options", "chooseOption", "isDisabled", "colors"],
  data: function () {
    return {
      gridSize: 3,
      gridEmptiness: 50,
      diagonalsFirst: false,
    };
  },
  created: function () {
    this.chooseOption(this.gridSize, "gridSize");
    this.chooseOption(this.gridEmptiness, "gridEmptiness");
    this.chooseOption(this.diagonalsFirst, "diagonalsFirst");
  },
};
</script>
