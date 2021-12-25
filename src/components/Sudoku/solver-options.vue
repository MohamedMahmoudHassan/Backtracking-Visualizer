<template>
  <v-row no-gutters>
    <v-col md="12" sm="6" cols="12">
      <grid-size-options
        :gridSize="options.gridSize"
        :isDisabled="isDisabled"
        :colors="colors"
        :ChooseGridSize="(size) => ChooseOption(size, 'gridSize')"
      ></grid-size-options>
    </v-col>
    <v-col md="12" sm="6" cols="12">
      <grid-emptiness-options
        :gridEmptiness="options.gridEmptiness"
        :isDisabled="isDisabled"
        :gridSize="options.gridSize"
        :colors="colors"
        :ChooseGridEmptiness="(emptiness) => ChooseOption(emptiness, 'gridEmptiness')"
      ></grid-emptiness-options>
    </v-col>
    <v-col md="12" sm="6" cols="12">
      <v-switch
        label="Best Cell First"
        v-model="bestFirst"
        :disabled="isDisabled"
        :color="colors.primary"
        @change="ChooseOption(bestFirst, 'bestFirst')"
      ></v-switch>
    </v-col>
    <v-col sm="6" v-if="$vuetify.breakpoint.sm">
      <div class="text-center">
        <v-btn
          class="mt-3"
          elevation="4"
          tile
          dark
          :disabled="isDisabled"
          :color="colors.primary"
          @click="StartVisualization()"
        >
          Start Visualization
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import gridSizeOptions from "./grid-size-options.vue";
import gridEmptinessOptions from "./grid-emptiness-options.vue";
export default {
  name: "generator-options",
  components: { gridSizeOptions, gridEmptinessOptions },
  props: ["options", "isDisabled", "colors", "ChooseOption", "StartVisualization"],
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
