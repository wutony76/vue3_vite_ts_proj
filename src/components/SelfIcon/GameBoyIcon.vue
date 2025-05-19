<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue';

interface LightningConfig {
  position: 'top' | 'right' | 'bottom' | 'left';
  angle: number;
  size?: 'small' | 'large';
}

// 預設閃電配置
const defaultLightnings: LightningConfig[] = [
  { position: 'top', angle: 225, size: 'large' },  // 螢幕左上角大閃電
  { position: 'top', angle: 225, size: 'small' },  // 螢幕左上角小閃電
  { position: 'right', angle: 315, size: 'small' }, // 螢幕右上角小閃電
];

// 計算閃電的變換矩陣
const getLightningTransform = (lightning: LightningConfig) => {
  const positions = {
    top: { x: -50, y: 0 },    // 螢幕左上角
    right: { x: 75, y: 25 },  // 螢幕右上角
    bottom: { x: 50, y: 100 },
    left: { x: 0, y: 50 }
  };

  const pos = positions[lightning.position];
  const scale = lightning.size === 'small' ? 0.6 : 1;
  return `translate(${pos.x}, ${pos.y}) rotate(${lightning.angle}) translate(-10, -15) scale(${scale})`;
};

const props = defineProps<{
  size?: number;
  onClick?: () => void;
  text?: string;
  lightnings?: LightningConfig[];
}>();

defineEmits<{
  (e: 'click'): void;
}>();

const textChars = computed(() => (props.text ? props.text.split('') : []));

// 動態取得 group 寬度，讓動畫距離正確
const groupRef = ref<SVGGElement | null>(null);
const scrollX = ref(130);
const updateScrollX = () => {
  if (groupRef.value) {
    const width = groupRef.value.getBBox().width;
    scrollX.value = Math.ceil(width / 2 + 60); // 60為螢幕寬度一半
  }
};
onMounted(() => nextTick(updateScrollX));
watch(() => props.text, () => nextTick(updateScrollX));
</script>

<template>
  <div class="gameboy-icon" :style="{ width: `${size}px`, height: `${size}px` }" @click="$emit('click')">
    <svg viewBox="0 0 100 100" class="gameboy-svg">
      <!-- 主機外殼 -->
      <rect class="gameboy-body" x="10" y="10" width="80" height="80" rx="5" />

      <defs>
        <clipPath id="screen-clip">
          <rect x="20" y="20" width="60" height="40" rx="2" />
        </clipPath>
      </defs>
      <!-- 螢幕 -->
      <rect class="gameboy-screen" x="20" y="20" width="60" height="40" rx="2" />
      <!-- 排氣孔（斜線圓角長條） -->
      <g class="vent-group">
        <rect v-for="i in 4" :key="i" class="vent-slot" :x="68 + i * 4" y="62" width="2.5" height="8" rx="1.2" ry="1.2"
          :transform="`rotate(25 ${69.25 + i * 4} 62)`" />
      </g>
      <!-- 指示燈 -->
      <rect class="indicator-light" x="15" y="25" width="3" height="3" />


      <!-- 螢幕文字 -->
      <g class="screen-text-group" ref="groupRef"
        :style="{ transform: `translateX(${scrollX}px)`, '--scroll-x': `-${scrollX}px`, display: 'none' }">
        <text v-if="text" class="screen-text" x="50" y="40" text-anchor="middle">
          <tspan v-for="(char, i) in textChars" :key="i" :class="'rainbow-char'"
            :style="{ 'animation-delay': `${i * 0.15}s` }">{{ char }}</tspan>
        </text>
      </g>
      <!-- 按鈕 -->
      <circle class="gameboy-button" cx="35" cy="80" r="4" />
      <circle class="gameboy-button" cx="50" cy="80" r="4" />
      <circle class="gameboy-button" cx="65" cy="80" r="4" />
      <circle class="gameboy-button" cx="80" cy="80" r="4" />
      <!-- 方向鍵 -->
      <path class="gameboy-dpad" d="M20,70 L30,70 M25,65 L25,75" />
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
      .lightning-bolt {
        opacity: 1;
      }

      .gameboy-screen {
        animation: screenGlow 2s infinite;
      }

      .gameboy-button {
        animation: buttonPress 0.5s infinite;
      }

      .gameboy-dpad {
        animation: dpadGlow 1s infinite;
      }

      .screen-text-group {
        animation: textScroll 8s linear infinite;
      }

      .indicator-light {
        animation: lightGlow 1s infinite;
      }
    }
  }

  .gameboy-svg {
    width: 100%;
    height: 100%;

    .lightning-bolt {
      fill: #ffd700; // 金黃色
      opacity: 0;
      transition: opacity 0.3s ease;
      filter: drop-shadow(0 0 2px #ffd700); // 發光效果
      transform-origin: center;
    }

    .gameboy-body {
      fill: #ff6fe5; // 原始 Game Boy 的淺綠色
      stroke: #ff0379; // 深綠色邊框
      stroke-width: 4;
    }

    .gameboy-screen {
      fill: #ffa7a7; // 深綠色螢幕
      opacity: 0.9;
      stroke: #306230;
      stroke-width: 2;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg,
            transparent,
            #9bbc0f,
            transparent);
        animation: scanLight 2s linear infinite;
      }
    }

    .screen-text {
      fill: #9bbc0f;
      font-family: 'Press Start 2P', monospace;
      font-size: 18px;
      text-anchor: middle;
      dominant-baseline: middle;
      opacity: 1;
      transition: opacity 0.3s ease, transform 0s;
      font-weight: 900;
    }

    .screen-text-group {
      transition: transform 0s;
    }

    .gameboy-button {
      fill: #ac326c;
      opacity: 0.9;
      stroke: #0f380f;
      stroke-width: 1.5;
      transition: all 0.3s ease;
    }

    &:hover {
      .gameboy-screen {
        fill: #41ffec;
        filter: drop-shadow(0 0 5px #9bbc0f);
        stroke: #194d47;
      }

      .gameboy-button:nth-of-type(1) {
        animation: buttonColor1 2s infinite;
      }

      .gameboy-button:nth-of-type(2) {
        animation: buttonColor2 2s infinite;
      }

      .gameboy-button:nth-of-type(3) {
        animation: buttonColor3 2s infinite;
      }

      .gameboy-button:nth-of-type(4) {
        animation: buttonColor4 2s infinite;
      }
    }

    .gameboy-dpad {
      stroke: #306230;
      stroke-width: 3;
      fill: none;
    }

    .indicator-light {
      fill: #aaa;
      opacity: 0.5;
      transition: all 0.3s ease;
    }

    .vent-slot {
      fill: #ac326c;
      transition: fill 0.3s;
    }

    .vent-group {
      /* 讓 group 不受 hover 動畫影響 */
      pointer-events: none;
    }
  }
}

