<template>
  <mu-container>
    <mu-drawer open docked width="350" right :z-depth="10">
        <mu-form
          :model="options"
          label-position="top"
          label-width="100"
        >
          <mu-form-item prop="radio" label="Radio">
            <mu-radio
              v-bind:key="base.id"
              v-for="base in gridBaseOptions"
              :value="base.value"
              v-model="options.gridBase"
              :label="base.label"
              @change="onChangeGridBase"
              color="warning"
            ></mu-radio>
          </mu-form-item>

          <mu-flex class="select-control-row">
            <mu-switch
              v-model="options.visualizeSteps"
              label-left
              color="warning"
              label="Visualize Steps"
            ></mu-switch>
          </mu-flex>
          <mu-slider
            class="demo-slider"
            color="secondary"
            :min="30"
            :max="70"
            :step="1"
            v-model="options.EmptyCellsPercentage"
          ></mu-slider>

          <mu-container class="button-wrapper">
            <mu-button color="primary" @click="FillGrid">Fill Grid</mu-button>
            <mu-button color="primary" @click="Solve">Solve</mu-button>
          </mu-container>
        </mu-form>
    </mu-drawer>
  </mu-container>
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
.radio-group {
  margin: 7px;
}
.drawer {
  height: 100%;
  background-color: #5c6bc094;
}

.button-wrapper .mu-button {
  text-align: center;
  margin: 8px;
}
.option-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  position: relative;
  text-align: center;
}
</style>