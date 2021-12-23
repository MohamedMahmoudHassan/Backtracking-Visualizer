<template>
  <v-app-bar app :color="colors.base" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Backtracking Visualizer</v-toolbar-title>
    <v-sheet class="mx-auto" :color="colors.base" dark v-if="false">
      <v-slide-group class="problems-slider" show-arrows mandatory>
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
    <v-btn v-if="false" class="ma-2" @click="ChangeColor()" fab small title="Change color">
      <v-icon> mdi-palette </v-icon>
    </v-btn>
    <help-dialog v-if="false" :colors="colors"></help-dialog>
    <v-btn
      v-if="false"
      class="ma-2"
      fab
      small
      href="https://github.com/MohamedMahmoudHassan/Sudoku-Solver-Visualizer"
      target="_blank"
      title="Visit repository"
    >
      <v-icon> mdi-github </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import helpDialog from "./help-dialog";

import { mainConfig } from "../config";
import { GetRandFromList } from "../utils/helpers";
var { colorsList, problemsList, problemsEnum } = mainConfig;

export default {
  name: "app-header",
  components: { helpDialog },
  props: ["colors", "problem", "ChooseProblem", "ChooseColor"],
  data: function () {
    return {
      problemsList: problemsList,
      problemsEnum: problemsEnum,
      drawer: false,
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

@media only screen and (max-width: 600px) {
  .problems-slider {
    max-width: 6px;
  }
}
@media only screen and (min-width: 600px) {
  .problems-slider {
    max-width: 600px;
  }
}

@media only screen and (min-width: 960px) {
  .problems-slider {
    max-width: 600px;
  }
}

@media only screen and (min-width: 1264px) {
  .problems-slider {
    max-width: 600px;
  }
}

@media only screen and (min-width: 1904px) {
  .problems-slider {
    max-width: 600px;
  }
}
</style>