@keyframes screenGlow {

  0%,
  100% {
    opacity: 0.9;
    filter: drop-shadow(0 0 5px #05ffe6);
  }

  50% {
    opacity: 1;
    filter: drop-shadow(0 0 8px #05ffe6);
  }
}

@keyframes buttonPress {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
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
    transform: translateX(calc(var(--scroll-x, 130px)* -1));
    opacity: 1;
  }

  100% {
    transform: translateX(calc(var(--scroll-x, 130px)));
    opacity: 1;
  }
}

@keyframes lightGlow {

  0%,
  100% {
    opacity: 0.5;
    filter: brightness(1);
  }

  50% {
    opacity: 1;
    filter: brightness(1.5);
  }
}

@keyframes scanLight {
  0% {
    left: -100%;
  }

  100% {
    left: 200%;
  }
}

@keyframes buttonColor1 {
  0% {
    fill: #306230;
  }

  25% {
    fill: #ff6b6b;
  }

  50% {
    fill: #4a90e2;
  }

  75% {
    fill: #9bbc0f;
  }

  100% {
    fill: #306230;
  }
}

@keyframes buttonColor2 {
  0% {
    fill: #306230;
  }

  25% {
    fill: #9bbc0f;
  }

  50% {
    fill: #ff6b6b;
  }

  75% {
    fill: #4a90e2;
  }

  100% {
    fill: #306230;
  }
}

@keyframes buttonColor3 {
  0% {
    fill: #306230;
  }

  25% {
    fill: #4a90e2;
  }

  50% {
    fill: #9bbc0f;
  }

  75% {
    fill: #ff6b6b;
  }

  100% {
    fill: #306230;
  }
}

@keyframes buttonColor4 {
  0% {
    fill: #306230;
  }

  25% {
    fill: #ff6b6b;
  }

  50% {
    fill: #9bbc0f;
  }

  75% {
    fill: #4a90e2;
  }

  100% {
    fill: #306230;
  }
}

.rainbow-char {
  transition: fill 0.2s;
}

.gameboy-icon:hover .gameboy-svg .screen-text-group .rainbow-char {
  animation: rainbowColor 1.2s infinite linear;
}

@keyframes rainbowColor {
  0% {
    fill: #9bbc0f;
  }

  16% {
    fill: #ff6b6b;
  }

  33% {
    fill: #4a90e2;
  }

  50% {
    fill: #ffd700;
  }

  66% {
    fill: #ff69b4;
  }

  83% {
    fill: #48bb78;
  }

  100% {
    fill: #9bbc0f;
  }
}

.gameboy-icon:hover .indicator-light {
  fill: #ff1d1d;
}
</style>