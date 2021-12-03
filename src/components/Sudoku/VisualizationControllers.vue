<template>
  <v-card style="margin: 80px 50px">
    <v-progress-linear
      :color="colors.primary"
      :value="(options.currentStepId * 100) / options.steps.length"
    ></v-progress-linear>
    <v-card height="400">
      <v-timeline dense>
        <v-slide-x-transition group hide-on-leave>
          <v-timeline-item v-for="step in options.steps" :key="step.id" :color="colors.primary">{{
            step.description
          }}</v-timeline-item>
        </v-slide-x-transition>
      </v-timeline>
    </v-card>
    <v-btn @click="AutoAdd()" :color="colors.primary" dark elevation="4" block
      >{{ options.currentStepId }} of {{ options.steps.length }} steps</v-btn
    >
    <v-card tile>
      <v-slider
        style="margin: 10px 20px 0px 20px"
        v-model="options.visualSpeed"
        :color="colors.primary"
        track-color="secondary"
        :tick-labels="['Slower', 'Slow', 'Normal', 'Fast', 'Faster']"
        min="1"
        max="5"
        ticks="always"
      >
      </v-slider>
      <v-card tile style="padding: 3px; text-align: center">
        <v-btn class="mx-2" depressed fab dark small @click="StepBack" color="secondary">
          <v-icon dark> mdi-skip-previous </v-icon>
        </v-btn>
        <v-btn v-if="true" class="mx-2" depressed fab dark @click="Autoplay" :color="colors.primary">
          <v-icon dark> mdi-play </v-icon>
        </v-btn>
        <v-btn v-else class="mx-2" depressed fab dark @click="Autoplay" :color="colors.primary">
          <v-icon dark> mdi-pause </v-icon>
        </v-btn>
        <v-btn class="mx-2" depressed fab dark small @click="StepForward" color="secondary">
          <v-icon dark> mdi-skip-next </v-icon>
        </v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: ["Autoplay", "StepBack", "StepForward", "options", "colors"],
  data: function () {
    return {
      steps: ["step 1", "step 2", "step 3", "step 4", "step 5", "step 6"],
      length: 5,
    };
  },
  methods: {
    GetRandValue: function (items) {
      return items[Math.floor(Math.random() * items.length)];
    },

    anyText: function () {
      var ret = "";
      var chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
      for (var i = 0; i < 30; i++) ret += this.GetRandValue(chars);
      return ret;
    },

    Add: function () {
      this.steps.pop();
      this.steps = [this.anyText(), ...this.steps];
    },
    AutoAdd: function () {
      this.Add();
      setTimeout(() => this.AutoAdd(), 1000);
    },
  },
};
</script>

<style></style>
