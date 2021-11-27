<template>
  <v-card elevation="3" color="grey lighten-5" loading width="600" style="margin: 80px 300px">
    <div class="grid">
      <div class="grid-row" v-for="row in grid" :key="row.id">
        <div
          :class="[
            'grid-cell',
            cell.state,
            { 'last-group-row': cell.row % gridBase == 0 },
            { 'last-group-column': cell.col % gridBase == 0 },
          ]"
          :style="{
            width: getCellLength() + 'px',
            height: getCellLength() + 'px',
            fontSize: getFontSize() + 'px',
          }"
          v-for="cell in row.value"
          :key="cell.row + '-' + cell.col"
        >
          {{
            cell.state == states.empty || cell.state == states.invalid
              ? ""
              : cell.value
          }}
        </div>
      </div>
    </div>
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
  box-sizing: border-box;
  border-color: rgba(0, 0, 0, 1);
  border-bottom-style: solid;
  border-right-style: solid;
  border-bottom-width: 1px;
  border-right-width: 1px;
  float: left;
  display: inline-flex;
  justify-content: center;
  align-items: center;
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

.grid {
  margin: 28px;
  box-sizing: border-box;
  border-top-style: solid;
  width: fit-content;
}

.grid-row {
  box-sizing: border-box;
  border-left-style: solid;
  overflow: hidden;
}

.last-group-row {
  box-sizing: border-box;
  border-bottom-width: initial;
}

.last-group-column {
  box-sizing: border-box;
  border-right-width: initial;
}
</style>