<template>
  <div class="relative w-full h-full">
    <!-- 粒子容器 -->
    <div class="particles-container">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        class="particle"
        :class="[particleType, { rotating: enableRotation }]"
        :style="{
          '--x': `${particle.x}px`,
          '--y': `${particle.y}px`,
          '--size': `${particle.size}px`,
          '--rotation': `${particle.rotation}deg`,
          '--color': particle.color,
          '--opacity': particle.alpha,
          '--speed': `${animationSpeed}s`
        }"
      ></div>
    </div>

    <!-- 控制面板 -->
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <!-- 粒子形狀選擇器 -->
      <select
        v-model="particleType"
        @change="handleParticleTypeChange"
        class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all cursor-pointer"
      >
        <option value="circle">圓形粒子</option>
        <option value="square">正方形粒子</option>
        <option value="rectangle">長方形粒子</option>
      </select>

      <!-- 粒子大小設定 -->
      <div class="flex flex-col gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            粒子大小：
            <input type="range" v-model="particleSize" min="1" max="20" step="1" class="w-32" />
            <span class="text-white/80">{{ particleSize }}px</span>
          </label>
        </div>
      </div>

      <!-- 動畫速度設定 -->
      <div class="flex flex-col gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            動畫速度：
            <input type="range" v-model="animationSpeed" min="1" max="10" step="0.1" class="w-32" />
            <span class="text-white/80">{{ animationSpeed }}x</span>
          </label>
        </div>
      </div>

      <!-- 顏色選擇器 -->
      <div class="flex flex-col gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            背景顏色：
            <input type="color" v-model="backgroundColor" class="w-8 h-8 rounded cursor-pointer" />
          </label>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            起始顏色：
            <input type="color" v-model="startColor" class="w-8 h-8 rounded cursor-pointer" />
          </label>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            結束顏色：
            <input type="color" v-model="endColor" class="w-8 h-8 rounded cursor-pointer" />
          </label>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            <input
              type="checkbox"
              v-model="useRainbow"
              class="w-4 h-4 rounded border-white/30 bg-white/10 checked:bg-white/20"
            />
            使用彩虹漸變
          </label>
        </div>
      </div>

      <!-- 旋轉效果開關 -->
      <div class="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
        <label class="text-white cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            v-model="enableRotation"
            class="w-4 h-4 rounded border-white/30 bg-white/10 checked:bg-white/20"
          />
          旋轉效果
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue'

  // 定義粒子介面
  interface Particle {
    x: number // 粒子當前 X 座標
    y: number // 粒子當前 Y 座標
    size: number // 粒子大小
    rotation: number // 旋轉角度
    alpha: number // 透明度
    color: string // 粒子顏色
  }

  const particleType = ref('rectangle') // 控制粒子類型
  const enableRotation = ref(true) // 控制旋轉效果
  const startColor = ref('#ff0000') // 起始顏色
  const endColor = ref('#0000ff') // 結束顏色
  const useRainbow = ref(false) // 是否使用彩虹漸變
  const particleSize = ref(4) // 粒子大小
  const animationSpeed = ref(1) // 動畫速度
  const backgroundColor = ref('#000000') // 背景顏色

  // 彩虹顏色陣列
  const rainbowColors = [
    '#ff0000', // 紅
    '#ff7f00', // 橙
    '#ffff00', // 黃
    '#00ff00', // 綠
    '#0000ff', // 藍
    '#4b0082', // 靛
    '#9400d3' // 紫
  ]

  // 生成粒子陣列
  const particles = computed(() => {
    const result: Particle[] = []
    const text = 'Welcome to MySite'
    const fontSize = 120 // 字體大小
    const fontFamily = 'sans-serif'

    // 創建臨時 canvas 來獲取文字像素
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return result

    // 設置 canvas 大小
    ctx.font = `bold ${fontSize}px ${fontFamily}`
    const metrics = ctx.measureText(text)
    const textWidth = metrics.width
    const textHeight = fontSize * 1.2 // 估算文字高度

    canvas.width = textWidth
    canvas.height = textHeight

    // 重新設置字體（因為 canvas 大小改變後需要重新設置）
    ctx.font = `bold ${fontSize}px ${fontFamily}`
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'top'
    ctx.fillText(text, 0, 0)

    // 獲取像素數據
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    // 計算文字區域
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const startX = centerX - textWidth / 2
    const startY = centerY - textHeight / 2

    // 根據粒子大小調整採樣間距
    const spacing = Math.max(4, Math.floor(particleSize.value * 1.5)) // 增加採樣間距

    // 遍歷像素數據生成粒子
    for (let y = 0; y < canvas.height; y += spacing) {
      for (let x = 0; x < canvas.width; x += spacing) {
        const index = (y * canvas.width + x) * 4
        const alpha = pixels[index + 3]

        // 只在有顏色的像素位置生成粒子，並增加透明度閾值
        if (alpha > 180) {
          // 提高透明度閾值，減少粒子數量
          // 計算粒子大小
          const size =
            particleType.value === 'square'
              ? particleSize.value * 1.5
              : particleType.value === 'rectangle'
                ? particleSize.value * 2
                : particleSize.value

          // 計算顏色
          let color: string
          if (useRainbow.value) {
            const colorIndex = Math.floor(Math.random() * rainbowColors.length)
            color = rainbowColors[colorIndex]
          } else {
            const progress = Math.random()
            const start = hexToRgb(startColor.value)
            const end = hexToRgb(endColor.value)
            if (start && end) {
              const r = Math.round(start.r + (end.r - start.r) * progress)
              const g = Math.round(start.g + (end.g - start.g) * progress)
              const b = Math.round(start.b + (end.b - start.b) * progress)
              color = `rgb(${r}, ${g}, ${b})`
            } else {
              color = '#ffffff'
            }
          }

          // 添加一些隨機偏移使文字看起來更自然
          const offsetX = (Math.random() - 0.5) * particleSize.value * 0.5 // 減少偏移範圍
          const offsetY = (Math.random() - 0.5) * particleSize.value * 0.5 // 減少偏移範圍

          result.push({
            x: startX + x + offsetX,
            y: startY + y + offsetY,
            size,
            rotation: Math.random() * 360,
            alpha: 0.95 + Math.random() * 0.05, // 提高基礎透明度
            color
          })
        }
      }
    }

    return result
  })

  // 顏色轉換函數
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  }

  // 處理粒子類型變更
  function handleParticleTypeChange() {
    // 粒子陣列會自動更新
  }

  // 監聽視窗大小變化
  onMounted(() => {
    window.addEventListener('resize', () => {
      // 粒子陣列會自動更新
    })
  })
