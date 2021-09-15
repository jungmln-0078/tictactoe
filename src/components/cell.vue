<template>
  <td @click="clickCell" :class="playerColor">
      <span>{{ val }}</span>
  </td>
</template>

<script>
export default {
    model: {
        prop: 'val'
    },
    props: {
        val: String,
        cellx: String,
        celly: String
    },
    data () {
        return {
            playerColor: ''
        }
    },
    methods: {
        clickCell() {
            if (!this.$store.state.board[this.cellx][this.celly] && !this.$store.state.gameEnded) {
                this.$store.commit('clickCell', { cellx: this.cellx, celly: this.celly, player: this.$store.state.turn });
                this.playerColor = this.$store.state.turn;
                this.$emit('clickCell');
            }
        },
        clearColor() {
            this.playerColor = '';
            this.$forceUpdate();
        }
    }
}
</script>

<style>

</style>