<template>
  <v-snackbar v-model="show" vertical width="600">
    Solution found has too many steps (more than 100,000 steps)
    <template v-slot:action="{ attrs }">
      <v-btn :color="colors.primary" text v-bind="attrs" @click="TryAgain()"> Try again </v-btn>
      <v-btn :color="colors.primary" text v-bind="attrs" @click="ChooseDefaultOptions()">
        Change options
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "many-steps-snackbar",
  props: ["showManyStepsSnackbar", "colors", "TryAgain", "ChooseDefaultOptions", "Hide"],
  data: function () {
    return {
      show: this.showManyStepsSnackbar,
    };
  },
  watch: {
    showManyStepsSnackbar: function () {
      this.show = this.showManyStepsSnackbar;
    },
    show: function () {
      if (!this.show) this.Hide();
    },
  },
};
</script>
