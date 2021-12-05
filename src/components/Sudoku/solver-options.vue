<template>
  <v-card :color="colors.base" tile outlined style="margin: 80px 10px 0px 10px">
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
      gridSize: this.options.gridSize,
      gridEmptiness: this.options.gridEmptiness,
    };
  },
};
</script>
