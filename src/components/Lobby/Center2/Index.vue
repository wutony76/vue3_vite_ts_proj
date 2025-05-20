<script setup lang="ts">
import { _uuid2 } from '@/logic/utils/Encrypt'
import Animation from '@/logic/utils/Animation'
import GameIcon from '@/components/Lobby/GameIcon.vue'
import Card from './Card.vue';
import { reactive, onMounted, onUnmounted } from 'vue';


const STATUS = {
  VISUAL_NOVEL:
  {
    name: 'Visual Novel',
    color: '#ff6981',
    class: 'bar-visual-novel',
  },
  SPORTS: {
    name: 'Sports',
    color: '#ffd269',
    class: 'bar-sports',
  },
  MUSIC: {
    name: 'Music',
    color: '#ff79dd',
    class: 'bar-music',
  },
  ADVENTURE: {
    name: 'Adventure',
    color: '#71de95',
    class: 'bar-adventure',
  },
  SIMULATION: {
    name: 'Simulation',
    color: '#4ccae0',
    class: 'bar-simulation',
  },
}
const state = reactive({
  key: _uuid2(),
  isClick: false,
  selected: STATUS.VISUAL_NOVEL,
  block1RightWidth: '50px',
  scrollY: 0,
  transform: {
    translateY: 0,
    rotate: 0
  }
})

const clickListener = (status: typeof STATUS[keyof typeof STATUS]) => {
  // 停止自動切換計時器
  init.stopRandomTimer();
  state.isClick = true;

  // 添加點擊動畫類
  const elements = [
    '.block-1-right',
    '.block-1-right-2',
    '.block-1-right-main',
    '.video-billboard'
  ]
  elements.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('click-transition');
      setTimeout(() => {
        el.classList.remove('click-transition');
      }, 500);
    }
  })
  state.selected = status
}
const init = {
  timer: null as number | null,
  playRandomSelected() {
    const randomIndex = Math.floor(Math.random() * Object.keys(STATUS).length);
    const randomKey = Object.keys(STATUS)[randomIndex] as keyof typeof STATUS;
    state.selected = STATUS[randomKey];
  },
  startRandomTimer() {
    // 每 5 秒隨機選擇一次
    this.timer = window.setInterval(() => {
      this.playRandomSelected();
    }, 5000);
  },
  stopRandomTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  setupHoverEffects() {
    // block hover effect
    const blockId = `#id-block-1-right-${state.key}`
    const hoverClass = 'right-title-hover'
    const jqDome = $(blockId).find(`[tag="title"]`)
    jqDome.on('mouseenter', function () {
      if (!$(this).attr('class')?.split(' ').includes(hoverClass)) $(this).addClass(hoverClass)
    })
    jqDome.on('mouseleave', function () {
      $(this).removeClass(hoverClass)
    })
  },
  run() {
    state.isClick = false;

    const rightBarBlocks = ['id-block1-right-bar'];
    rightBarBlocks.forEach(block => {
      Animation.addSubClass(block, 'animation-item-intro', 2100);
      Animation.removeSubClass(block, 'animation-item-intro', 3000);
      Animation.addSubClass(block, 'alpha-1', 2900);
    });

    // 啟動隨機選擇計時器
    this.startRandomTimer();
  }
};


const updateWidth = () => {
  const windowWidth = window.innerWidth;
  const width = Math.min(Math.max(windowWidth * 0.15 - 30, 50), 500);
  state.block1RightWidth = `${width}px`;
}
const handleScroll = () => {
  const el = document.querySelector('.gameLobby')
  if (!el) return
  state.scrollY = el.scrollTop
}

onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
  const el = document.querySelector('.gameLobby');
  if (el) el.addEventListener('scroll', handleScroll);

  init.setupHoverEffects()
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
  const el = document.querySelector('.gameLobby');
  if (el) el.removeEventListener('scroll', handleScroll);

  // 清除計時器
  init.stopRandomTimer();
})

init.run()
</script>

