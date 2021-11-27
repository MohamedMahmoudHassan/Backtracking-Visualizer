<template>
  <v-navigation-drawer
    absolute
    color="secondary"
    dark
    permanent
    right
    width="355"
  >
    <v-card class="secondary" tile outlined style="margin: 80px 10px">
      <v-card class="secondary" tile outlined>
        <v-subheader class="pl-0">Grid Size</v-subheader>
        <v-radio-group
          row
          v-model="options.gridBase"
          @change="onChangeGridBase"
        >
          <v-radio
            color="orange"
            v-for="base in gridBaseOptions"
            :key="base.id"
            :label="base.label"
            :value="base.value"
          ></v-radio>
        </v-radio-group>
      </v-card>

      <v-card class="secondary" tile outlined style="margin-top: 20px">
        <v-switch
          v-model="options.visualizeSteps"
          label="Visualize Generation Steps"
          color="orange"
        ></v-switch>
      </v-card>

      <v-card class="secondary" tile outlined style="margin-top: 20px">
        <v-subheader class="pl-0">Empty Cells Percentage</v-subheader>
        <v-slider
          v-model="options.EmptyCellsPercentage"
          color="orange"
          max="70"
          min="30"
          thumb-label
        >
          <template v-slot:thumb-label="{ value }">
            {{ value + "%" }}
          </template>
        </v-slider>
      </v-card>

      <v-row align="center" justify="space-around" style="margin-top: 20px">
        <v-btn @click="FillGrid" color="orange" elevation="4"
          >Generate New Grid</v-btn
        >
        <v-btn @click="Solve" color="orange" elevation="4">Solve</v-btn>
      </v-row>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["FillGrid", "Solve", "options", "onChangeGridBase"],
  data: function () {
    return {
      visualizeSteps: this.options.visualizeSteps,
      gridBaseOptions: [
        { id: 1, value: 1, label: "1 x 1" },
        { id: 2, value: 2, label: "2 x 2" },
        { id: 3, value: 3, label: "3 x 3" },
        { id: 4, value: 4, label: "4 x 4" },
      ],
    };
  },
};
</script>

<style>
</style>