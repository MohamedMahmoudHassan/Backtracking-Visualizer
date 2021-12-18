<template>
  <v-card :color="colors.base" tile outlined class="options-container">
    <grid-size-options
      :gridSize="options.gridSize"
      :isDisabled="isDisabled"
      :colors="colors"
      :ChooseGridSize="(size) => ChooseOption(size, 'gridSize')"
    ></grid-size-options>
    <grid-emptiness-options
      :gridEmptiness="options.gridEmptiness"
      :isDisabled="isDisabled"
      :colors="colors"
      :ChooseGridEmptiness="(emptiness) => ChooseOption(emptiness, 'gridEmptiness')"
    ></grid-emptiness-options>
  </v-card>
</template>

<script>
import gridSizeOptions from "./grid-size-options.vue";
import gridEmptinessOptions from "./grid-emptiness-options.vue";
export default {
  name: "generator-options",
  components: { gridSizeOptions, gridEmptinessOptions },
  props: ["options", "isDisabled", "colors", "ChooseOption"],
  data: function () {
    return {
      gridSize: this.options.gridSize,
      gridEmptiness: this.options.gridEmptiness,
    };
  },
};
</script>
