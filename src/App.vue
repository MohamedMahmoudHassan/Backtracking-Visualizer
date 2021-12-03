<template>
  <v-app>
    <app-header
      :colors="colors"
      :chooseColor="(c) => (colors.primary = c)"
      :problem="problem"
      :chooseProblem="(p) => (problem = p)"
    ></app-header>
    <options-controller></options-controller>
    <problem-Grid></problem-Grid>
    <visualization-controller></visualization-controller>
  </v-app>
</template>

<script>
import appHeader from "./components/app-header.vue";

export default {
  name: "App",
  components: { appHeader },
  data: function () {
    return {
      problem: "Sudoku Generator/Solver",
      colors: {
        primary: "orange",
      },
    };
  },
};
</script>
