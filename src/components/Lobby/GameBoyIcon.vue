<script setup lang="ts">
import { computed } from 'vue';

interface GameBoyStyle {
  bodyColor?: string;
  screenColor?: string;
  buttonColor?: string;
  textColor?: string;
}

// 預設樣式
const defaultStyle: GameBoyStyle = {
  bodyColor: '#ffb6c1',    // 淺桃紅色主體
  screenColor: '#ff69b4',  // 深桃紅色螢幕
  buttonColor: '#ff69b4',  // 深桃紅色按鈕
  textColor: '#ffb6c1',    // 淺桃紅色文字
};

const props = defineProps<{
  size?: number;
  onClick?: () => void;
  text?: string;
  style?: Partial<GameBoyStyle>;
  position?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
}>();

defineEmits<{
  (e: 'click'): void;
}>();

// 合併樣式
const mergedStyle = computed(() => ({
  ...defaultStyle,
  ...props.style
}));

// 計算位置樣式
const positionStyle = computed(() => {
  if (!props.position) return {};
  return {
    position: 'fixed',
    ...props.position
  };
});
</script>

<template>
  <div class="gameboy-icon" :style="{
    width: `${size}px`,
    height: `${size}px`,
    ...positionStyle
  }" @click="$emit('click')">
    <svg viewBox="0 0 100 100" class="gameboy-svg">
      <!-- 主機外殼 -->
      <rect class="gameboy-body" x="10" y="10" width="80" height="80" rx="5" />
      <!-- 螢幕 -->
      <rect class="gameboy-screen" x="20" y="20" width="60" height="40" rx="2" />
      <!-- 螢幕文字 -->
      <text v-if="text" class="screen-text" x="80" y="40">
        {{ text }}
      </text>
      <!-- 按鈕 -->
      <circle class="gameboy-button" cx="30" cy="75" r="5" />
      <circle class="gameboy-button" cx="45" cy="75" r="5" />
      <circle class="gameboy-button" cx="60" cy="75" r="5" />
      <circle class="gameboy-button" cx="75" cy="75" r="5" />
      <!-- 方向鍵 -->
      <path class="gameboy-dpad" d="M20,60 L30,60 M25,55 L25,65" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.gameboy-icon {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);

    .gameboy-svg {
      .gameboy-screen {
        animation: screenGlow 2s infinite;
      }

      .gameboy-button {
        animation: buttonPress 0.5s infinite;
      }

      .gameboy-dpad {
        animation: dpadGlow 1s infinite;
      }

      .screen-text {
        animation: textScroll 8s linear infinite;
      }
    }
  }

  .gameboy-svg {
    width: 100%;
    height: 100%;

    .gameboy-body {
      fill: v-bind('mergedStyle.bodyColor');
      stroke: v-bind('mergedStyle.bodyColor');
      stroke-width: 4;
      opacity: 0.9;
    }

    .gameboy-screen {
      fill: v-bind('mergedStyle.screenColor');
      opacity: 0.9;
      stroke: v-bind('mergedStyle.screenColor');
      stroke-width: 2;
      opacity: 0.8;
    }

    .screen-text {
      fill: v-bind('mergedStyle.textColor');
      font-family: 'Press Start 2P', monospace;
      font-size: 8px;
      text-anchor: start;
      dominant-baseline: middle;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gameboy-button {
      fill: v-bind('mergedStyle.buttonColor');
      opacity: 0.9;
      stroke: v-bind('mergedStyle.buttonColor');
      stroke-width: 1.5;
      opacity: 0.8;
    }

    .gameboy-dpad {
      stroke: v-bind('mergedStyle.buttonColor');
      stroke-width: 3;
      fill: none;
      opacity: 0.8;
    }
  }
}

@keyframes screenGlow {

  0%,
  100% {
    opacity: 0.9;
  }

  50% {
    opacity: 1;
  }
}

@keyframes buttonPress {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }
}

@keyframes dpadGlow {

  0%,
  100% {
    stroke-opacity: 1;
  }

  50% {
    stroke-opacity: 0.7;
  }
}

@keyframes textScroll {
  0% {
    transform: translateX(60px);
    opacity: 1;
  }

  100% {
    transform: translateX(-60px);
    opacity: 1;
  }
}
</style>