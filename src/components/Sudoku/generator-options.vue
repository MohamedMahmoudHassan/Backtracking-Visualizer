<template>
  <v-card :color="colors.base" tile outlined style="margin: 80px 10px">
    <grid-size-options
      :colors="colors"
      :gridSize="gridSize"
      :chooseGridSize="(size) => chooseOption(size, 'gridSize')"
    ></grid-size-options>
    <grid-emptiness-options
      :colors="colors"
      :gridEmptiness="gridEmptiness"
      :chooseGridEmptiness="(emptiness) => chooseOption(emptiness, 'gridEmptiness')"
    ></grid-emptiness-options>

    <v-row align="center" justify="space-around" style="margin-top: 20px">
      <v-btn :color="colors.primary" elevation="4">Start Visualization</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import gridSizeOptions from "./grid-size-options.vue";
import gridEmptinessOptions from "./grid-emptiness-options.vue";
export default {
  name: "generator-options",
  components: { gridSizeOptions, gridEmptinessOptions },
  props: ["options", "chooseOption", "colors"],
  data: function () {
    return {
      gridSize: 3,
      gridEmptiness: 50,
    };
  },
  created: function () {
    this.chooseOption(this.gridSize, "gridSize");
    this.chooseOption(this.gridEmptiness, "gridEmptiness");
  },
};
</script>
