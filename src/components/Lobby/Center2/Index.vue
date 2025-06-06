<script setup lang="ts">
  import { _uuid2 } from '@/logic/utils/Encrypt'
  import Animation from '@/logic/utils/Animation'
  import BlockDetail from './BlockDetail.vue'
  import GameIcon from '@/components/Lobby/GameIcon.vue'
  import Card from './Card.vue'
  import { reactive, onMounted, onUnmounted } from 'vue'
  import { STATUS, GameStatusType } from './Scripts/config'

  const state = reactive({
    key: _uuid2(),
    isClick: false,
    selected: STATUS.VISUAL_NOVEL as GameStatusType,
    block1RightWidth: '50px',
    scrollY: 0,
    transform: {
      translateY: 0,
      rotate: 0
    }
  })

  const clickListener = (status: GameStatusType) => {
    // 停止自動切換計時器
    init.stopRandomTimer()
    state.isClick = true

    // 添加點擊動畫類
    const elements = [
      '.block-1-right',
      '.block-1-right-2',
      '.block-1-right-main',
      '.video-billboard'
    ]
    elements.forEach(selector => {
      const el = document.querySelector(selector)
      if (el) {
        el.classList.add('click-transition')
        setTimeout(() => {
          el.classList.remove('click-transition')
        }, 500)
      }
    })
    state.selected = status
  }
  const init = {
    timer: null as number | null,
    playRandomSelected() {
      const randomIndex = Math.floor(Math.random() * Object.keys(STATUS).length)
      const randomKey = Object.keys(STATUS)[randomIndex] as keyof typeof STATUS
      state.selected = STATUS[randomKey] as GameStatusType
    },
    startRandomTimer() {
      // 每 5 秒隨機選擇一次
      this.timer = window.setInterval(() => {
        this.playRandomSelected()
      }, 5000)
    },
    stopRandomTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
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
      state.isClick = false

      const rightBarBlocks = ['id-block1-right-bar']
      rightBarBlocks.forEach(block => {
        Animation.addSubClass(block, 'animation-item-intro', 2100)
        Animation.removeSubClass(block, 'animation-item-intro', 3000)
        Animation.addSubClass(block, 'alpha-1', 2900)
      })

      // 啟動隨機選擇計時器
      // this.startRandomTimer()
    }
  }
  const handle = {
    selectedTitle: () => {
      const arr = state.selected.name.toUpperCase().split(' ')
      return arr
    }
  }
  const updateWidth = () => {
    const windowWidth = window.innerWidth
    const width = Math.min(Math.max(windowWidth * 0.15 - 30, 50), 500)
    state.block1RightWidth = `${width}px`
  }
  const handleScroll = () => {
    const el = document.querySelector('.gameLobby')
    if (!el) return
    state.scrollY = el.scrollTop
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    const el = document.querySelector('.gameLobby')
    if (el) el.addEventListener('scroll', handleScroll)

    init.setupHoverEffects()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
    const el = document.querySelector('.gameLobby')
    if (el) el.removeEventListener('scroll', handleScroll)

    // 清除計時器
    init.stopRandomTimer()
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
          <Card
            :index="1"
            :height="330"
            :isActive="state.selected.name === STATUS.VISUAL_NOVEL.name"
            :text="STATUS.VISUAL_NOVEL.name"
            @click="clickListener(STATUS.VISUAL_NOVEL)"
          />
          <!-- 文字冒險 -->
          <Card
            :index="2"
            :height="230"
            :isActive="state.selected.name === STATUS.SPORTS.name"
            :text="STATUS.SPORTS.name"
            @click="clickListener(STATUS.SPORTS)"
          />
          <!-- 角色扮演 -->
          <Card
            :index="3"
            :height="280"
            :isActive="state.selected.name === STATUS.MUSIC.name"
            :text="STATUS.MUSIC.name"
            @click="clickListener(STATUS.MUSIC)"
          />
          <!-- 音樂 -->
          <Card
            :index="4"
            :height="273"
            :isActive="state.selected.name === STATUS.ADVENTURE.name"
            :text="STATUS.ADVENTURE.name"
            @click="clickListener(STATUS.ADVENTURE)"
          />
          <!-- 冒險 -->
          <Card
            :index="5"
            :height="320"
            :isActive="state.selected.name === STATUS.SIMULATION.name"
            :text="STATUS.SIMULATION.name"
            @click="clickListener(STATUS.SIMULATION)"
          />
          <!-- 模擬 -->
        </div>
      </div>

      <div
        :id="`id-block-1-right-${state.key}`"
        :tag="`tag-block-1-right-${state.key}`"
        class="block-1-right"
        :style="{ width: state.block1RightWidth, background: state.selected.color }"
      >
        <div class="item setting-text" tag="title">LIFESTYLE</div>
      </div>
      <!-- BAR.ICON SETTINGS -->
      <div id="id-block1-right-bar" class="block-1-right-2" :class="state.selected.class">
        <GameIcon style="--item-index: 0" />
        <GameIcon style="--item-index: 1" />
        <GameIcon style="--item-index: 2" />
        <GameIcon style="--item-index: 3" />
        <GameIcon style="--item-index: 4" />
        <GameIcon style="--item-index: 5" />
      </div>
      <!-- VIDEO.大的廣告看板 SETTINGS -->
      <div
        class="block-1-right-main"
        :class="state.selected.class"
        :style="{
          background: state.selected.color
        }"
      >
        <div class="item-left-1" :class="state.selected.class"></div>
        <div
          class="video-billboard"
          :class="state.selected.class"
          :style="{
            transform: `translateY(${state.transform.translateY}px) rotate(${state.transform.rotate}deg)`,
            transition: 'transform 0.2s ease-out'
          }"
        >
          <div class="billboard-corner-triangle"></div>
        </div>
      </div>
      <!-- detail -->
      <BlockDetail :selected="state.selected" />
      <div class="block-1-detail" :class="state.selected.class" style="display: none">
        <div class="title">
          <div class="W1">{{ handle.selectedTitle()[0] }}</div>
          <div class="W2" v-if="handle.selectedTitle().length > 1">
            {{ handle.selectedTitle()[1] }}
          </div>
        </div>
        <div
          v-if="
            [
              STATUS.VISUAL_NOVEL.name,
              STATUS.SPORTS.name,
              STATUS.MUSIC.name,
              STATUS.ADVENTURE.name,
              STATUS.SIMULATION.name
            ].includes(state.selected.name)
          "
          class="main"
        >
          <div class="left">
            <ul>
              <li>文字界面</li>
              <li>玩家互動</li>
              <li>探索解謎</li>
              <li>高自由度</li>
              <li>具想像力</li>
            </ul>
          </div>
          <div class="center">
            <p>
              Text-based Adventure is an interactive game type that uses text as the main interface
              and content. Players interact with the game world, explore the story, solve puzzles,
              or advance the plot by reading the narrative and entering commands or selecting
              options. This type of game can be said to be one of the earliest narrative interactive
              forms in the history of digital games, combining elements of novels, role-playing, and
              puzzle solving.
            </p>

            <!-- <p>
              This type of game emphasizes immersion, imagination, and choice. It is not only a
              pioneering form of game, but also an important source of inspiration for the
              development of narrative games today. Whether you are a player, creator, or narrative
              lover, text adventure is a classic path worth trying.
            </p> -->
          </div>
          <div class="right">
            <div class="light"></div>
            <div class="light2"></div>
          </div>
        </div>
        <div class="footer"></div>
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
          top: 0px;
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
      transition:
        width 0.3s ease,
        background-color 0.5s ease;
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

      > div {
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
        left: 1.3%;
        top: 151px;
        border-radius: 18px 0px 120px 0px;
        transform-origin: center center;
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000px;
        overflow: hidden;
        .billboard-corner-triangle {
          position: absolute;
          top: 10%;
          right: 20%;
          width: 0;
          height: 0;
          border-top: 700px solid #ffffff14; /* 三角形顏色 */
          border-left: 700px solid transparent;
          transform: rotate(50deg);
          z-index: 1;
        }

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
    }
  }

  .block-1-detail {
    margin-top: 590px;
    position: absolute;
    width: 100%;

    .title {
      text-align: left;
      color: #000;
      margin-left: -5px;
      font-size: 75px;
      font-weight: 900;
      .W1,
      .W2 {
        line-height: 52px;
      }
    }
    .main {
      width: 100%;
      // border: 1px solid red;
      display: flex;
      justify-content: space-between;
      height: 350px;

      .left {
        // margin-top: 10px;
        position: absolute;
        width: 20%;
        height: 370px;
        background: #e6e0e0;
        border-bottom: 20px solid #fff;
        border-radius: 0px 0px 120px 0px;

        display: flex;
        justify-content: end;
        align-items: end;
        color: #604848;
        ul {
          margin-right: 30px;
          margin-bottom: 70px;
          li {
            text-align: right;
          }
        }
      }
      .center {
        width: 35%;
        min-height: 30%;
        height: auto;
        border: 2px solid #000;
        position: absolute;
        transform: translate(61.5%, 7%);

        padding: 15px;
        text-align: left;
        color: #000;
      }
      .right {
        position: absolute;
        overflow: hidden;
        width: 42%;
        height: 105%;
        right: 0;
        bottom: -50px;
        background: #e6e0e0;
        border-top: 30px solid #ccc;
        border-left: 15px solid #ccc;
        border-bottom: 5px solid #ccc;
        border-radius: 30px 0 0 0;
        .light {
          width: 50%;
          height: 30px;
          position: absolute;
          background: #ffffff6e;
          transform: rotate(-45deg);
          top: 0px;
          left: -90px;
        }
        .light2 {
          width: 70%;
          height: 60px;
          position: absolute;
          background: #ffffff6e;
          transform: rotate(-45deg);
          top: 20px;
          left: -90px;
        }
      }
    }
    .footer {
      // margin-top: 10px;
      // background: #fff;
      // height: 40px;
      // border-bottom: 10px solid #ccc;
    }

    &.bar-visual-novel {
      .title {
        color: #f22b4e;
      }
      .main {
        .center {
          border-color: #f22b4e;
        }
      }
    }

    &.bar-sports {
      .title {
        color: #ffa333;
      }
      .main {
        .center {
          border-color: #ffa333;
        }
      }
      // background: #ffa333;
      // opacity: 0.99;
    }

    &.bar-music {
      .title {
        color: #f52b8c;
      }
      .main {
        .center {
          border-color: #f52b8c;
        }
      }
      // background: #f52b8c;
      // opacity: 0.99;
    }

    &.bar-adventure {
      .title {
        color: #48c96c;
      }
      .main {
        .center {
          border-color: #48c96c;
        }
      }
      // background: #48c96c;
      // opacity: 0.99;
    }

    &.bar-simulation {
      .title {
        color: #2dabff;
      }
      .main {
        .center {
          border-color: #2dabff;
        }
      }
      // background: #2dabff;
      // opacity: 0.99;
    }
  }
</style>
