<template>
  <v-app-bar app color="secondary" dark>
    <v-toolbar-title>Backtracking Visulaizer</v-toolbar-title>
    <v-sheet class="mx-auto" max-width="500" color="secondary" dark>
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
      var color = colorsList[Math.floor(Math.random() * colorsList.length)];
      this.chooseColor(color.value);
    },
  },
};
</script>

<style></style>