<template>
  <div class="bubble-machine">
    <div
      v-for="(bubble, index) in bubbles"
      :key="index"
      class="bubble"
      :style="getBubbleStyle(bubble)"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  interface Bubble {
    size: number
    left: number
    duration: number
    delay: number
    color: string
    isOutline: boolean
  }

  // 定義 props
  const props = withDefaults(
    defineProps<{
      colorMode?: 'random' | 'gradient' | 'rainbow' | 'single' | 'default'
      bubbleColor?: string
    }>(),
    {
      colorMode: 'default',
      bubbleColor: 'rgba(255, 255, 255, 0.6)' // 預設為白色半透明
    }
  )

  const bubbles = ref<Bubble[]>([])
  const maxBubbles = 15

  // 預定義的顏色陣列
  const colors = [
    'rgba(255, 0, 0, 0.6)', // 紅
    'rgba(255, 165, 0, 0.6)', // 橙
    'rgba(255, 255, 0, 0.6)', // 黃
    'rgba(0, 255, 0, 0.6)', // 綠
    'rgba(0, 0, 255, 0.6)', // 藍
    'rgba(75, 0, 130, 0.6)', // 靛
    'rgba(238, 130, 238, 0.6)' // 紫
  ]

  // 生成隨機顏色
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgba(${r}, ${g}, ${b}, 0.6)`
  }

  // 生成漸變色
  const getGradientColor = (index: number) => {
    const color1 = colors[index % colors.length]
    const color2 = colors[(index + 1) % colors.length]
    return `linear-gradient(45deg, ${color1}, ${color2})`
  }

  // 生成彩虹色
  const getRainbowColor = (index: number) => {
    return colors[index % colors.length]
  }

  const createBubble = (index: number): Bubble => {
    let color = props.bubbleColor
    switch (props.colorMode) {
      case 'random':
        color = getRandomColor()
        break
      case 'gradient':
        color = getGradientColor(index)
        break
      case 'rainbow':
        color = getRainbowColor(index)
        break
    }

    return {
      size: Math.random() * 30 + 10,
      left: Math.random() * 100,
      duration: Math.random() * 4 + 10, // 4-8秒
      delay: Math.random() * 2,
      color,
      isOutline: Math.random() > 0.7 // 30% 的機率產生邊框泡泡
    }
  }

  const getBubbleStyle = (bubble: Bubble) => ({
    width: `${bubble.size}px`,
    height: `${bubble.size}px`,
    left: `${bubble.left}%`,
    animationDuration: `${bubble.duration}s`,
    animationDelay: `${bubble.delay}s`,
    background: bubble.isOutline ? 'transparent' : bubble.color,
    border: bubble.isOutline ? `2px solid ${bubble.color}` : 'none'
  })

  let interval: number

  onMounted(() => {
    // 初始創建一些泡泡
    for (let i = 0; i < maxBubbles; i++) {
      bubbles.value.push(createBubble(i))
    }

    // 定期更新泡泡，間隔改為 2 秒
    interval = window.setInterval(() => {
      if (bubbles.value.length < maxBubbles) {
        bubbles.value.push(createBubble(bubbles.value.length))
      }
      // 移除已經完成動畫的泡泡，降低移除機率
      bubbles.value = bubbles.value.filter(() => Math.random() > 0.05)
    }, 2000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })
</script>

<style scoped>
  .bubble-machine {
    /* position: relative;
    width: 200px;
    height: 300px;
    overflow: hidden; */

    position: absolute;
    width: 100%;
    height: 1000px;
    background: linear-gradient(to bottom, #87ceeb, #e0f7fa);
  }

  .bubble {
    position: absolute;
    bottom: -50px;
    border-radius: 50%;
    backdrop-filter: blur(2px);
    animation: float ease-in-out infinite;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-150px) scale(1.1);
      opacity: 0.6;
    }
    100% {
      transform: translateY(-300px) scale(0.9);
      opacity: 0;
    }
  }
</style>
