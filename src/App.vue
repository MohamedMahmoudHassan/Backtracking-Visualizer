<template>
  <v-app>
    <sudoku></sudoku>
  </v-app>
</template>

<script>
import Sudoku from "./components/Sudoku.vue";

export default {
  name: "App",
  components: { Sudoku },
};
</script>
