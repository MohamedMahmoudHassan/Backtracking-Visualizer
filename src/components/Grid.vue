<template>
  <v-card
    elevation="3"
    color="grey lighten-5"
    width="600"
    style="margin: 80px 300px"
  >
    <v-container color="grey lighten-5">
      <v-row no-gutters v-for="row in grid" :key="row.id">
        <template v-for="cell in row.value">
          <v-col
            :key="cell.row * gridBase + cell.col"
            style="text-align: center"
          >
            <div
              :style="{
                height: getCellLength() + 'px',
              }"
              :class="[
                'grid-cell pa-24',
                cell.state,
                { 'first-row': cell.row == 1 },
                { 'first-col': cell.col == 1 },
                { 'last-group-row': cell.row % gridBase == 0 },
                { 'last-group-column': cell.col % gridBase == 0 },
              ]"
              :height="getCellLength()"
              outlined
              tile
            >
              {{ cell.row * gridBase + cell.col }}
            </div>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["grid", "gridBase", "states"],
  methods: {
    getCellLength: function () {
      return (36 * 15) / (this.gridBase * this.gridBase);
    },
    getFontSize: function () {
      return (36 * 6) / (this.gridBase * this.gridBase);
    },
  },
};
</script>

<style>
.grid-cell {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
}

.try-cell {
  color: rgb(43, 101, 226, 1);
  background-color: rgba(43, 101, 226, 0.5);
}

.faild-cell {
  color: rgba(255, 0, 0, 1);
  background-color: rgba(255, 0, 0, 0.5);
}

.succeed-cell {
  color: rgb(13, 185, 13, 1);
  background-color: rgb(13, 185, 13, 0.5);
}

.invalid-cell {
  color: rgb(228, 231, 17, 0.5);
  background-color: rgba(238, 255, 0, 0.5);
}

.const-cell {
  color: rgba(50, 50, 50, 1);
  background-color: rgba(50, 50, 50, 0.05);
}

.first-row {
  border-top-color: rgba(0, 0, 0, 0.4);
}

.first-col {
  border-left-color: rgba(0, 0, 0, 0.4);
}

.last-group-row {
  border-bottom-color: rgba(0, 0, 0, 0.4);
}

.last-group-column {
  border-right-color: rgba(0, 0, 0, 0.4);
}
</style>