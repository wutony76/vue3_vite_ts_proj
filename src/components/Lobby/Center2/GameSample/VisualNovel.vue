<template>
  <div class="visual-novel-container">
    <!-- <div class="game-scene">
      <div class="background" :style="{ backgroundImage: `url(${currentScene.background})` }"></div>
      <div
        class="character"
        v-if="currentScene.character"
        :style="{ backgroundImage: `url(${currentScene.character})` }"
      ></div>
    </div> -->

    <div class="dialogue-box">
      <div class="speaker" v-if="state.currScene.speaker">{{ state.currScene.speaker }}</div>
      <!-- {{ state.currScene }} -->
      <div class="text">{{ state.currScene.text }}</div>
    </div>

    <div class="spacer"></div>

    <div class="choices" v-if="state.currScene.choices">
      <button
        v-for="(choice, i) in state.currScene.choices"
        :key="i"
        @click="actions.choice(i)"
        class="choice-btn"
      >
        {{ choice.text }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { ref, reactive } from 'vue'

  interface Choice {
    text: string
    nextScene: number
  }

  interface Scene {
    cmd?: string
    background: string
    character?: string
    speaker?: string
    text: string
    choices?: Choice[]
  }

  const gameState = reactive({
    playerName: '玩家',
    money: 1000,
    reputation: 0,
    currentLocation: 'entrance'
  })

  const scenes = ref<Scene[]>([
    {
      background: '/images/nightclub/entrance.jpg',
      text: '徬徨的夜晚，你站在夜店門口，霓虹燈閃爍著。門口的保安正在檢查入場券。',
      choices: [
        { text: '出示入場券', nextScene: 1 },
        { text: '試圖賄賂保安', nextScene: 2 }
      ]
    },
    {
      background: '/images/nightclub/main.jpg',
      text: '你成功進入夜店。震耳欲聾的音樂聲中，舞池裡擠滿了人。',
      choices: [
        { text: '去舞池跳舞', nextScene: 3 },
        { text: '去吧台點酒', nextScene: 4 }
      ]
    },
    {
      background: '/images/nightclub/entrance.jpg',
      text: '保安拒絕了你的賄賂，並警告你如果再這樣就要叫警察了。',
      // text: '保安警告你如果再這樣就要叫警察了。',
      choices: [
        { text: '道歉並出示入場券', nextScene: 1 },
        { text: '離開夜店', nextScene: 5 }
      ]
    },
    {
      background: '/images/nightclub/dancefloor.jpg',
      text: '你在舞池中盡情舞動，周圍的人們都被你的舞姿吸引。',
      choices: [
        { text: '繼續跳舞', nextScene: 6 },
        { text: '休息一下', nextScene: 4 }
      ]
    },
    {
      background: '/images/nightclub/bar.jpg',
      text: '吧台前坐著一位調酒師，他問你想喝什麼。',
      choices: [
        { text: '點一杯威士忌', nextScene: 7 },
        { text: '點一杯雞尾酒', nextScene: 7 }
      ]
    },
    {
      cmd: 'EXIT',
      background: '/images/nightclub/entrance.jpg',
      text: '不甘狂躁的心情下，決定要做一件大事...',
      choices: [
        // { text: '道歉並出示入場券', nextScene: 1 },
        { text: '重新再來一次', nextScene: 0 }
      ]
    },
    {
      cmd: 'EXIT',
      background: '/images/nightclub/entrance.jpg',
      text: '察覺不懷好意的視野，被混混盯上，想請你喝一杯。',
      choices: [
        { text: '接受', nextScene: 4 },
        { text: '直接離開', nextScene: 5 }
      ]
    },
    {
      cmd: 'EXIT',
      background: '/images/nightclub/entrance.jpg',
      text: '一口喝了下去，意識模糊跌倒在地...',
      choices: [
        { text: '未完待續', nextScene: -1 },
        // { text: '直接離開', nextScene: 5 }
        { text: '重新再來一次', nextScene: 0 }
      ]
    }
  ])

  // const currentSceneIndex = ref(0)
  // const currentScene = ref(scenes.value[0])

  const state = reactive({
    currSelected: 0,
    currScene: scenes.value[0],
    sceneLen: computed(() => scenes.value.length)
  })

  const actions = {
    choice: (choiceIndex: number) => {
      const choice = state.currScene.choices?.[choiceIndex]
      if (choice) handle.nextScene(choice)
    }
  }
  const handle = {
    nextScene: (choice: Choice) => {
      const sceneIndex = choice.nextScene
      if (sceneIndex < 0) return
      else if (sceneIndex > state.sceneLen - 1) {
        state.currScene = scenes.value[0]
        return
      }
      // console.log('choice.next.index', sceneIndex)
      // console.log('choice.scene.len', state.sceneLen)
      state.currScene = scenes.value[sceneIndex]
    }
  }
</script>

<style scoped>
  .visual-novel-container {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(
      135deg,
      #000000 0%,
      #1a0033 25%,
      #330066 50%,
      #1a0033 75%,
      #000000 100%
    );
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border-radius: 10px 0px 0px 0px;
  }

  .visual-novel-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
      linear-gradient(45deg, rgba(255, 0, 255, 0.05) 0%, transparent 50%),
      linear-gradient(-45deg, rgba(0, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  .visual-novel-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0%,
      transparent 49%,
      rgba(255, 255, 255, 0.03) 50%,
      transparent 51%
    );
    pointer-events: none;
  }

  .game-scene {
    width: 100%;
    /* height: 60vh; */
    position: relative;
    overflow: hidden;
  }

  .background {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  .character {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .dialogue-box {
    width: 90%;
    max-width: 800px;
    margin: 20px auto;
    background: rgba(0, 0, 0, 0.4);
    padding: 20px;
    border-radius: 15px;
    border: 2px solid #ff00ff;
    box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
    z-index: 2;
  }

  .speaker {
    font-size: 1.2em;
    color: #ff00ff;
    margin-bottom: 10px;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(255, 0, 255, 0.5);
  }

  .text {
    font-size: 1.1em;
    line-height: 1.6;
    /* margin-bottom: 10px; */
  }

  .choices {
    width: 90%;
    max-width: 800px;
    margin: 0 auto 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 2;
  }

  .choice-btn {
    background: rgba(255, 0, 255, 0.15);
    border: 2px solid #ff00ff;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1em;
    text-align: left;
    backdrop-filter: blur(5px);
  }

  .choice-btn:hover {
    background: rgba(255, 0, 255, 0.3);
    transform: translateX(10px);
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.4);
  }

  @media (max-width: 768px) {
    .game-scene {
      height: 50vh;
    }

    .dialogue-box {
      width: 95%;
      padding: 15px;
    }

    .choices {
      width: 95%;
    }

    .choice-btn {
      padding: 12px 15px;
    }
  }

  .spacer {
    flex: 1;
    min-height: 20px;
  }
</style>
