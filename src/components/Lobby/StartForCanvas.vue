<template>
  <div class="relative w-full h-full">
    <canvas
      ref="canvasRef"
      class="w-full h-full fixed top-0 left-0 z-50 transition-opacity duration-1000 ease-linear"
      :style="{ opacity: isFadingOut ? 1 - fadeOutProgress : 1 }"
    ></canvas>
    <!-- 控制面板 -->
    <div
      class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 transition-opacity duration-1000 ease-linear"
      :style="{ opacity: isFadingOut ? 1 - fadeOutProgress : 1 }"
      style="display: none"
    >
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

      <!-- 字體設定 -->
      <div class="flex flex-col gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            字體字型：
            <select
              v-model="fontFamily"
              class="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg backdrop-blur-sm transition-all cursor-pointer"
            >
              <option value="sans-serif">無襯線</option>
              <option value="serif">襯線</option>
              <option value="monospace">等寬</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </label>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            字體大小：
            <input type="range" v-model="fontSize" min="20" max="200" step="1" class="w-32" />
            <span class="text-white/80">{{ fontSize }}px</span>
          </label>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            字體粗細：
            <select
              v-model="fontWeight"
              class="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg backdrop-blur-sm transition-all cursor-pointer"
            >
              <option value="normal">正常</option>
              <option value="bold">粗體</option>
              <option value="lighter">細體</option>
            </select>
          </label>
        </div>
      </div>

      <!-- 粒子大小設定 -->
      <div class="flex flex-col gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            粒子大小：
            <input type="range" v-model="particleSize" min="1" max="20" step="1" class="w-32" />
            <span class="text-white/80">{{ particleSize }}px</span>
          </label>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-white flex items-center gap-2">
            粒子密度：
            <input type="range" v-model="particleDensity" min="1" max="10" step="1" class="w-32" />
            <span class="text-white/80">{{ particleDensity }}x</span>
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
  import { reactive } from 'vue'
  import { onMounted, ref, watch } from 'vue'

  const emit = defineEmits(['actionsEnd'])
  // 定義粒子介面
  interface Particle {
    x: number // 粒子當前 X 座標
    y: number // 粒子當前 Y 座標
    destX: number // 粒子目標 X 座標
    destY: number // 粒子目標 Y 座標
    vx: number // X 方向速度
    vy: number // Y 方向速度
    alpha: number // 透明度
    width: number // 形狀寬度
    height: number // 形狀高度
    rotation: number // 旋轉角度
    rotationSpeed: number // 旋轉速度
    colorProgress: number // 顏色漸變進度
  }

  const _default = reactive({
    text: 'HAPPY FAT YOYO',
    type: 'rectangle',
    rotation: false,
    colorStart: '#D50B5C',
    colorEnd: '#D50B5C',
    useRainbow: false,
    particleSize: 7,
    particleDensity: 6,
    fadeDelay: 2700
  })

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  let ctx: CanvasRenderingContext2D | null = null
  let particles: Particle[] = []
  const text = _default.text
  const particleType = ref(_default.type) // 控制粒子類型
  const enableRotation = ref(_default.rotation) // 控制旋轉效果
  const startColor = ref(_default.colorStart) // 起始顏色
  const endColor = ref(_default.colorEnd) // 結束顏色
  const useRainbow = ref(false) // 是否使用彩虹漸變
  const particleSize = ref(_default.particleSize) // 粒子大小
  const particleDensity = ref(_default.particleDensity) // 粒子密度
  const animationSpeed = ref(1) // 動畫速度
  const backgroundColor = ref('#ffeaea') // 背景顏色
  const fontFamily = ref('sans-serif') // 字體字型
  const fontSize = ref(80) // 字體大小
  const fontWeight = ref('bold') // 字體粗細
  const isReady = ref(false) // 動畫是否完成
  const isFadingOut = ref(false) // 是否正在淡出
  const fadeOutProgress = ref(0) // 淡出進度
  const readyToFade = ref(false) // 是否準備開始淡出
  const fadeDelay = _default.fadeDelay // 淡出前等待時間（毫秒）

  // 監聽背景顏色變化
  watch(backgroundColor, newColor => {
    if (canvasRef.value) {
      canvasRef.value.style.backgroundColor = newColor
    }
  })

  // 監聽粒子大小變化
  watch(particleSize, () => {
    if (canvasRef.value) {
      createParticles(canvasRef.value)
    }
  })

  // 監聽粒子密度變化
  watch(particleDensity, () => {
    if (canvasRef.value) {
      createParticles(canvasRef.value)
    }
  })

  // 監聽字體相關屬性變化
  watch([fontFamily, fontSize, fontWeight], () => {
    if (canvasRef.value) {
      createParticles(canvasRef.value)
    }
  })

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

  // 計算漸變顏色
  function getGradientColor(progress: number) {
    if (useRainbow.value) {
      // 彩虹漸變
      const colorIndex = Math.floor(progress * (rainbowColors.length - 1))
      const nextColorIndex = (colorIndex + 1) % rainbowColors.length
      const localProgress = (progress * (rainbowColors.length - 1)) % 1

      const start = hexToRgb(rainbowColors[colorIndex])
      const end = hexToRgb(rainbowColors[nextColorIndex])
      if (!start || !end) return '#ffffff'

      const r = Math.round(start.r + (end.r - start.r) * localProgress)
      const g = Math.round(start.g + (end.g - start.g) * localProgress)
      const b = Math.round(start.b + (end.b - start.b) * localProgress)

      return `rgb(${r}, ${g}, ${b})`
    } else {
      // 自定義漸變
      const start = hexToRgb(startColor.value)
      const end = hexToRgb(endColor.value)
      if (!start || !end) return '#ffffff'

      const r = Math.round(start.r + (end.r - start.r) * progress)
      const g = Math.round(start.g + (end.g - start.g) * progress)
      const b = Math.round(start.b + (end.b - start.b) * progress)

      return `rgb(${r}, ${g}, ${b})`
    }
  }

  // 處理粒子類型變更
  function handleParticleTypeChange() {
    // 重新創建粒子
    if (canvasRef.value) {
      createParticles(canvasRef.value)
    }
  }

  // 調整畫布大小以適應視窗
  function resizeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  // 創建粒子
  function createParticles(canvas: HTMLCanvasElement) {
    // 創建臨時畫布用於文字渲染
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')!
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height

    // 設置文字樣式
    tempCtx.fillStyle = '#ffffff'
    tempCtx.font = `${fontWeight.value} ${fontSize.value}px ${fontFamily.value}`
    tempCtx.textAlign = 'center'
    tempCtx.textBaseline = 'middle'
    tempCtx.fillText(text, canvas.width / 2, canvas.height / 2)

    // 獲取文字像素數據
    const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height).data
    const result: Particle[] = []

    // 根據密度計算採樣間距
    const spacing = Math.max(1, Math.floor(12 - particleDensity.value))

    // 遍歷像素創建粒子
    for (let y = 0; y < canvas.height; y += spacing) {
      for (let x = 0; x < canvas.width; x += spacing) {
        const i = (y * canvas.width + x) * 4
        if (imageData[i + 3] > 128) {
          // 根據粒子類型設置尺寸
          let width = particleSize.value
          let height = particleSize.value

          if (particleType.value === 'square') {
            width = height = particleSize.value * 1.5 // 正方形尺寸
          } else if (particleType.value === 'rectangle') {
            width = particleSize.value
            height = particleSize.value * 2 // 長方形尺寸
          }

          result.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            destX: x,
            destY: y,
            vx: 0,
            vy: 0,
            alpha: 0,
            width,
            height,
            rotation: Math.random() * 360, // 初始隨機旋轉角度
            rotationSpeed: (Math.random() - 0.5) * 2, // 隨機旋轉速度
            colorProgress: Math.random() // 隨機顏色進度
          })
        }
      }
    }

    particles = result
  }

  // 開始淡出動畫
  function startFadeOut() {
    isFadingOut.value = true
    fadeOutProgress.value = 0
  }

  // 更新粒子位置和速度
  function updateParticles() {
    let allParticlesReady = true

    for (const p of particles) {
      // 計算目標方向
      const dx = p.destX - p.x
      const dy = p.destY - p.y

      // 更新速度（加入彈性效果）
      p.vx += dx * 0.01 * animationSpeed.value
      p.vy += dy * 0.01 * animationSpeed.value
      p.vx *= 0.9 // 阻尼效果
      p.vy *= 0.9 // 阻尼效果

      // 更新位置
      p.x += p.vx
      p.y += p.vy

      // 檢查粒子是否到達目標位置
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        allParticlesReady = false
      }

      // 只在非圓形模式且啟用旋轉時更新旋轉
      if (particleType.value !== 'circle' && enableRotation.value) {
        p.rotation += p.rotationSpeed * animationSpeed.value
      }

      // 漸變透明度
      p.alpha = Math.min(p.alpha + 0.02 * animationSpeed.value, 1)

      // 更新顏色進度
      p.colorProgress = (p.colorProgress + 0.001 * animationSpeed.value) % 1
    }

    // 如果所有粒子都準備好了且沒有在淡出，設置準備淡出狀態
    if (allParticlesReady && !isFadingOut.value && !readyToFade.value) {
      readyToFade.value = true
      // 等待指定時間後開始淡出
      setTimeout(() => {
        startFadeOut()
      }, fadeDelay)
    }

    // 如果正在淡出，更新淡出進度
    if (isFadingOut.value) {
      fadeOutProgress.value = Math.min(fadeOutProgress.value + 0.01 * animationSpeed.value, 1)
      if (fadeOutProgress.value >= 1) {
        isReady.value = true
        emit('actionsEnd')
      }
    }
  }

  // 繪製粒子
  function drawParticles() {
    if (!ctx || !canvasRef.value) return
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

    for (const p of particles) {
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = getGradientColor(p.colorProgress)

      if (particleType.value === 'circle') {
        // 繪製圓形
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.width / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // 保存當前畫布狀態
        ctx.save()

        // 移動到粒子中心點
        ctx.translate(p.x, p.y)

        // 只在啟用旋轉時旋轉畫布
        if (enableRotation.value) {
          ctx.rotate((p.rotation * Math.PI) / 180)
        }

        // 繪製方形（從中心點繪製）
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height)

        // 恢復畫布狀態
        ctx.restore()
      }
    }

    ctx.globalAlpha = 1
  }

  // 動畫循環
  function animate() {
    updateParticles()
    drawParticles()
    requestAnimationFrame(animate)
  }

  // 組件掛載時初始化
  onMounted(() => {
    const canvas = canvasRef.value!
    ctx = canvas.getContext('2d')
    resizeCanvas(canvas)
    createParticles(canvas)
    animate()
    // 監聽視窗大小變化
    window.addEventListener('resize', () => resizeCanvas(canvas))
  })

  // 暴露 isReady 給父組件
  defineExpose({
    isReady
  })
</script>

<style scoped>
  canvas {
    background-color: v-bind(backgroundColor);
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
