<template>
  <v-snackbar v-model="view" vertical width="600">
    Solution found has too many steps (more than 100,000 steps)
    <template v-slot:action="{ attrs }">
      <v-btn :color="colors.primary" text v-bind="attrs" @click="TryAgain()"> Try again </v-btn>
      <v-btn :color="colors.primary" text v-bind="attrs" @click="ChooseDefaultOptions()">
        Choose different options
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "many-steps-snackbar",
  props: ["view", "colors", "TryAgain", "ChooseDefaultOptions"],
};
</script>
