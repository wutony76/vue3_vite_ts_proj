<script setup lang="ts">
  import GameIcon from '@/components/Lobby/GameIcon.vue'
  import LotteryItem from './LotteryItem.vue'

  import { onMounted, reactive } from 'vue'
  import { _uuid2 } from '@/logic/utils/Encrypt'
  import Net from '@/logic/base/Net'
  import LOTTERY_TW, { GAME } from '@/logic/lottery/tw'

  const state = reactive({
    key: _uuid2(),
    lotteryTw: null
  })
  const handle = {
    base: (game: any) => {
      if (!state.lotteryTw) return { en: 'NONE', period: '-', lotNumber: [] }
      return state.lotteryTw[game.code]
    },
    infoDaLeTou: () => handle.base(GAME.DA_LE_TOU),
    infoWeiLiCai: () => handle.base(GAME.WEI_LI_CAI),
    infoJinCai539: () => handle.base(GAME.JIN_CAI),
    infoYueHeCai39: () => handle.base(GAME.YUE_HE_CAI_39),
    infoYueHeCai49: () => handle.base(GAME.YUE_HE_CAI_49),
    info3XingCai: () => handle.base(GAME.XING_CAI_3),
    info4XingCai: () => handle.base(GAME.XING_CAI_4),
    infoBingo: () => handle.base(GAME.BIN_GUO)
  }

  onMounted(() => {
    // console.log('mounted', LOTTERY_TW.LAST_NUMBER.URL)
    Net.external({ url: LOTTERY_TW.LAST_NUMBER.URL }).then((res: any) => {
      state.lotteryTw = res
      console.log('tw', state.lotteryTw)
    })
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
        <div class="b1">
          <GameIcon :style="`--item-index: 5`" :title="'test'" />
        </div>
      </div>

      <div id="" class="block-list">
        <div class="row r0" style="--item-index: 0"><div class="content"></div></div>
        <LotteryItem :data="handle.infoDaLeTou()" class="r1" style="--item-index: 1" />
        <LotteryItem :data="handle.infoWeiLiCai()" class="r2" style="--item-index: 2" />
        <LotteryItem :data="handle.infoJinCai539()" class="r3" style="--item-index: 3" />
        <LotteryItem :data="handle.infoYueHeCai49()" class="r4" style="--item-index: 4" />
        <LotteryItem :data="handle.infoYueHeCai39()" class="r5" style="--item-index: 5" />
        <LotteryItem :data="handle.info4XingCai()" class="r6" style="--item-index: 6" />
        <LotteryItem :data="handle.info3XingCai()" class="r7" style="--item-index: 7" />
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
    z-index: 2;
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
    z-index: 1;

    .b1 {
      position: absolute;
      top: -230px;
      right: 20px;
      width: 230px;
      height: calc(150%);
      // background: #a27191;
      background: linear-gradient(180deg, rgb(198 74 132), #a27191);
      opacity: 0.95;
      border-radius: 0 0 90px 0;
    }
  }
  .block-list {
    margin-top: 227px;
    border-top: 15px solid #8d4062d6;
    z-index: 0;

    width: 100%;
    min-height: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: end;

    .row {
      position: relative;
      right: 0px;
      width: calc(95% - 20px);
      height: 95px;
      background: #ffeaea;
      // background: #a27191;
      padding: 1px;
      padding-right: 0px;
      margin-bottom: 15px;

      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .content {
        position: relative;
        background: #ffeaea;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        color: #8d4062;

        .title {
          font-size: 70px;
          font-weight: 900;
          letter-spacing: -6px;
          color: #8d4062;
          position: absolute;
          top: -26px;
          left: 0;
        }
        .period {
          position: relative;
          margin-top: 50px;
          text-align: left;
          letter-spacing: 10px;
          font-size: 25px;
          font-weight: 900;
          padding-left: 60px;
        }
        .openNumber {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3%;
          font-size: 35px;
          font-weight: 900;
          flex: 1;

          .flip-card {
            width: 60px;
            height: 60px;
            perspective: 1000px;

            .flip-card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              text-align: center;
              transition: transform 0.8s;
              transform-style: preserve-3d;
              animation: flipCard 2s ease-in-out forwards;
              animation-delay: calc(0.5s + var(--item-index) * 0.3s);
            }
            .flip-card-front,
            .flip-card-back {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .flip-card-front {
              background: linear-gradient(135deg, #8d4062, #a27191);
              color: white;
              transform: rotateY(0deg);

              .number-placeholder {
                font-size: 40px;
                font-weight: bold;
                color: rgba(255, 255, 255, 0.8);
              }
            }
            .flip-card-back {
              background: linear-gradient(135deg, #ffeaea, #f8d7d7);
              color: #8d4062;
              transform: rotateY(180deg);
              border: 5px solid #8d4062;

              .number {
                font-size: 35px;
                font-weight: bold;
                color: #8d4062;
              }
            }

            &.special {
              .flip-card-front {
                background: linear-gradient(135deg, #e80651, #e185a2);
                .number-placeholder {
                  color: rgba(255, 255, 255, 0.8);
                }
              }
              .flip-card-back {
                background: linear-gradient(135deg, #ffeaea, #f8d7d7);
                color: #e80651;
                border: 5px solid #e80651;

                .number {
                  color: #e80651;
                }
              }
            }
          }

          @keyframes flipCard {
            0% {
              transform: rotateY(0deg);
            }
            50% {
              transform: rotateY(90deg);
            }
            100% {
              transform: rotateY(180deg);
            }
          }
        }
        .control {
          width: 25%;
          line-height: 95px;
          font-size: 65px;
          font-weight: 900;
          letter-spacing: -8px;
          position: relative;
          transform: skewX(-20deg);
          cursor: pointer;
          color: #f02c3f;
          text-shadow:
            rgb(100, 60, 60) 0px 0px,
            rgb(100, 60, 60) 1px 1px,
            rgb(100, 60, 60) 2px 2px,
            rgb(100, 60, 60) 3px 3px,
            rgb(100, 60, 60) 4px 4px,
            rgb(100, 60, 60) 5px 5px,
            rgb(100, 60, 60) 6px 6px,
            rgb(100, 60, 60) 7px 7px,
            rgb(100, 60, 60) 8px 8px,
            rgb(100, 60, 60) 9px 9px,
            rgb(100, 60, 60) 10px 10px,
            rgb(42, 3, 3) 11px 11px;
          animation:
            textShake 0.5s ease-in-out infinite,
            colorPulse 2s ease-in-out infinite,
            glowEffect 1.5s ease-in-out infinite alternate;
          transition: all 0.3s ease;

          &::before {
            content: 'GO!BET';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #ff6b35;
            text-shadow:
              0 0 20px rgba(255, 107, 53, 0.6),
              0 0 40px rgba(255, 107, 53, 0.4),
              0 0 60px rgba(255, 107, 53, 0.3);
            animation:
              neonGlow 1s ease-in-out infinite alternate,
              floatEffect 3s ease-in-out infinite;
            z-index: -1;
            opacity: 0.5;
          }
          &::after {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(
              45deg,
              rgba(255, 107, 53, 0.3),
              rgba(240, 44, 63, 0.3),
              rgba(255, 71, 87, 0.3),
              rgba(255, 56, 56, 0.3)
            );
            background-size: 400% 400%;
            border-radius: 20px;
            z-index: -2;
            opacity: 0.2;
            animation: gradientMove 3s ease infinite;
            filter: blur(15px);
          }
          &:hover {
            letter-spacing: 0px;
            transform: skewX(-20deg) scale(1.1);
            color: #ff4757;
            text-shadow:
              rgba(255, 71, 87, 0.35) 0px 0px,
              rgb(255, 71, 87, 0.35) 1px 1px,
              rgb(255, 71, 87, 0.35) 2px 2px,
              rgb(255, 71, 87, 0.35) 3px 3px,
              rgb(255, 71, 87, 0.35) 4px 4px,
              rgb(255, 71, 87, 0.35) 5px 5px,
              rgb(255, 71, 87, 0.35) 6px 6px,
              rgb(255, 71, 87, 0.35) 7px 7px,
              rgb(255, 71, 87, 0.35) 8px 8px,
              rgb(255, 71, 87, 0.35) 9px 9px,
              rgb(255, 71, 87, 0.35) 10px 10px,
              rgb(255, 71, 87, 0.35) 11px 11px,
              0 0 30px #ff47563f,
              0 0 60px #ff47573f,
              0 0 90px #ff47573f;
            animation:
              textShake 0.2s ease-in-out infinite,
              colorPulse 0.5s ease-in-out infinite,
              glowEffect 0.8s ease-in-out infinite alternate;
          }

          @keyframes textShake {
            0%,
            100% {
              transform: skewX(-20deg) translateX(0);
            }
            25% {
              transform: skewX(-20deg) translateX(-2px);
            }
            75% {
              transform: skewX(-20deg) translateX(2px);
            }
          }
          @keyframes colorPulse {
            0%,
            100% {
              color: #f02c3f;
            }
            50% {
              color: #efba13;
            }
          }
          @keyframes glowEffect {
            0% {
              filter: brightness(1) contrast(1);
            }
            100% {
              filter: brightness(1.4) contrast(1.3);
            }
          }
          @keyframes neonGlow {
            0% {
              text-shadow:
                0 0 20px rgba(255, 107, 53, 0.6),
                0 0 40px rgba(255, 107, 53, 0.4),
                0 0 60px rgba(255, 107, 53, 0.3);
            }
            100% {
              text-shadow:
                0 0 30px rgba(255, 107, 53, 0.7),
                0 0 60px rgba(255, 107, 53, 0.5),
                0 0 90px rgba(255, 107, 53, 0.4),
                0 0 120px rgba(255, 107, 53, 0.3);
            }
          }
          @keyframes floatEffect {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-3px);
            }
          }
          @keyframes gradientMove {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        }
      }

      &::before {
        content: '';
        position: absolute;
        width: 110%;
        // height: 0.1%;
        height: 0.1%;
        background-color: #a27191;
        transform-origin: 50% 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(7deg);

        animation: line-show-a01;
        animation-delay: calc(3s + var(--item-index) * 0.75s);
        animation-duration: calc(7s + var(--item-index) * 0.75s);
        animation-fill-mode: forwards;
        animation-timing-function: ease;
        @keyframes line-show-a01 {
          100% {
            height: 300%;
          }
        }
      }
      &.r0 {
        width: 30%;
        border-radius: 0px 0 0 20px;
        .content {
          background: #ffeaea;
          // border-radius: 80px 0 0 25px;
          border-radius: 0px 0 0 20px;
        }
      }
    }
  }
</style>