<template>
  <div class="center2" :class="`center-${state.key}`">
    <div class="game-info-container">
      <div class="block-1">
        <div class="section-header">
          <span class="item setting-text">GAME STATS</span>
        </div>
        <div class="stats-grid">
          <Card :index="1" :height="330" :isActive="state.selected.name === STATUS.VISUAL_NOVEL.name"
            :text="STATUS.VISUAL_NOVEL.name" @click="clickListener(STATUS.VISUAL_NOVEL)" />
          <!-- 文字冒險 -->
          <Card :index="2" :height="230" :isActive="state.selected.name === STATUS.SPORTS.name"
            :text="STATUS.SPORTS.name" @click="clickListener(STATUS.SPORTS)" />
          <!-- 角色扮演 -->
          <Card :index="3" :height="280" :isActive="state.selected.name === STATUS.MUSIC.name" :text="STATUS.MUSIC.name"
            @click="clickListener(STATUS.MUSIC)" /> <!-- 音樂 -->
          <Card :index="4" :height="273" :isActive="state.selected.name === STATUS.ADVENTURE.name"
            :text="STATUS.ADVENTURE.name" @click="clickListener(STATUS.ADVENTURE)" />
          <!-- 冒險 -->
          <Card :index="5" :height="320" :isActive="state.selected.name === STATUS.SIMULATION.name"
            :text="STATUS.SIMULATION.name" @click="clickListener(STATUS.SIMULATION)" />
          <!-- 模擬 -->
        </div>
      </div>

      <div :id="`id-block-1-right-${state.key}`" :tag="`tag-block-1-right-${state.key}`" class="block-1-right"
        :style="{ width: state.block1RightWidth, background: state.selected.color }">
        <div class="item setting-text" tag="title">LIFESTYLE</div>
      </div>
      <!-- BAR.ICON SETTINGS -->
      <div id="id-block1-right-bar" class="block-1-right-2" :class="state.selected.class">
        <GameIcon style="--item-index: 0;" />
        <GameIcon style="--item-index: 1;" />
        <GameIcon style="--item-index: 2;" />
        <GameIcon style="--item-index: 3;" />
        <GameIcon style="--item-index: 4;" />
        <GameIcon style="--item-index: 5;" />
      </div>
      <!-- VIDEO.大的廣告看板 SETTINGS -->
      <div class="block-1-right-main" :class="state.selected.class" :style="{
        background: state.selected.color,
      }">
        <div class="item-left-1" :class="state.selected.class"></div>
        <div class="video-billboard" :class="state.selected.class" :style="{
          transform: `translateY(${state.transform.translateY}px) rotate(${state.transform.rotate}deg)`,
          transition: 'transform 0.2s ease-out'
        }"></div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.center2 {
  border: 1px solid #2600ff;
  min-height: 1500px;
  margin-top: 0px;

  .right-title-hover {
    cursor: default;
    animation-name: electronic-hover;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
    transform-origin: right center;

    @keyframes electronic-hover {
      20% {
        top: 25px;
        transform: rotate(270deg) scaleX(1.5);
      }

      100% {
        top: -25px;
        letter-spacing: -1px;
        transform: rotate(270deg) scaleX(1);
      }
    }
  }

}

