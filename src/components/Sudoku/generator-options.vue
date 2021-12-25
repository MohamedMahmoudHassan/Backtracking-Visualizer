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
        :colors="colors"
        :ChooseGridEmptiness="(emptiness) => ChooseOption(emptiness, 'gridEmptiness')"
      ></grid-emptiness-options>
    </v-col>
    <v-col md="12" sm="6" cols="12" >
      <v-switch
        label="Generate Diagonals First"
        v-model="diagonalsFirst"
        :disabled="isDisabled"
        :color="colors.primary"
        @change="ChooseOption(diagonalsFirst, 'diagonalsFirst')"
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
