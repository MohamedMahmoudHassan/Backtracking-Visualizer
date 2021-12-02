<template>
  <v-card elevation="3" color="grey lighten-5" width="600" style="margin: 100px 0px 80px 400px">
    <v-container color="grey lighten-5">
      <v-row no-gutters v-for="row in grid" :key="row.id">
        <template v-for="cell in row.value">
          <v-col :key="cell.row + '-' + cell.col">
            <div :style="getCellStyle()" :class="getCellClass(cell)" outlined tile>
              {{ cell.state == states.empty ? "" : cell.value }}
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
    getCellClass: function (cell) {
      return [
        "grid-cell pa-24",
        cell.state,
        { "first-row": cell.row == 1 },
        { "first-col": cell.col == 1 },
        { "last-group-row": cell.row % this.gridBase == 0 },
        { "last-group-column": cell.col % this.gridBase == 0 },
      ];
    },

    getCellStyle: function () {
      return {
        height: this.getCellLength() + "px",
        fontSize: this.getFontSize() + "px",
        textAlign: "center",
      };
    },
  },
};
</script>

<style>
.grid-cell {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.try-cell {
  background-color:#80D8FF;
}

.faild-cell {
  background-color: #FF8A80;
}

.succeed-cell {
  background-color: #B9F6CA;
}

.invalid-cell {
  background-color: rgb(228, 231, 17, 0.5);
}

.const-cell {
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
