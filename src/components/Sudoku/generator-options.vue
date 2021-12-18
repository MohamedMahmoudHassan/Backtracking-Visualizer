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
    <v-card :color="colors.base" tile outlined>
      <v-switch
        label="Generate Diagonals First"
        v-model="diagonalsFirst"
        :disabled="isDisabled"
        :color="colors.primary"
        @change="ChooseOption(diagonalsFirst, 'diagonalsFirst')"
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
      diagonalsFirst: this.options.diagonalsFirst,
    };
  },
  watch: {
    options: {
      handler: function (val, oldVal) {
        if (val.diagonalsFirst != oldVal.diagonalsFirst)
          this.diagonalsFirst = this.options.diagonalsFirst;
      },
      deep: true,
    },
  },
};
</script>
