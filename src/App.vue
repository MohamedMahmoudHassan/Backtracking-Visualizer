<template>
  <v-app>
    <app-header
      :colors="colors"
      :chooseColor="(c, prop) => (colors[prop] = c)"
      :problem="problem"
      :chooseProblem="(p) => (problem = p)"
    ></app-header>
    <options-controller
      :isDisabled="false"
      :colors="colors"
      :options="options"
      :chooseOption="(opt, prop) => changeOption(opt, prop)"
    ></options-controller>
    <problem-grid
      :grid="grid"
      :changeGrid="(newGrid) => (grid = newGrid)"
      :options="options"
      :colors="colors"
    ></problem-grid>
    <visualization-controller></visualization-controller>
  </v-app>
</template>

<script>
import appHeader from "./components/app-header.vue";
import optionsController from "./components/options-controller.vue";
import problemGrid from "./components/problem-grid.vue";

import { InitCells } from "./utils/sudoku";

export default {
  name: "App",
  components: { appHeader, optionsController, problemGrid },
  data: function () {
    return {
      problem: "SudokuGenerator",
      colors: {
        primary: "orange",
        base: "secondary",
      },
      options: {},
      optionsNeedRecreate: ['gridSize'],
      grid: {},
      visualization: {},
    };
  },
  methods: {
    changeOption: function (opt, prop) {
      this.options[prop] = opt;
      if (this.optionsNeedRecreate.includes(prop)) this.grid = InitCells(this.options);
    },
  },
};
</script>
