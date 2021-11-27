<template>
  <v-navigation-drawer
    absolute
    class="secondary"
    dark
    permanent
    right
    width="400"
  >
    <input
      type="checkbox"
      v-model="options.visualizeSteps"
      :true-value="true"
      :false-value="false"
    />
    <input v-model="options.gridBase" @change="onChangeGridBase" />
    <input v-model="options.EmptyCellsPercentage" />

    <button @click="FillGrid">Fill</button>
    <button @click="Solve">Solve</button>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["FillGrid", "Solve", "options", "onChangeGridBase"],
  data: function () {
    return {
      visualizeSteps: this.options.visualizeSteps,
      gridBaseOptions: [
        { id: 1, value: 2, label: "2 x 2" },
        { id: 2, value: 3, label: "3 x 3" },
        { id: 3, value: 4, label: "4 x 4" },
      ],
    };
  },
};
</script>

<style>
</style>