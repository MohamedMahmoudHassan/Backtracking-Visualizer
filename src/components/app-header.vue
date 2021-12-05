<template>
  <v-app-bar app :color="colors.base" dark>
    <v-toolbar-title>Backtracking Visualizer</v-toolbar-title>
    <v-sheet class="mx-auto" max-width="600" :color="colors.base" dark>
      <v-slide-group show-arrows mandatory>
        <v-slide-item v-for="p in problemsList" :key="p.id">
          <v-btn
            class="mx-2"
            rounded
            :color="p.value == problem ? colors.primary : ''"
            @click="chooseProblem(p.value)"
          >
            {{ p.label }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-btn class="ma-2" @click="changeColor()" fab small>
      <v-icon> mdi-palette </v-icon>
    </v-btn>
    <v-btn class="ma-2" fab small>
      <v-icon> mdi-help </v-icon>
    </v-btn>
    <v-btn
      class="ma-2"
      fab
      small
      href="https://github.com/MohamedMahmoudHassan/Sudoku-Solver-Visualizer"
      target="_blank"
    >
      <v-icon> mdi-github </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mainConfig } from "../config";
import { GetRandFromList } from "../utils/helpers";
var { colorsList, problemsList } = mainConfig;

export default {
  name: "app-header",
  props: ["colors", "chooseColor", "problem", "chooseProblem"],
  data: function () {
    return {
      problemsList: problemsList,
    };
  },
  methods: {
    changeColor: function () {
      var color = GetRandFromList(colorsList);
      this.chooseColor(color.value, "primary");
    },
  },
};
</script>

<style></style>