</script>

<style scoped>
  .particles-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: v-bind(backgroundColor);
    overflow: hidden;
    will-change: transform;
  }

  .particle {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background-color: var(--color);
    opacity: var(--opacity);
    transform: rotate(var(--rotation));
    transition: all var(--speed) ease-out;
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    filter: blur(0.3px); /* 減少模糊效果 */
  }

  .particle.circle {
    border-radius: 50%;
  }

  .particle.square {
    width: var(--size);
    height: var(--size);
  }

  .particle.rectangle {
    width: calc(var(--size) / 2);
    height: var(--size);
  }

  .particle.rotating {
    animation: rotate calc(var(--speed) * 2s) linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* 優化動畫性能 */
  @media (prefers-reduced-motion: reduce) {
    .particle {
      transition: none;
    }
    .particle.rotating {
      animation: none;
    }
  }

  /* 自定義下拉選單樣式 */
  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.7rem center;
    background-size: 1em;
    padding-right: 2.5rem;
  }

  select option {
    background-color: #1a1a1a;
    color: white;
  }

  /* 自定義複選框樣式 */
  input[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    border: 1px solid;
    transition: all 0.2s;
  }

  input[type='checkbox']:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='20 6 9 17 4 12'%3e%3c/polyline%3e%3c/svg%3e");
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* 自定義顏色選擇器樣式 */
  input[type='color'] {
    -webkit-appearance: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type='color']::-webkit-color-swatch {
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  /* 自定義滑塊樣式 */
  input[type='range'] {
    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    height: 4px;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }

  input[type='range']::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
</style>
