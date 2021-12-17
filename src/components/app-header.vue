<template>
  <v-app-bar app :color="colors.base" dark>
    <v-toolbar-title>Backtracking Visualizer</v-toolbar-title>
    <v-sheet class="mx-auto" max-width="800" :color="colors.base" dark>
      <v-slide-group show-arrows mandatory>
        <v-slide-item v-for="p in problemsList" :key="p.id">
          <v-btn
            class="mx-2"
            rounded
            :color="p.value == problem ? colors.primary : ''"
            @click="ChooseProblem(p.value)"
          >
            <img
              v-if="p.value == problemsEnum.sudokuGenerator"
              src="../assets/images/sudoku-9-empty.svg"
              class="problem-icon"
            />
            <img
              v-if="p.value == problemsEnum.sudokuSolver"
              src="../assets/images/sudoku-9-full.svg"
              class="problem-icon"
            />
            <img
              v-if="p.value == problemsEnum.nQueens"
              src="../assets/images/queen_chess.svg"
              class="problem-icon"
            />
            <img
              v-if="p.value == problemsEnum.knightTour"
              src="../assets/images/knight_chess.svg"
              class="problem-icon"
            />
            {{ p.label }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-btn class="ma-2" @click="ChangeColor()" fab small>
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
var { colorsList, problemsList, problemsEnum } = mainConfig;

export default {
  name: "app-header",
  props: ["colors", "ChooseColor", "problem", "ChooseProblem"],
  data: function () {
    return {
      problemsList: problemsList,
      problemsEnum: problemsEnum,
    };
  },
  methods: {
    ChangeColor: function () {
      var color = GetRandFromList(colorsList);
      this.ChooseColor(color.value, "primary");
    },
  },
};
</script>

<style>
.problem-icon {
  height: 25px;
  margin-right: 5px;
}
</style>
