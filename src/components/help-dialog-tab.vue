<template>
  <v-tab class="small-tab">
    <v-row class="mx-2">
        <v-icon left> mdi-{{ icon }} </v-icon>
        <span v-if="!$vuetify.breakpoint.xs"> {{ text }}</span>

    </v-row>
  </v-tab>
</template>

<script>
export default {
  name: "help-dialog-tab",
  props: ["icon", "text"],
};
</script>

<style></style>
