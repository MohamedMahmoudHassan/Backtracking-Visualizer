<template>
  <v-container>
    <v-row no-gutters v-for="row in 8" :key="row.id">
      <v-col v-for="col in 8" :key="row + '-' + col">
        <div :style="getCellStyle()" :class="getCellClass(row, col)" outlined tile>
          <img src="../../assets/queen_chess.svg" :height="getCellLength() * 2 / 3">
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "n-queens-grid",
  props: ["colors"],
  data: function () {
    return {
      sudokuGrid: [],
      gridSize: 8,
    };
  },
  methods: {
    getCellLength: function () {
      return (36 * 15) / this.gridSize;
    },
    getFontSize: function () {
      return (36 * 6) / this.gridSize;
    },
    getCellClass: function (row, col) {
      return ["grid-cell pa-24", (row + col) % 2 ? "black-cell" : "white-cell"];
    },

    getCellStyle: function () {
      return {
        height: this.getCellLength() + "px",
        fontSize: this.getFontSize() + "px",
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
  text-align: "center";
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

.const-cell {
  background-color: rgba(50, 50, 50, 0.05);
}

.black-cell {
  background-color: #7e7e7e;
}

.white-cell {
  background-color: #80d9ff00;
}

.succeed-cell {
  background-color: #b9f6ca;
}

.invalid-cell {
  background-color: rgb(228, 231, 17, 0.5);
}
</style>
