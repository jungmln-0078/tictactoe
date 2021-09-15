import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: [['', '', ''],
            ['', '', ''],
            ['', '', '']],
    turn: 'O',
    gameEnded: false
  },
  mutations: {
    clickCell(state, payload) {
      state.board[payload.cellx][payload.celly] = payload.player;
    },
    toggleTurn(state) {
      state.turn = state.turn === 'X' ? 'O' : 'X';
    },
    endGame(state) {
      state.gameEnded = true;
    },
    restartGame(state) {
      state.gameEnded = false;
      state.turn = 'O';
      state.board = [['', '', ''],
                     ['', '', ''],
                     ['', '', '']];
    }
  },
  actions: {
  },
  modules: {
  }
})
