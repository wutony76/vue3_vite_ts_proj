<script setup lang="ts">
  import { STATUS_ICON } from '@/logic/utils/Parameter'
  import { STATUS } from '@/components/Lobby/Center2/Scripts/config'

  const props = defineProps({
    status: {
      type: String,
      default: 'default'
    },
    title: { default: '' },
    selectedTag: { default: -1 } // 設定TAG
  })

  const model = defineModel()
  console.log('-created.SELECT.', model.value)

  // defineEmits({ ICON })
</script>

<template>
  <div>
    <div v-if="props.status === STATUS_ICON.DEFAULT" class="game-icon">
      <div v-if="!props.title" class="content ready">?</div>
      <span v-else class="name">{{ props.title }}</span>
    </div>
    <div
      v-else-if="props.status === STATUS_ICON.COMINGSOON"
      class="game-icon"
      :class="[STATUS_ICON.COMINGSOON]"
    >
      <div class="content ready">?</div>
    </div>
    <div
      v-else-if="props.status === STATUS_ICON.RACING"
      class="game-icon"
      :class="[STATUS_ICON.RACING]"
    >
      <div class="content">
        <div class="light-1"></div>
        <div class="light-2"></div>
        <div class="light-3"></div>
        <div class="auto-light-1"></div>
      </div>
      <span class="name">RACING</span>
    </div>
    <div
      v-else-if="props.status === STATUS_ICON.SNAKE"
      class="game-icon"
      :class="[STATUS_ICON.SNAKE]"
    >
      <div class="content"></div>
      <span class="name">SNAKE</span>
    </div>
    <!-- sample -->
    <div
      v-else-if="props.status === STATUS_ICON.CAVE"
      class="game-icon alpha-1"
      :class="{
        [STATUS.VISUAL_NOVEL.class]: true,
        selected: model === props.selectedTag
      }"
    >
      <div class="content">
        <div class="light l-01"></div>
        <div class="light l-02"></div>
      </div>
      <span class="name" :class="{ size23: props.title.length === 10 }">{{ props.title }} </span>
    </div>
    <div
      v-else-if="props.status === STATUS_ICON.FIFA"
      class="game-icon alpha-1"
      :class="{
        [STATUS.SPORTS.class]: true,
        selected: model === props.selectedTag
      }"
    >
      <div class="content">
        <div class="light l-01"></div>
        <div class="light l-02"></div>
      </div>
      <span
        class="name"
        :class="{
          'size26-9': props.title.length === 9,
          'size25-10': props.title.length === 10
        }"
        >{{ props.title }}
      </span>
    </div>

    <div v-else class="game-icon">{{ props.status }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .game-icon.coming_soon,
  .game-icon {
    cursor: default;
    height: 140px;
    width: 140px;
    background: #cccccc;
    border: 10px solid #fdeaea;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0);
    opacity: 0;

    .content.ready {
      font-weight: 900;
      font-size: 120px;
      color: #474747;
    }
    .name {
      font-size: 30px;
      font-weight: 900;
      letter-spacing: -3px;
      line-height: 23px;
    }

    &.alpha-1 {
      transform: scale(1);
      opacity: 1;
    }

    &:hover {
      .content.ready {
        color: #383535;
      }

      animation-name: hover;
      animation-duration: 0.3s;
      animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
      animation-fill-mode: forwards;

      @keyframes hover {
        0% {
          transform: scale(1);
        }

        20% {
          transform: scale(1.3);
        }

        40% {
          transform: scale(0.89);
        }

        60% {
          transform: scale(1.04);
        }

        80% {
          transform: scale(0.98);
        }

        100% {
          transform: scale(1);
        }
      }
    }
  }

  .game-icon.coming_soon {
    border: 15px solid #a3a3a3;
  }

  // __SNAKE__
  .game-icon.snake {
    cursor: pointer;
    background: #091b3f;
    border: unset;
    display: flow-root;

    .content {
      width: 105px;
      height: 90px;
      margin-top: 15px;
      margin-left: 18px;
      border: 4px solid #73d733;
      border-radius: 5px;
      background: #b7d4a8;
    }

    .name {
      font-size: 30px;
      font-weight: 900;
      letter-spacing: -3px;
      line-height: 23px;
      color: #b7d4a8;
    }

    &:hover {
      box-shadow: rgb(192, 188, 67) 0px 0px 13px;

      .content {
        border: 4px solid rgb(255, 250, 95);
      }

      .name {
        color: rgb(255, 250, 95);
      }
    }
  }
  // __RACING__
  .game-icon.racing {
    cursor: pointer;
    background: #2a17ff;
    border: unset;
    display: flow-root;

    .content {
      width: 105px;
      height: 90px;
      margin-top: 15px;
      margin-left: 18px;
      border: 4px solid #120b6a;
      border-radius: 5px;
      background: #7ccdff;
      overflow: hidden;

      .auto-light-1 {
        width: 300px;
        height: 25px;
        // background: rgba(255, 255, 255, 0.2);
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(244, 255, 241, 0.15),
          rgba(255, 255, 255, 0)
        );
        position: relative;
        top: -110px;
        left: -55px;
        transform: rotate(315deg);
        animation: game_block_scan_lights 3s linear 1s infinite;

        @keyframes game_block_scan_lights {
          0% {
            top: -110px;
          }

          100% {
            top: 140px;
          }
        }
      }

      .light-1 {
        width: 50%;
        height: 5px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 10px;
        left: -15px;
        transform: rotate(315deg);
      }

      .light-2 {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 15px;
        left: -30px;
        transform: rotate(315deg);
      }

      .light-3 {
        width: 50%;
        height: 3px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 70px;
        left: 58px;
        transform: rotate(315deg);
      }
    }

    .name {
      font-size: 30px;
      font-weight: 900;
      letter-spacing: -3px;
      line-height: 23px;
      color: #7ccdff;
    }

    &:hover {
      box-shadow: #7cfffd 0px 0px 13px;

      .content {
        // border: 4px solid rgb(147, 89, 240);
      }

      .name {
        color: rgb(255, 250, 95);
      }
    }
  }
  // __VISUAL.NOVEL__
  .game-icon.bar-visual-novel {
    background: #ff6981;
    border: unset;
    display: flow-root;
    cursor: pointer;

    .content {
      width: 105px;
      height: 90px;
      margin-top: 15px;
      margin-left: 18px;
      border: 4px solid #561617;
      border-radius: 5px;
      background: #5a60638a;
      overflow: hidden;

      .light {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 15px;
        left: -30px;
        transform: rotate(315deg);

        &.l-01 {
          width: 100%;
          height: 12px;
        }
        &.l-02 {
          width: 150%;
          height: 30px;
        }
      }

      .light-1 {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 15px;
        left: -30px;
        transform: rotate(315deg);
      }
      .light-2 {
        width: 150%;
        height: 30px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 15px;
        left: -30px;
        transform: rotate(315deg);
      }
    }
    .name {
      color: #541515;
      &.size23 {
        font-size: 23px;
      }
    }

    &:hover {
      .content {
        border: 4px solid #22d59f;
        background: #fcdd89c9;
        box-shadow: 0 0 20px #e8ee82;
      }
      .name {
        color: #f5ff60;
      }
    }
    &.selected {
      .content {
        position: relative;
        border: 4px solid #1158e1;
        background: rgb(195 252 137 / 91%);
        box-shadow: 0 0 20px #e8ee82;

        .light {
          &.l-01 {
            // background: #79ccddde;
            background: rgb(125 234 165 / 87%);
          }
          &.l-02 {
            // background: #79ccddde;
            background: rgb(125 234 165 / 87%);
          }
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 3px;
          right: 3px;
          width: 5px;
          height: 5px;
          background: red;
          animation: blink-a01 1.5s ease-in-out infinite;

          @keyframes blink-a01 {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        }
      }
      .name {
        color: #0eeaa4;
      }
    }
  }
  // __SPORTS`__
  .game-icon.bar-sports {
    background: #ffcd57;
    border: unset;
    display: flow-root;
    cursor: pointer;

    .content {
      width: 105px;
      height: 90px;
      margin-top: 15px;
      margin-left: 18px;
      border: 4px solid #561617;
      border-radius: 5px;
      background: #5a60638a;
      overflow: hidden;

      .light {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 15px;
        left: -30px;
        transform: rotate(315deg);

        &.l-01 {
          width: 100%;
          height: 12px;
        }
        &.l-02 {
          width: 150%;
          height: 30px;
        }
      }

      .light-1 {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 15px;
        left: -30px;
        transform: rotate(315deg);
      }
      .light-2 {
        width: 150%;
        height: 30px;
        background: rgba(255, 255, 255, 0.4);
        position: relative;
        top: 15px;
        left: -30px;
        transform: rotate(315deg);
      }
    }
    .name {
      color: #541515;
      &.size23 {
        font-size: 23px;
      }
      &.size25 {
        font-size: 25px;
      }
      &.size26-9 {
        font-size: 26px;
      }
      &.size25-10 {
        font-size: 25.5px;
      }
    }

    &:hover {
      .content {
        border: 4px solid #22d59f;
        background: #fcdd89c9;
        box-shadow: 0 0 20px #e8ee82;
      }
      .name {
        color: #f5ff60;
      }
    }
    &.selected {
      .content {
        position: relative;
        border: 4px solid #ff4a4a;
        background: rgb(246 137 252 / 90%);
        box-shadow: 0 0 20px #e8ee82;

        .light {
          &.l-01 {
            background: rgb(145 223 248 / 80%);
          }
          &.l-02 {
            background: rgb(145 223 248 / 95%);
          }
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 3px;
          right: 3px;
          width: 5px;
          height: 5px;
          background: red;
          animation: blink-a01 1.5s ease-in-out infinite;

          @keyframes blink-a01 {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        }
      }
      .name {
        color: #07c5f6;
      }
    }
  }
</style>
