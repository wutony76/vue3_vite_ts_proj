<script setup lang="ts">
import { reactive, ref } from 'vue';
import GameBase from '@/views/GameBaseElectronic.vue'
// import Game from '@/logic/racing/Game'
import Game from '@/logic/racing/Game'
import { GAMESTATUS } from '@/logic/snake/Parameter'
import { ACTIONS, VIEWS } from '@/logic/utils/Parameter'

const refGame = ref()
const state = reactive({
  title: 'Tetriminos',
  time: 'TONY.WORKS@2025.04',
  game: {
    footer: 'TETRIMINOS.GAME @ 2025.04'
  },
  // __game.args.settings__
  args: {
    gameStatus: GAMESTATUS.WAITING, // GAMESTATUS.WAITING,
    viewStatus: '',
    showStatus: VIEWS.NONE,
    controlStatus: ACTIONS.CONTROLSRIGHT,
    viewWaitingVisible: false,
    viewReadyVisible: false,
    viewResultVisible: false,
    data: {
      ranking: [
        { rank: '1', name: 'TONY.WU', score: 11924999 },
        { rank: '2', name: 'HAPPY.RED', score: 9241134 },
        { rank: '3', name: 'HAPPFAT', score: 5133913 },
        { rank: '4', name: 'ABIGAIL', score: 3012213 },
        { rank: '5', name: 'TTTM.WC', score: 2911424 },
        { rank: '6', name: 'TNYAUU', score: 1021681 },
        { rank: '7', name: 'TOYO.AC', score: 1002022 },
        { rank: '8', name: 'SISI.CC', score: 439290 },
        { rank: '9', name: 'GOYES', score: 198021 }
      ]
    },
    score: 0,
    level: 1,
    snakeLen: 0,
    fruitCount: 0,
  }
})
</script>

<template>
  <GameBase ref="refGame" :data="state" :game="Game" :args="state.args">
    <template #SLOT-STAGE>

    </template>
  </GameBase>
</template>

<style lang="scss">
// @import "../assets/css/game/gameBase.scss";
// @import "../assets/css/gameRacing/racingGame.scss";
// @import "../assets/css/game/animations.scss";</style>