<script setup>
  import { GAME } from '@/logic/lottery/tw'

  const props = defineProps({
    data: {
      type: Object,
      default: {
        en: 'NONE',
        period: '-',
        lotNumber: []
      }
    }
  })
</script>

<template>
  <div class="row" :class="`sytle-${props.data.en}`">
    <div class="content">
      <!-- {{ handle.infoDaLeTou() }} -->
      <div class="title">{{ props.data.en }}</div>
      <div class="period">{{ props.data.period }}</div>
      <div class="openNumber">
        <div
          v-for="(item, index) in props.data.lotNumber"
          :key="index"
          class="flip-card"
          :style="`--item-index: ${index}`"
          :class="{
            special:
              props.data.lotNumber.length - 1 === index &&
              [GAME.DA_LE_TOU.en, GAME.WEI_LI_CAI.en].includes(props.data.en)
          }"
        >
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <span class="number-placeholder"></span>
            </div>
            <div class="flip-card-back">
              <span class="number">{{ item ? String(item).padStart(2, '0') : '-' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="control">GO!BET</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

    &.sytle-JINCAI539 {
      .content {
        .period {
          padding-left: 95px;
        }
      }
    }
    &.sytle-39YUEHECAI,
    &.sytle-49YUEHECAI {
      .content {
        .period {
          width: 400px;
          text-align: right;
        }
        .openNumber {
          justify-content: flex-start;
          padding-left: 70px;
        }
      }
    }
    &.sytle-4XINGCAI,
    &.sytle-3XINGCAI {
      .content {
        .period {
          width: 304px;
          text-align: right;
        }
        .openNumber {
          justify-content: flex-start;
          padding-left: 70px;
        }
      }
    }
  }
</style>
