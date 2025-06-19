<script setup lang="ts">
  import { reactive } from 'vue'
  import { _uuid2 } from '@/logic/utils/Encrypt'

  const state = reactive({
    key: _uuid2()
  })
</script>

<template>
  <div class="center3" :class="`center-${state.key}`">
    <div class="game-info-container">
      <div id="id-center3-block-top" class="block-top">
        <div class="section-header">
          <span class="item setting-text">GAMETHEORY</span>
        </div>
      </div>
      <div id="id-center3-block-1" class="block-1">
        <div class="section-header">
          <span class="item setting-text">LOTTERY</span>
        </div>
      </div>
      <div id="id-center3-block-2" class="block-2">
        <div class="section-header"><span class="item setting-text"></span></div>
        <div class="center">
          <div class="b1"></div>
        </div>
      </div>
      <div id="id-center3-block-2" class="block-main">
        <div class="b1"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .center3 {
    // border: 1px solid #2600ff;
    min-height: 1510px;
    margin-top: 110px;
    .game-info-container {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }

  .block-top {
    position: relative;
    width: 90%;
    height: 170px;
    background: linear-gradient(45deg, #a2719169, transparent);
    border-top: 1px solid #8d406217;
    border-radius: 0 50px 0 0;

    .section-header {
      .item {
        font-size: 75px;
        font-weight: 900;
        letter-spacing: -6px;
        color: #8d4062;
      }
      position: absolute;
      left: -3px;
      bottom: -27px;
    }
  }
  .block-1 {
    width: 3%;
    height: 420px;
    background: #a27191;
    border-top: 20px solid #8d4062;
    border-radius: 0 0 50px 0;
    position: relative;

    .section-header {
      position: absolute;
      top: 290px;
      right: -59px;
      transform: rotate(90deg);
      font-weight: 900;
      font-size: 30px;
      .item {
        letter-spacing: -3px;
        color: #a27191;
      }
    }
  }
  .block-2 {
    margin-top: 25px;
    width: 13%;
    height: 250px;
    // background: #a27191;
    border-radius: 10px 0 0 0;

    position: absolute;
    top: 65px;
    right: 0;
    // overflow: hidden;
    .center {
      position: relative !important;
      border: unset !important;
      height: unset !important;
      z-index: 1 !important;

      .b1 {
        position: absolute;
        top: 79px;
        right: -5px;
        width: 570%;
        height: 130px;
        background: linear-gradient(90deg, rgb(141 64 98 / 80%), rgb(152 156 180));
        border-radius: 0 0 30px 0;
      }
    }
  }
  .block-main {
    width: calc(95% - 20px);
    height: 500px;
    background: linear-gradient(180deg, #af92ab85, #ab94b5);

    position: absolute;
    top: 370px;
    right: 0;
    clear: both;
    border-radius: 0px 0 0px 10px;

    .b1 {
      position: absolute;
      top: -230px;
      right: 20px;
      width: 230px;
      height: calc(150% - 20px);
      // background: #a27191;
      background: linear-gradient(180deg, rgb(198 74 132), #a27191);
      opacity: 0.95;
      border-radius: 0 0 90px 0;
    }
  }
</style>
