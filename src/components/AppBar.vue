<template>
  <v-app-bar app color="secondary" dark>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-sheet class="mx-auto" max-width="700" color="secondary" dark>
      <v-slide-group show-arrows mandatory>
        <v-slide-item v-for="problem in problems" :key="problem.id" v-slot="{ active, toggle }">
          <v-btn
            class="mx-2"
            :input-value="active"
            :active-class="colors.primary + ' white--text'"
            depressed
            rounded
            @click="toggle"
          >
            {{ problem.name }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-app-bar>
</template>

<script>
export default {
  props: ["title", "colors", "problems"],
};
</script>

<style></style>
