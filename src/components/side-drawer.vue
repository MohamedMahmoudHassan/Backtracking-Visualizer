<template>
  <v-navigation-drawer v-model="drawerValue" absolute temporary style="z-index: 500">
    <v-list>
      <v-list-group :value="true" :color="colors.primary" no-action>
        <template v-slot:activator>
          <v-icon class="pr-4">mdi-puzzle</v-icon>
          <v-list-item-title>Choose Problem</v-list-item-title>
        </template>
        <v-list-item
          v-for="p in problemsList"
          :key="p.id"
          link
          :input-value="p.value == problem"
          @click="ChooseProblemFromMenu(p.value)"
        >
          <v-list-item-title v-text="p.label"></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="p.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-list dense>
      <help-dialog :colors="colors"></help-dialog>
      <v-list-item link @click="ChangeColor()" :color="colors.primary">
        <v-list-item-icon>
          <v-icon>mdi-palette</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Change Color</v-list-item-title>
      </v-list-item>
      <v-list-item link :href="gitLink" target="_blank">
        <v-list-item-icon>
          <v-icon>mdi-github</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Visit Repository</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import helpDialog from "./help-dialog.vue";
import { mainConfig } from "../config";
export default {
  props: ["drawer", "problem", "colors", "CloseDrawer", "ChooseProblem", "ChangeColor"],
  components: { helpDialog },
  data: function () {
    return {
      gitLink: "https://github.com/MohamedMahmoudHassan/Sudoku-Solver-Visualizer",
      drawerValue: this.drawer,
      problemsList: mainConfig.problemsList,
    };
  },
  methods: {
    ChooseProblemFromMenu: function (problem) {
      this.drawerValue = false;
      this.ChooseProblem(problem);
    },
  },
  watch: {
    drawerValue: function () {
      if (!this.drawerValue) this.CloseDrawer();
    },
    drawer: function () {
      this.drawerValue = this.drawer;
    },
  },
};
</script>
