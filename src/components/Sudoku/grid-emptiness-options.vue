<template>
  <v-card :color="colors.base" tile outlined style="margin-top: 20px">
    <v-subheader class="pl-0">Grid Emptiness Level</v-subheader>
    <v-slider
      v-model="emptiness"
      @change="chooseGridEmptiness(emptiness)"
      :color="colors.primary"
      max="70"
      min="30"
      thumb-label
      :disabled="isDisabled"
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
  props: ["gridEmptiness", "chooseGridEmptiness", "isDisabled", "colors"],
  data: function () {
    return {
      emptiness: this.gridEmptiness,
    };
  },
};
</script>
