<template>
  <section>
    <div class="container">
      <RadioOptions
        label="Size"
        :options="gridBaseOptions"
        :value="gridBase"
      ></RadioOptions>
      <b-button class="action-btn" type="is-primary" @click="FillGrid()"
        >Fill Grid</b-button
      >
      <b-button class="action-btn" type="is-primary" @click="Solve()"
        >Solve</b-button
      >
    </div>
  </section>
</template>

<script>
import RadioOptions from "./Common/RadioOptions.vue";
export default {
  components: { RadioOptions },
  data() {
    return {
      gridBaseOptions: [
        { id: 1, value: 2, label: "2 x 2" },
        { id: 2, value: 3, label: "3 x 3" },
        { id: 3, value: 4, label: "4 x 4" },
      ],
      gridBase: 3,
    };
  },
};
</script>

<style>
.options-label {
  color: blue;
}
.container {
  width: 350px;
  max-width: 350px;
}
.action-btn {
  margin: 5px;
}
</style>