// MAIN
.game-info-container {
  padding-right: 15%;
  border: 1px solid #00ff09;
  // overflow: hidden;
  position: relative;

  .info-section {
    background: linear-gradient(135deg, rgba(42, 3, 3, 0.1) 0%, rgba(177, 76, 74, 0.1) 100%);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid rgba(177, 76, 74, 0.2);

    .section-header {
      margin-bottom: 20px;

      .setting-text {
        color: #b14c4a;
        font-size: 18px;
        text-shadow: 0 0 10px rgba(177, 76, 74, 0.3);
      }
    }
  }



  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: linear-gradient(135deg, rgba(42, 3, 3, 0.8) 0%, rgba(177, 76, 74, 0.8) 100%);
      border-radius: 8px;
      transition: all 0.3s ease;
      border: 1px solid rgba(177, 76, 74, 0.3);

      &:hover {
        transform: translateX(4px);
        background: linear-gradient(135deg, rgba(42, 3, 3, 0.9) 0%, rgba(177, 76, 74, 0.9) 100%);
        box-shadow: 0 4px 12px rgba(177, 76, 74, 0.2);
      }

      .activity-icon {
        font-size: 20px;
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      }

      .activity-content {
        flex: 1;

        .activity-title {
          font-size: 16px;
          color: #fff;
          margin-bottom: 4px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .activity-time {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }


  .block-1 {
    background: white;
    border: 0px;
    border-radius: 0px 60px 20px 0px;
    padding: 20px;
    padding-top: 5%;
    padding-left: 10%;
    padding-right: 3.5%;
    height: 410px;
    overflow: hidden;


    // overflow: hidden;

    .stats-grid {
      display: flex;
      flex-direction: row;
      align-items: end;
      gap: 20px;
    }
  }

  .block-1-right {
    position: absolute;
    height: 600px;
    bottom: -360px;
    right: 0px;
    background: white;
    border-radius: 180px 0px 0px 0px;
    transition: width 0.3s ease, background-color 0.5s ease;
    overflow: hidden;

    .item.setting-text {
      line-height: 33px;
      color: var(--bgLobbyColor);
      font-size: 75px;
      font-weight: 900;
      letter-spacing: -6px;
      transform-origin: 100% 50%;
      text-align: left;
      // width: 450px;
      height: 45px;
      position: absolute;
      top: -230px;
      right: 30px;
      z-index: 10;
      transform: rotate(270deg);
    }
  }

  .block-1-right-2 {
    background: #ff0000;
    height: 170px;
    bottom: -185px;
    position: absolute;
    right: 0px;
    width: 82%;
    border-radius: 18px 0px 0px 15px;
    display: flex;
    align-items: center;
    z-index: 2;
    padding-left: 3%;

    >div {
      margin-left: 2.5%;
    }

    // background color 設定 
    &.bar-visual-novel {
      background: linear-gradient(to right, #f4284a, #9469e3dd);
      opacity: 0.99;
    }

    &.bar-sports {
      background: linear-gradient(to right, #ffac30, #ff7b47dd);
      opacity: 0.99;
    }

    &.bar-music {
      background: #ff79dd;
      background: linear-gradient(to right, #f52b8c, #9469e3dd);
      opacity: 0.99;
    }

    &.bar-adventure {
      background: #71de95;
      background: linear-gradient(to right, #48c96c, rgb(130 207 80 / 87%));
      opacity: 0.99;
    }

    &.bar-simulation {
      background: #4ccae0;
      background: linear-gradient(to right, #2dabff, #9469e3dd);
      opacity: 0.99;
    }
  }


  .block-1-right-main {
    margin-top: 65px;
    position: absolute;
    width: 100%;
    background: #fff;
    min-height: 500px;
    transition: background-color 0.5s ease;

    // 左邊的區域.裝飾
    .item-left-1,
    .item-left-2,
    .item-left-3 {
      position: absolute;
      height: 100%;
    }

    .item-left-1 {
      background: #f22b4e;
      width: 2%;

      &.bar-visual-novel {
        background: #f22b4e;
        opacity: 0.99;
      }

      &.bar-sports {
        background: #ffa333;
        opacity: 0.99;
      }

      &.bar-music {
        background: #f52b8c;
        opacity: 0.99;
      }

      &.bar-adventure {
        background: #48c96c;
        opacity: 0.99;
      }

      &.bar-simulation {
        background: #2dabff;
        opacity: 0.99;
      }

    }

    .video-billboard {
      position: absolute;
      background: #ff0000;
      width: 95%;
      height: 75%;
      left: 3%;
      top: 150px;
      border-radius: 18px 0px 120px 0px;
      transform-origin: center center;
      will-change: transform;
      backface-visibility: hidden;
      perspective: 1000px;

      &.bar-visual-novel {
        background: #f22b4e;
        opacity: 0.99;
      }

      &.bar-sports {
        background: #ffa333;
        opacity: 0.99;
      }

      &.bar-music {
        background: #f52b8c;
        opacity: 0.99;
      }

      &.bar-adventure {
        background: #48c96c;
        opacity: 0.99;
      }

      &.bar-simulation {
        background: #2dabff;
        opacity: 0.99;
      }
    }
  }
}

.block-1-right,
.block-1-right-2,
.block-1-right-main,
.video-billboard {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &.click-transition {
    animation: clickEffect 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@keyframes clickEffect {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>