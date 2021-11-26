<template>
  <div>
    <div class="grid">
      <div class="grid-row" v-for="row in grid" :key="row.id">
        <div
          :class="[
            'grid-cell',
            cell.state,
            { 'last-group-row': cell.row % gridBase == 0 },
            { 'last-group-column': cell.col % gridBase == 0 },
          ]"
          v-for="cell in row.value"
          :key="cell.row + '-' + cell.col"
        >
          {{ cell.state == states.empty ? "" : cell.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["grid", "states", "gridBase"],
};
</script>

<style>
.grid-cell {
  box-sizing: border-box;
  border-color: black;
  border-bottom-style: solid;
  border-right-style: solid;
  border-bottom-width: 1px;
  border-right-width: 1px;
  width: 60px;
  height: 60px;
  font-size: x-large;
  float: left;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.try-cell {
  color: blueviolet;
}

.faild-cell {
  color: red;
}

.succeed-cell {
  color: rgb(13, 185, 13);
}

.grid {
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