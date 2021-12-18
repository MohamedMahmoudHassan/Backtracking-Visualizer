<template>
  <v-card :color="colors.base" tile outlined class="option-item">
    <v-subheader class="pl-0">Grid Emptiness Level</v-subheader>
    <v-slider
      v-model="emptiness"
      min="30"
      max="70"
      step="10"
      thumb-label
      :disabled="isDisabled"
      :color="colors.primary"
      @change="ChooseGridEmptiness(emptiness)"
    >
      <template v-slot:thumb-label="{ value }">
        {{ value + "%" }}
      </template>
    </v-slider>
  </v-card>
</template>

<script>
export default {
  name: "grid-emptiness-options",
  props: ["gridEmptiness", "isDisabled", "colors", "ChooseGridEmptiness"],
  data: function () {
    return {
      emptiness: this.gridEmptiness,
    };
  },
  watch: {
    gridEmptiness: function () {
      this.emptiness = this.gridEmptiness;
    },
  },
};
</script>
