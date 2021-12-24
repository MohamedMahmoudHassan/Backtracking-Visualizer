<template>
  <div>
    <v-app-bar app :color="colors.base" dark>
      <v-app-bar-nav-icon @click="drawer = true" v-if="$vuetify.breakpoint.xs"></v-app-bar-nav-icon>
      <v-toolbar-title>Backtracking Visualizer</v-toolbar-title>
      <v-sheet class="mx-auto secondary" dark v-if="$vuetify.breakpoint.smAndUp">
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
                v-else-if="p.value == problemsEnum.sudokuSolver"
                src="../assets/images/sudoku-9-full.svg"
                class="problem-icon"
              />
              <img
                v-else-if="p.value == problemsEnum.nQueens"
                src="../assets/images/queen_chess.svg"
                class="problem-icon"
              />
              <img
                v-else-if="p.value == problemsEnum.knightTour"
                src="../assets/images/knight_chess.svg"
                class="problem-icon"
              />
              {{ p.label }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-btn v-if="false" class="ma-2" @click="ChangeColor()" fab small title="Change Color">
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
        title="Visit Repository"
      >
        <v-icon> mdi-github </v-icon>
      </v-btn>
    </v-app-bar>
    <side-drawer
      :drawer="drawer"
      :problem="problem"
      :colors="colors"
      :CloseDrawer="() => (drawer = false)"
      :ChooseProblem="ChooseProblem"
      :ChangeColor="ChangeColor"
    ></side-drawer>
  </div>
</template>

<script>
import helpDialog from "./help-dialog.vue";
import sideDrawer from "./side-drawer.vue";

import { mainConfig } from "../config";
import { GetRandFromList } from "../utils/helpers";
var { colorsList, problemsList, problemsEnum } = mainConfig;

export default {
  name: "app-header",
  components: { helpDialog, sideDrawer },
  props: ["colors", "problem", "ChooseProblem", "ChooseColor"],
  data: function () {
    return {
      problemsList: problemsList,
      problemsEnum: problemsEnum,
      drawer: false,
      group: null,
    };
  },
  methods: {
    ChangeColor: function () {
      var color = GetRandFromList(colorsList);
      this.ChooseColor(color.value, "primary");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
.problem-icon {
  height: 25px;
  margin-right: 5px;
}
@media only screen and (min-width: 600px) {
  .problems-slider {
    max-width: 360px;
  }
}

@media only screen and (min-width: 800px) {
  .problems-slider {
    max-width: 560px;
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
