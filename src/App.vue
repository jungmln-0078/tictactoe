<template>
  <div id="app">
    <h1>Tic Tac Toe</h1>
    <p v-show="gameEnded" class="result">{{ result }}</p>
    <button v-show="gameEnded" class="restart" @click="restartGame">re?</button>
    <board ref="board" />
    <p :class="turn">Turn of {{ turn }}</p>
  </div>
</template>

<script>
import Board from '@/components/board'

export default {
  name: 'App',
  components: {
    Board
  },
  data () {
    return {
      turn: 'O',
      gameEnded: false,
      isTieGame: false
    }
  },
  methods: {
    updateGame() {
      this.gameEnded = this.$store.state.gameEnded;
      this.turn = this.$store.state.turn;
    },
    restartGame() {
      this.$store.commit('restartGame');
      this.updateGame();
      this.isTieGame = false;
      this.$refs.board.clearBoard();
      this.$forceUpdate();
    }
  },
  computed: {
    result() {
      return this.isTieGame ? 'Draw' : this.turn + ' is Winner!';
    }
  }
}
</script>
