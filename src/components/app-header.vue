<template>
  <div>
    <v-app-bar app :color="colors.base" dark>
      <v-app-bar-nav-icon
        @click="OpenDrawer()"
        v-if="$vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Backtracking Visualizer</v-toolbar-title>
      <v-sheet class="mx-auto secondary" dark v-if="$vuetify.breakpoint.mdAndUp">
        <v-slide-group class="problems-slider" :show-arrows="$vuetify.breakpoint.md" mandatory>
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
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn class="ma-2" @click="ChangeColor()" fab small title="Change Color">
          <v-icon> mdi-palette </v-icon>
        </v-btn>
        <help-dialog :colors="colors"></help-dialog>
        <v-btn class="ma-2" fab small :href="gitLink" target="_blank" title="Visit Repository">
          <v-icon> mdi-github </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <side-drawer
      v-if="$vuetify.breakpoint.smAndDown"
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
      gitLink: "https://github.com/MohamedMahmoudHassan/Sudoku-Solver-Visualizer",
    };
  },
  methods: {
    ChangeColor: function () {
      var color = GetRandFromList(colorsList);
      this.ChooseColor(color.value, "primary");
    },

    OpenDrawer: function () {
      this.$vuetify.goTo(0, { duration: 100 });
      this.drawer = true;
    },
  },
};
</script>

<style>
.problem-icon {
  height: 25px;
  margin-right: 5px;
}

@media only screen and (min-width: 960px) {
  .problems-slider {
    max-width: 520px;
  }
}

@media only screen and (min-width: 1050px) {
  .problems-slider {
    max-width: 600px;
  }
}

@media only screen and (min-width: 1264px) {
  .problems-slider {
    max-width: 900px;
  }
}
</style>
