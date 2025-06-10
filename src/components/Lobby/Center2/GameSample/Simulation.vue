<template>
  <div class="fish-tank">
    <div class="tank-container">
      <div class="water">
        <div class="light"></div>
        <div class="light2"></div>

        <div
          v-for="fish in fishes"
          :key="fish.id"
          class="fish"
          :style="{
            left: fish.position.x + 'px',
            top: fish.position.y + 'px',
            transform: `scaleX(${-fish.direction})`
          }"
        >
          🐟
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="status">
        <div>WATER: {{ waterQuality }}%</div>
        <div>FOOD: {{ food }}%</div>
      </div>

      <div class="buttons">
        <button @click="feedFish" :disabled="food >= 100">FOOD</button>
        <button @click="cleanTank" :disabled="waterQuality >= 100">CLEAR</button>
        <button @click="addFish" :disabled="fishes.length >= state.limitFish">ADD</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { ref, onMounted, onUnmounted } from 'vue'

  interface Fish {
    id: number
    position: {
      x: number
      y: number
    }
    direction: number
  }
  const state = reactive({
    limitFish: 500
  })

  const waterQuality = ref(100)
  const food = ref(100)
  const fishes = ref<Fish[]>([])
  let gameLoop: number

  const addFish = () => {
    if (fishes.value.length < state.limitFish) {
      fishes.value.push({
        id: Date.now(),
        position: {
          x: Math.random() * 200,
          y: Math.random() * 270
        },
        direction: Math.random() > 0.5 ? 1 : -1
      })
    }
  }

  const feedFish = () => {
    if (food.value < 100) {
      food.value = Math.min(100, food.value + 30)
    }
  }
  const cleanTank = () => {
    if (waterQuality.value < 100) {
      waterQuality.value = Math.min(100, waterQuality.value + 50)
    }
  }

  const updateGame = () => {
    const water = document.querySelector('.water')
    const waterWidth = water?.getBoundingClientRect().width || 250

    // 更新魚的位置
    fishes.value.forEach(fish => {
      fish.position.x += fish.direction * 2
      if (fish.position.x > waterWidth - 17 || fish.position.x < 0) {
        fish.direction *= -1
      }
    })

    // 消耗資源
    if (fishes.value.length > 0) {
      food.value = Math.max(0, food.value - 0.1)
      waterQuality.value = Math.max(0, waterQuality.value - 0.05)
    }
  }

  onMounted(() => {
    gameLoop = setInterval(updateGame, 100)
  })

  onUnmounted(() => {
    clearInterval(gameLoop)
  })
</script>

<style lang="scss" scoped>
  .fish-tank {
    width: 100%;
    height: 100%;

    .tank-container {
      width: 100%;
      height: 100%;
      // border: 2px solid #666;
      // border-radius: 10px;
      // overflow: hidden;
      position: relative;
      background: #e3f2fd;
    }

    .controls {
      position: absolute;
      transform: translate(100%, 0);
      bottom: 10px;

      .status {
        margin-bottom: 10px;
        div {
          text-align: left;
        }
      }

      .buttons {
        display: flex;
        gap: 10px;

        button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background: #2196f3;
          color: white;
          cursor: pointer;
        }

        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        button:hover:not(:disabled) {
          background: #1976d2;
        }
      }
    }
  }

  .water {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #4fc3f7, #81d4fa);
    position: relative;
    overflow: hidden;

    .light {
      width: 50%;
      height: 30px;
      position: absolute;
      background: #ffffff6e;
      transform: rotate(-45deg);
      top: 0px;
      left: -90px;
      z-index: 1;
    }
    .light2 {
      width: 70%;
      height: 60px;
      position: absolute;
      background: #ffffff6e;
      transform: rotate(-45deg);
      top: 90px;
      left: -160px;
      z-index: 1;
    }
  }

  .fish {
    position: absolute;
    font-size: 24px;
    transition: transform 0.3s;
  }
</style>
