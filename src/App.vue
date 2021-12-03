<template>
  <v-app>
    <app-header
      :colors="colors"
      :chooseColor="(c, prop) => (colors[prop] = c)"
      :problem="problem"
      :chooseProblem="(p) => (problem = p)"
    ></app-header>
    <options-controller
      :colors="colors"
      :options="options"
      :chooseOption="(opt, prop) => (options[prop] = opt)"
    ></options-controller>
    <v-btn @click="showOptions" style="margin: 300px 300px"></v-btn>
    <problem-Grid></problem-Grid>
    <visualization-controller></visualization-controller>
  </v-app>
</template>

<script>
import appHeader from "./components/app-header.vue";
import optionsController from "./components/options-controller.vue";

export default {
  name: "App",
  components: { appHeader, optionsController },
  data: function () {
    return {
      problem: "SudokuGenerator",
      colors: {
        primary: "orange",
        base: "secondary",
      },
      options: {},
      grid: {},
      visualization: {},
    };
  },
  methods: {
    showOptions: function () {
      console.log(this.options);
    },
  },
};
</script>
