<template>
  <div class="sports-game">
    <div class="game-area">
      <div class="tree">
        <div class="trunk"></div>
        <div class="leaves"></div>
      </div>
      <div class="field">
        <div class="target" :style="targetStyle">
          <div class="target-ring" :class="{ scored: isThrowing && distance < 5 }"></div>
        </div>

        <div class="ball" :style="ballStyle" :class="{ throwing: isThrowing }">
          <div
            class="angle-indicator"
            :style="{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }"
            v-show="!isThrowing && !isInBasket && !isCharging"
          ></div>
        </div>

        <svg class="trajectory" v-if="!isThrowing && !isInBasket">
          <path
            :d="trajectoryPath"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-dasharray="5,5"
          />
        </svg>
      </div>
    </div>

    <div class="game-controls">
      <div class="angle-control">
        <label class="label">{{ angle }}°</label>
        <input type="range" v-model="angle" min="0" max="90" :disabled="isThrowing || isInBasket" />
      </div>
      <div style="flex: 1"></div>

      <div class="power-meter">
        <div class="power-bar" :style="{ width: `${power}%` }"></div>
        <span>Power: {{ power }}%</span>
      </div>

      <div class="throw-control">
        <button
          class="throw-button"
          @mousedown="startCharging"
          @mouseup="throwBall"
          @mouseleave="cancelThrow"
          :disabled="isThrowing || isInBasket"
        >
          {{ isCharging ? 'CHA...' : 'HOLD' }}
        </button>
      </div>

      <button @click="resetGame" class="reset-button" style="display: none">Reset Game</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const GRAVITY = 0.5
  const MAX_POWER = 100
  const POWER_INCREASE_RATE = 2

  const power = ref(0)
  const angle = ref(45)
  const isCharging = ref(false)
  const isThrowing = ref(false)
  const isInBasket = ref(false)
  const score = ref(0)

  const ballPosition = ref({ x: 20, y: 80 })
  const ballVelocity = ref({ x: 0, y: 0 })
  const targetPosition = ref({ x: 80, y: 60 })

  const distance = ref(0)

  const ballStyle = computed(() => ({
    left: `${ballPosition.value.x}%`,
    top: `${ballPosition.value.y}%`
  }))

  const targetStyle = computed(() => ({
    left: `${targetPosition.value.x}%`,
    top: `${targetPosition.value.y}%`
  }))

  const trajectoryPath = computed(() => {
    if (isThrowing.value) return ''

    const points = []
    const steps = 50
    const powerX = (power.value / 100) * Math.cos((angle.value * Math.PI) / 180)
    const powerY = (power.value / 100) * Math.sin((angle.value * Math.PI) / 180)

    // Get the actual dimensions of the game area
    const gameArea = document.querySelector('.field')
    if (!gameArea) return ''

    const width = gameArea.clientWidth
    const height = gameArea.clientHeight

    // Convert percentage positions to pixel values
    const startX = (ballPosition.value.x / 100) * width
    const startY = (ballPosition.value.y / 100) * height

    for (let i = 0; i < steps; i++) {
      const t = i / 10
      const x = startX + powerX * t * width
      const y = startY - (powerY * t * height - 0.5 * GRAVITY * t * t * height)
      points.push(`${x} ${y}`)
    }

    return `M ${points.join(' L ')}`
  })

  const startCharging = () => {
    if (isThrowing.value) return
    isCharging.value = true
    power.value = 0
    chargePower()
  }

  const chargePower = () => {
    if (!isCharging.value) return

    power.value = Math.min(power.value + POWER_INCREASE_RATE, MAX_POWER)
    requestAnimationFrame(chargePower)
  }

  const cancelThrow = () => {
    if (isCharging.value) {
      isCharging.value = false
      power.value = 0
    }
  }

  const throwBall = () => {
    if (!isCharging.value) return
    isCharging.value = false
    isThrowing.value = true

    const powerX = (power.value / 100) * Math.cos((angle.value * Math.PI) / 180)
    const powerY = (power.value / 100) * Math.sin((angle.value * Math.PI) / 180)

    ballVelocity.value = {
      x: powerX * 2,
      y: -powerY * 2
    }

    updateBall()
  }

  const updateBall = () => {
    if (!isThrowing.value) return

    ballPosition.value.x += ballVelocity.value.x
    ballPosition.value.y += ballVelocity.value.y
    ballVelocity.value.y += GRAVITY / 10

    // Check collision with target
    const dx = ballPosition.value.x - targetPosition.value.x
    const dy = ballPosition.value.y - targetPosition.value.y
    distance.value = Math.sqrt(dx * dx + dy * dy)

    if (distance.value < 5) {
      score.value += 1
      showScoreEffect()
      isThrowing.value = false
      isInBasket.value = true
      ballPosition.value = { x: targetPosition.value.x, y: targetPosition.value.y }
      setTimeout(() => {
        resetBall()
      }, 2000)
      return
    }

    // Check if ball is out of bounds
    if (ballPosition.value.x > 100 || ballPosition.value.y > 100) {
      resetBall()
    }

    requestAnimationFrame(updateBall)
  }

  const showScoreEffect = () => {
    const field = document.querySelector('.field')
    if (!field) return

    const effect = document.createElement('div')
    effect.className = 'score-effect'
    effect.textContent = 'SCORE'
    effect.style.position = 'absolute'
    effect.style.left = `${targetPosition.value.x}%`
    effect.style.top = `${targetPosition.value.y - 40}%`
    effect.style.color = '#ff0000'
    effect.style.fontSize = '20px'
    effect.style.fontWeight = '900'
    field.appendChild(effect)

    setTimeout(() => {
      effect.remove()
    }, 1000)
  }

  const resetBall = () => {
    isThrowing.value = false
    isInBasket.value = false
    power.value = 0
    ballPosition.value = { x: 20, y: 80 }
    ballVelocity.value = { x: 0, y: 0 }
  }

  const resetGame = () => {
    resetBall()
    score.value = 0
  }
