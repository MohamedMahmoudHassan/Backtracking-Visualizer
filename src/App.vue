<template>
  <div id="app">
    <Grid></Grid>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";

export default {
  name: "App",
  components: {
    Grid,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
