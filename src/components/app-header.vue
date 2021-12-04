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
    <v-btn @click="changeColor()">Change Color</v-btn>
  </v-app-bar>
</template>

<script>
import { colorsList, problemsList } from "../config";
import { GetRandFromList } from "../utils/helpers";

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
