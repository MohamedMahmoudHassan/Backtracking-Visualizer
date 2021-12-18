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
      :gridSize="options.gridSize"
      :colors="colors"
      :ChooseGridEmptiness="(emptiness) => ChooseOption(emptiness, 'gridEmptiness')"
    ></grid-emptiness-options>
    <v-card :color="colors.base" tile outlined>
      <v-switch
        label="Best Cell First"
        v-model="bestFirst"
        :disabled="isDisabled"
        :color="colors.primary"
        @change="ChooseOption(bestFirst, 'bestFirst')"
      ></v-switch>
    </v-card>
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
      bestFirst: this.options.bestFirst,
    };
  },
  watch: {
    options: {
      handler: function (val, oldVal) {
        if (val.bestFirst != oldVal.bestFirst) this.bestFirst = this.options.bestFirst;
      },
      deep: true,
    },
  },
};
</script>
