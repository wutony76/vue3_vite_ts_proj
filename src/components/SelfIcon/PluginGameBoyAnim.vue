<script setup lang="ts">
import GameBoyIcon from './GameBoyIcon.vue';

const props = defineProps<{
  size?: number;
  text?: string;
  style?: string | object;
  marquee?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function handleClick() {
  emit('click');
}

const handleAnimationEnd = (event: AnimationEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('marquee-content')) {
    target.style.animation = 'none';
    target.offsetHeight; // 觸發重繪
    target.style.animation = 'marquee-left 4s linear forwards';
  }
};
</script>

<template>
  <!-- <div class="plugin-gameboy-icon"> -->
  <div class="plugin-gameboy-icon" :style="{
    width: `${size}px`,
    height: `${size}px`,
  }">
    <div v-if="props.text" class="marquee">
      <div class="marquee-content" @animationend="handleAnimationEnd">
        <span v-for="(char, i) in props.text.split('')" :key="i" class="marquee-char"
          :style="{ 'animation-delay': `${i * 0.15}s` }">{{ char }}</span>
      </div>
    </div>
    <div class="lightning-icon">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M11 21h-1l1-7h-4l6-11h1l-1 7h4l-6 11z" fill="currentColor" />
      </svg>
    </div>
    <div class="lightning-icon lightning-icon--br">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M11 21h-1l1-7h-4l6-11h1l-1 7h4l-6 11z" fill="currentColor" />
      </svg>
    </div>
    <GameBoyIcon class="self-icon" :size="props.size ?? 90" @click="handleClick" />

  </div>
</template>

<style lang="scss" scoped>
.plugin-gameboy-icon {
  position: relative;

  .marquee {
    position: absolute;
    width: 51px;
    // height: 34px;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .self-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.marquee {
  overflow: hidden;
  position: relative;
  background: transparent;
  width: 100%;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  font-weight: 900;
  font-size: 2em;
  transition: filter 0.3s, transform 0.3s;
  transform: translateX(100%);
  width: max-content;
  animation: none;
}

.plugin-gameboy-icon:hover .marquee-content {
  // .plugin-gameboy-icon .marquee-content {
  animation: marquee-left 20s linear infinite;
  filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px #ffd700);
  transform: scale(1.15);
}

.marquee-char {
  display: inline-block;
  animation: rainbowColor 1.2s infinite linear;
  font-weight: 900;
  transition: text-shadow 0.3s, color 0.3s;
}

.plugin-gameboy-icon:hover .marquee-char {
  text-shadow: 0 0 8px #fff, 0 0 16px #ffd700, 0 0 24px #ff69b4;
}

@keyframes rainbowColor {
  0% {
    color: #9bbc0f;
  }

  16% {
    color: #ff6b6b;
  }

  33% {
    color: #4a90e2;
  }

  50% {
    color: #ffd700;
  }

  66% {
    color: #ff69b4;
  }

  83% {
    color: #48bb78;
  }

  100% {
    color: #9bbc0f;
  }
}

@keyframes marquee-left {
  0% {
    transform: translateX(30%);
  }

  100% {
    transform: translateX(-110%);
  }
}

.lightning-icon {
  position: absolute;
  top: -7px;
  left: -7px;
  width: 24px;
  height: 24px;
  color: #ffd700;
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
  transition: all 0.3s ease;
  z-index: 2;
  filter: drop-shadow(0 0 4px #ffd700);
}

.lightning-icon--br {
  top: auto;
  left: auto;
  bottom: 20px;
  right: -3px;
}

.plugin-gameboy-icon:hover .lightning-icon,
.plugin-gameboy-icon:hover .lightning-icon--br {
  opacity: 1;
  transform: scale(1) rotate(-45deg);
  animation: lightning-bounce 0.5s ease-in-out, lightning-flash 0.7s 0.5s linear infinite;
}

@keyframes lightning-bounce {
  0% {
    transform: translateX(-3px) scale(0.5) rotate(-55deg);
  }

  25% {
    transform: translateX(3px) scale(0.8) rotate(-50deg);
  }

  50% {
    transform: translateX(-3px) scale(1.2) rotate(-35deg);
  }

  75% {
    transform: translateX(3px) scale(1) rotate(-40deg);
  }

  100% {
    transform: translateX(0) scale(1) rotate(-45deg);
  }
}

@keyframes lightning-flash {
  0% {
    opacity: 1;
  }

  20% {
    opacity: 0.2;
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 0.2;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

.plugin-gameboy-icon:hover {
  animation: swing 3.5s ease-in-out infinite;
}

@keyframes swing {
  0% {
    transform: translateX(0);
  }

  3% {
    transform: translateX(-5px);
  }

  7% {
    transform: translateX(5px);
  }

  10% {
    transform: translateX(-5px);
  }

  14.3% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
