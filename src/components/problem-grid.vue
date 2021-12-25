<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card
          elevation="3"
          class="ma-auto problem-grid"
          :loading="isSearching ? colors.primary : false"
        >
          <sudoku-grid
            v-if="problem == problemsEnum.sudokuGenerator || problem == problemsEnum.sudokuSolver"
            :grid="grid"
            :options="options"
            :colors="colors"
          ></sudoku-grid>
          <n-queens-grid
            v-else-if="problem == problemsEnum.nQueens"
            :grid="grid"
            :options="options"
            :colors="colors"
          ></n-queens-grid>
          <knight-tour-grid
            v-else-if="problem == problemsEnum.knightTour"
            :grid="grid"
            :options="options"
            :colors="colors"
          ></knight-tour-grid>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import sudokuGrid from "./Sudoku/sudoku-grid.vue";
import nQueensGrid from "./NQueens/n-queens-grid.vue";
import knightTourGrid from "./KnightTour/knight-tour-grid.vue";

import { mainConfig } from "../config";
var { problemsEnum } = mainConfig;

export default {
  name: "problem-grid",
  components: { sudokuGrid, nQueensGrid, knightTourGrid },
  props: ["grid", "problem", "isSearching", "options", "colors"],
  data: function () {
    return {
      problemsEnum: problemsEnum,
    };
  },
};
</script>

<style>
.grid-cell {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: "center";
  height: 100%;
}

@media only screen and (max-width: 600px) {
  .problem-grid {
    height: 280px;
    width: 280px;
    font-size: 126px;
  }
}
@media only screen and (min-width: 600px) {
  .problem-grid {
    height: 320px;
    width: 320px;
    font-size: 144px;
  }
}

@media only screen and (min-width: 960px) {
  .problem-grid {
    height: 450px;
    width: 450px;
    font-size: 162px;
  }
}

@media only screen and (min-width: 1264px) {
  .problem-grid {
    height: 560px;
    width: 560px;
    font-size: 180px;
  }
}

@media only screen and (min-width: 1904px) {
  .problem-grid {
    height: 750px;
    width: 750px;
    font-size: 234px;
  }
}
</style>
