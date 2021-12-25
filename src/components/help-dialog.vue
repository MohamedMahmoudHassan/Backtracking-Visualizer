<template>
  <v-dialog v-model="dialog" max-width="750">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        class="ma-2"
        fab
        small
        v-bind="attrs"
        v-on="on"
        title="Help"
      >
        <v-icon> mdi-help </v-icon>
      </v-btn>
      <v-list-item v-else link v-bind="attrs" v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-help</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Help</v-list-item-title>
      </v-list-item>
    </template>

    <v-card>
      <v-toolbar flat :color="colors.base" dark>
        <v-toolbar-title>{{
          $vuetify.breakpoint.smAndUp ? "Welcome to Backtracking Visualizer" : "Help"
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" right>Got it!</v-btn>
      </v-toolbar>
      <v-tabs vertical :color="colors.primary" hide-slider>
        <v-tab class="small-tab">
          <v-icon left> mdi-emoticon-happy </v-icon>
          <span v-if="!$vuetify.breakpoint.xs"> How To Use</span>
        </v-tab>
        <v-tab class="small-tab">
          <v-icon left> mdi-information </v-icon>
          <span v-if="!$vuetify.breakpoint.xs"> Introduction</span>
        </v-tab>
        <v-tab class="small-tab">
          <v-icon left> mdi-grid </v-icon>
          <span v-if="!$vuetify.breakpoint.xs"> Sudoku Generator </span>
        </v-tab>
        <v-tab class="small-tab">
          <v-icon left> mdi-grid </v-icon>
          <span v-if="!$vuetify.breakpoint.xs"> Sudoku Solver</span>
        </v-tab>
        <v-tab class="small-tab">
          <v-icon left> mdi-chess-queen </v-icon>
          <span v-if="!$vuetify.breakpoint.xs"> N-Queen</span>
        </v-tab>
        <v-tab class="small-tab">
          <v-icon left> mdi-chess-knight </v-icon>
          <span v-if="!$vuetify.breakpoint.xs"> Knight's Tour</span>
        </v-tab>

        <v-tab-item>
          <v-card flat class="fill-height">
            <v-stepper value="1" vertical flat non-linear>
              <v-stepper-step
                :color="colors.primary"
                complete
                complete-icon="mdi-chess-knight"
                class="p-0"
                step="2"
              >
                <strong>Choose the problem.</strong>
              </v-stepper-step>
              <v-stepper-step
                :color="colors.primary"
                complete
                complete-icon="mdi-cog"
                class="p-0"
                step="3"
              >
                <strong> Choose problem's parameters.</strong>
              </v-stepper-step>
              <v-stepper-step
                :color="colors.primary"
                complete
                complete-icon="mdi-play"
                class="p-0"
                step="4"
              >
                <strong>Start visualization.</strong>
              </v-stepper-step>
            </v-stepper>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h3 class="inline">Backtracking</h3>
              is a technique (algorithmic-technique) that solves problems recursively. In each step,
              we are trying one of the valid paths that may lead to the solution and step forward,
              and if there is no available paths we step back and try one of the
              <strong>other</strong> valid paths in that step.
              <br />
              <br />
              <h3 class="inline">Backtracking visualizer</h3>
              is a visualization tool for some backtracking standard problems, which helps to
              understand backtracking technique in general and how to use it to solve these problems
              in particular.
              <br />
              <br />
              The visualizer has multiple problems with multiple options for each problem, once you
              <strong>start visualization</strong>, it starts to show each step of the solution with
              description of this step. You can also can control the speed and the steps of
              visualization.
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h3>The Problem</h3>
              Given empty N * N grid and required to <strong>construct N * N sudoku</strong> by
              placing a number between 1 and N in each cell so that each row has different values,
              each column has different values and each sub-grid has different values (regular rules
              of sudoku) then removing values from some cells.
              <br />
              <br />
              <h3>Options</h3>
              <ul>
                <li>
                  <strong>Grid Size:</strong> Controls the size of the board (4x4 - 9x9 - 16x16).
                </li>
                <li>
                  <strong>Grid Emptiness Level:</strong> Controls the percentage of the empty cells
                  of the grid (30% : 70%).
                </li>
                <li>
                  <strong>Generate Diagonals First:</strong> Controls if we try to fill the cells in
                  the diagonal sub-grids first then row by row or to fill them row by row all the
                  way.
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h3>The Problem</h3>
              Given N * N sudoku that is partially filled with numbers between 1 and N (according to
              sudoku rules), and required to <strong>solve the sudoku</strong> by placing a number
              between 1 and N in empty cells so that each row has different values, each column has
              different values and each sub-grid has different values.
              <br />
              <br />
              <h3>Options</h3>
              <ul>
                <li>
                  <strong>Grid Size:</strong> Controls the size of the board (4x4 - 9x9 - 16x16).
                </li>
                <li>
                  <strong>Grid Emptiness Level:</strong> Controls the percentage of the empty cells
                  of the grid (30% : 70%).
                </li>
                <li>
                  <strong>Best Cell First:</strong> Controls if we try to fill the cell with least
                  number of possible values first or to fill them row by row.
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h3>The Problem</h3>
              Given empty N * N chess board and <strong>N queens</strong>, and required to place the
              N queens on the board so that no two queens <strong>attack</strong> each other
              (according to chess rules).
              <br />
              <br />
              <h3>Options</h3>
              <ul>
                <li><strong>Grid Size:</strong> Controls the size of the board (4x4 : 16x16).</li>
                <li>
                  <strong>Solve row by row:</strong> Controls if we try to place the queens by the
                  order of the rows (starting from the first row) or to place them fully randomly.
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h3>The Problem</h3>
              Given N * N chess board and a <strong>knight</strong> initially placed in the top-left
              cell, and required to move the knight (according to chess rules of course) so that the
              knight visit all chess cells <strong>exactly once</strong>.
              <br />
              <br />
              <h3>Options</h3>
              <ul>
                <li><strong>Grid Size:</strong> Controls the size of the board (5x5 - 6x6).</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "help-dialog",
  props: ["colors"],
  data: function () {
    return {
      dialog: false,
    };
  },
  created: function () {
    if (!localStorage.getItem("backtrackingVisualizerVisit")) {
      this.dialog = true;
      localStorage.setItem("backtrackingVisualizerVisit", true);
    }
  },
};
</script>

<style scoped>
.inline {
  display: inline;
}
@media only screen and (max-width: 600px) {
  .small-tab {
    min-width: 0px;
  }
}
</style>