</script>

<style scoped>
  .sports-game {
    height: 240px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;

    .game-area {
      height: 75%;
      background-color: #a9af4c;
      position: relative;
    }
    .game-controls {
      background-color: #3b843e;
      width: 100%;
      height: 50px;

      padding-left: 20px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      .angle-control {
        /* width: 100%; */
        width: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        .label {
          position: absolute;
          left: 10px;
          bottom: 45px;
          width: 66px;

          color: #fff;
          font-size: 20px;
          font-weight: 900;

          padding: 10px;
          padding-top: 6px;
          padding-bottom: 6px;
          border: 5px solid #fff;
          border-radius: 10%;
        }
      }
      .power-meter {
        width: 350px;
        height: 20px;
        background-color: #ddd;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        .power-bar {
          width: 100%;
          height: 100%;
          background-color: #ffd817;
          transition: width 0.1s linear;
        }
      }
      .throw-control {
        width: 150px;
        display: flex;
        justify-content: center;

        .throw-button {
          position: absolute;
          bottom: 45px;
          right: 10px;

          width: 120px;
          height: 60px;
          background-color: #ff5722;
          color: white;
          border: none;
          font-size: 30px;
          font-weight: 900;
          border: 5px solid #611e08;
          border-radius: 10%;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
          transition: all 0.3s;

          &:hover:not(:disabled) {
            background-color: #f4511e;
            transform: scale(1.05);
          }

          &:active:not(:disabled) {
            transform: scale(0.95);
          }

          &:disabled {
            background-color: #ccc;
            border-color: #ccc;
            cursor: not-allowed;
          }
        }
      }
    }
  }

  .game-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .game-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }

  .score {
    font-size: 24px;
    font-weight: bold;
    color: #2196f3;
  }

  .field {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .ball {
    width: 40px;
    height: 40px;
    background: #ff6b00;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: all 0.1s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      inset -3px -3px 6px rgba(0, 0, 0, 0.2),
      inset 3px 3px 6px rgba(255, 255, 255, 0.3),
      0 3px 6px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .ball.throwing {
    animation: ballRotate 0.5s linear infinite;
  }

  @keyframes ballRotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .ball::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 45%, #000 45%, #000 55%, transparent 55%),
      linear-gradient(-45deg, transparent 45%, #000 45%, #000 55%, transparent 55%);
    border-radius: 50%;
    opacity: 0.2;
  }

  .ball::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent 45%, #000 45%, #000 55%, transparent 55%),
      linear-gradient(0deg, transparent 45%, #000 45%, #000 55%, transparent 55%);
    border-radius: 50%;
    opacity: 0.2;
  }

  .target {
    width: 60px;
    height: 60px;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .target-ring {
    width: 100%;
    height: 100%;
    border: 4px solid #ffd700;
    border-radius: 50%;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      width: 120%;
      height: 120%;
      top: -67%;
      left: -10%;
      background: linear-gradient(
        45deg,
        transparent 45%,
        #ffd700 45%,
        #ffd700 55%,
        transparent 55%
      );
      transform: rotate(315deg);
      opacity: 0.7;
    }
  }

  .target-ring.scored {
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }

  .target-ring .target-ring::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at center,
        transparent 30%,
        #ffd700 30%,
        #ffd700 35%,
        transparent 35%
      ),
      radial-gradient(circle at center, transparent 40%, #ffd700 40%, #ffd700 45%, transparent 45%),
      radial-gradient(circle at center, transparent 50%, #ffd700 50%, #ffd700 55%, transparent 55%);
    border-radius: 50%;
    opacity: 0.2;
  }

  .backboard {
    position: absolute;
    width: 80px;
    height: 60px;
    background: #ffffff;
    border: 4px solid #ffd700;
    border-radius: 8px;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .backboard::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 45%, #ffd700 45%, #ffd700 55%, transparent 55%);
    opacity: 0.1;
  }

  .net {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: -35px;
    left: 0;
    background: linear-gradient(
        90deg,
        transparent 0%,
        #ffd700 5%,
        transparent 10%,
        transparent 90%,
        #ffd700 95%,
        transparent 100%
      ),
      linear-gradient(
        0deg,
        transparent 0%,
        #ffd700 5%,
        transparent 10%,
        transparent 90%,
        #ffd700 95%,
        transparent 100%
      );
    background-size: 20px 20px;
    opacity: 0.3;
    transform-origin: top;
    animation: netSwing 2s ease-in-out infinite;
  }

  @keyframes netSwing {
    0%,
    100% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(5deg);
    }
  }

  .trajectory {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .angle-control input[type='range'] {
    width: 100%;
  }

  .instructions {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    width: 100%;
  }

  .instructions p {
    margin: 5px 0;
    color: #666;
  }

  .reset-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #2196f3;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
    max-width: 200px;
  }

  .reset-button:hover {
    background-color: #1976d2;
  }

  .angle-indicator {
    position: absolute;
    width: 3px;
    height: 25px;
    /* background: linear-gradient(to top, #ff5722, #ff8a65); */
    background: #00ff32;
    transform-origin: center center;
    transition: transform 0.1s linear;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* box-shadow: 0 0 3px rgba(255, 87, 34, 0.5); */
    z-index: 1;
  }

  .score-effect {
    position: absolute;
    color: #ffd700;
    font-size: 40px;
    font-weight: 900;
    animation: scoreFloat 1s ease-out forwards;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    pointer-events: none;
    z-index: 10;
    transform: translate(-50%, -50%);
    font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
    white-space: nowrap;
  }

  @keyframes scoreFloat {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    20% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -200%) scale(1);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .sports-game {
      padding: 10px;
    }

    .game-status {
      flex-direction: column;
      gap: 10px;
    }

    .power-meter {
      width: 100%;
    }

    .game-area {
      height: 50vh;
    }

    .throw-button {
      padding: 12px 30px;
      font-size: 16px;
    }
  }

  .tree {
    position: absolute;
    right: 5%;
    top: -70px;
    z-index: 1;
    transform: scale(0.8);

    .trunk {
      width: 20px;
      height: 80px;
      background: #8b4513;
      position: relative;
      border-radius: 4px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .leaves {
      position: absolute;
      top: -40px;
      left: -30px;
      width: 80px;
      height: 80px;
      background: #2e8b57;
      border-radius: 50%;
      box-shadow:
        -20px -20px 0 #2e8b57,
        20px -20px 0 #2e8b57,
        -20px 20px 0 #2e8b57,
        20px 20px 0 #2e8b57;
      animation: sway 3s ease-in-out infinite;
    }
  }

  @keyframes sway {
    0%,
    100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(5deg);
    }
  }
</style>
