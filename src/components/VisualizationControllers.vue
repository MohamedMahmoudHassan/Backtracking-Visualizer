<template>
  <div>
    <input v-model="options.visualSpeed" />
    <button @click="Autoplay">Autoplay</button>
    <button @click="StepBack">StepBack</button>
    <button @click="StepForward">StepForward</button>
  </div>
</template>

<script>
export default {
  props: ["Autoplay", "StepBack", "StepForward", "options"],
};
</script>

<style>
</style>