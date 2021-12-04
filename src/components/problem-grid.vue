<template>
  <v-card elevation="3" color="grey lighten-5" width="600" style="margin: 90px 0px 0px 350px">
    <generator-grid :grid="grid" :changeGrid="changeGrid" :options="options" :colors="colors"></generator-grid>
  </v-card>
</template>

<script>
import generatorGrid from "./Sudoku/generator-grid.vue";
export default {
  name: "problem-grid",
  components: { generatorGrid },
  props: ["grid", "changeGrid", "options", "colors"],
};
</script>
