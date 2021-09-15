<template>
  <div id="board">
      <table>
          <tr>
              <cell ref="00" :val="board[0][0]" :cellx="'0'" :celly="'0'" @clickCell="getBoard"/>
              <cell ref="01" :val="board[0][1]" :cellx="'0'" :celly="'1'" @clickCell="getBoard"/>
              <cell ref="02" :val="board[0][2]" :cellx="'0'" :celly="'2'" @clickCell="getBoard"/>
          </tr>
          <tr>
              <cell ref="10" :val="board[1][0]" :cellx="'1'" :celly="'0'" @clickCell="getBoard"/>
              <cell ref="11" :val="board[1][1]" :cellx="'1'" :celly="'1'" @clickCell="getBoard"/>
              <cell ref="12" :val="board[1][2]" :cellx="'1'" :celly="'2'" @clickCell="getBoard"/>
          </tr>
          <tr>
              <cell ref="20" :val="board[2][0]" :cellx="'2'" :celly="'0'" @clickCell="getBoard"/>
              <cell ref="21" :val="board[2][1]" :cellx="'2'" :celly="'1'" @clickCell="getBoard"/>
              <cell ref="22" :val="board[2][2]" :cellx="'2'" :celly="'2'" @clickCell="getBoard"/>
          </tr>
      </table>
  </div>
</template>

<script>
import Cell from '@/components/cell'
export default {
    components: {
        Cell
    },
    data () {
        return {
            board: [['', '', ''],
                    ['', '', ''],
                    ['', '', '']]
        }
    },
    methods: {
        getBoard() { // 스토어에서 보드 정보 불러오기
            this.board = this.$store.state.board;
            this.$forceUpdate();
            this.checkResult();
        },
        checkResult() { // 무승부 / 승리 조건 확인
            let b = this.board;
            let turn = this.$parent.turn;
            let win = '';
            let isDraw = false;
            for (let i = 0; i < 3; i++) {
                if (b[i].filter(b => b === turn).length === 3) { // 가로 한줄
                    win = turn;
                    break;
                }
                for (let j = 0; j < 3; j++) {
                    if (i === 0 && b[i][j] === turn && b[i+1][j] === turn && b[i+2][j] === turn) { // 세로 한줄
                        win = turn;
                        break;
                    }
                }
                if ((b[0][0] === turn && b[1][1] === turn && b[2][2] === turn) ||
                (b[0][2] === turn && b[1][1] === turn && b[2][0] === turn)) { // 대각선
                    win = turn;
                    break;
                }
                isDraw = (b[i].filter(b => b !== '').length === 3); // 꽉 차면 무승부
            }
            if (isDraw) {
                this.$parent.isTieGame = true;
                this.$store.commit('endGame');
            } else if (win === '') {
                this.$store.commit('toggleTurn');
            } else {
                this.$store.commit('endGame');
            }
            this.$parent.updateGame();
        },
        clearBoard() { // 칸 색 지우기
            this.board = this.$store.state.board;
            this.$forceUpdate();
            let id = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];
            for (let i = 0; i < id.length; i++) {
                this.$refs[id[i]].clearColor();
            }
        },
    }
}
</script>

<style>

</style>