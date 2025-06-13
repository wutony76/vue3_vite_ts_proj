<script setup lang="ts">
  import { reactive, onMounted, onUnmounted, computed } from 'vue'
  import { _uuid2 } from '@/logic/utils/Encrypt'
  import Animation from '@/logic/utils/Animation'
  import BlockDetail from './BlockDetail.vue'
  import GameIcon from '@/components/Lobby/GameIcon.vue'
  import Card from './Card.vue'
  // import BubbleMachine from '@/components/SelfIcon/BubbleMachine.vue'
  import { STATUS_ICON } from '@/logic/utils/Parameter'
  import { STATUS, GameStatusType } from './Scripts/config'
  import Tools from '@/logic/utils/Tools'
  import SampleCave from '@/assets/images/game_cave.png'
  // import Cave from '@/components/SelfIcon/Cave.vue'

  interface IntroduceItem {
    title: string
    img: {
      background: string
      note: string
    }
    content: string[]
    note: string
  }

  const state = reactive({
    key: _uuid2(),
    isClick: false,
    selected: STATUS.VISUAL_NOVEL as GameStatusType,
    selectedIntroduce: 0,

    block1RightWidth: '50px',
    scrollY: 0,
    transform: {
      translateY: 0,
      rotate: 0
    },
    main: {
      [STATUS.VISUAL_NOVEL.name]: {
        title: '純文字冒險',
        content: [
          '只以文字作主要介面和遊戲內容。用閱讀敘事，輸入指示或選擇選項來與遊戲世界互動，探索故事、解謎或推進劇情。主題內容更是多樣，再融合了小說、角色扮演和解謎，更是大大的增加既有的遊戲性、自由度，深深地吸引著自由度與喜歡自己想像的玩家們。玩起來彷彿自己親身經歷了一段故事。'
        ],
        introduce: [
          {
            title: '巨洞冒險',
            img: {
              background: SampleCave,
              note: '巨洞冒險-畫面參考'
            },
            content: [
              '由於當時電腦性能限制，此遊戲沒有圖像、音樂及音效，只有純粹的文字。有如閱讀小說，玩家須閱讀畫面出現的文章，並輸入關鍵字以進行遊戲。',
              '玩法類似《龍與地下城》，不過是由電腦擔任地下城主（即遊戲管理者）的角色。電腦會以文字敘述遊戲的背景、玩家遭遇的事件、敵人、物品之類事物。',
              '玩家輸入「看」（look）的指令，電腦會敘述遊戲中玩家所在位置的背景。輸入「拿取」（take），則可拿取物品。輸入「往西走」（go west），玩家就會在遊戲中的虛擬世界中往西方前進。遊戲背景為玩家一開始位於被森林包圍的紅磚建築旁，並進入一處神秘的洞穴探險，玩家會在途中與敵人進行戰鬥，並試圖取得隱藏的寶藏。'
            ],
            note: '資料來源: wiki.巨洞冒險'
          }
        ]
      },
      [STATUS.SPORTS.name]: {
        title: 'SPORTS',
        content: []
      },
      [STATUS.MUSIC.name]: {
        title: 'MUSIC',
        content: []
      },
      [STATUS.ADVENTURE.name]: {
        title: 'ADVENTURE',
        content: []
      },
      [STATUS.SIMULATION.name]: {
        title: 'SIMULATION',
        content: []
      }
    }
  })
  const IDS = {
    BLOCK_1: 'id-center2-block-1',
    BLOCK_1_BTN_GROUP: 'id-block1-grid',
    BLOCK_1_RIGHT: `id-block-1-right-${state.key}`,
    BLOCK_1_RIGHT_BAR: 'id-block1-right-bar',
    BLOCK_1_RIGHT_MAIN: 'id-block1-right-main',
    BLOCK_1_VIDEO_BILLBOARD: 'id-video-billboard'
  }

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
          // console.log('selector', selector)

          if (['.block-1-right-2'].includes(selector))
            Animation.addClass(IDS.BLOCK_1_RIGHT_BAR, 'scale1', 10)

          if (['.block-1-right-main'].includes(selector))
            Animation.addClass(IDS.BLOCK_1_RIGHT_MAIN, 'animation-block-left', 10)

          if (['.video-billboard'].includes(selector))
            Animation.addClass(IDS.BLOCK_1_VIDEO_BILLBOARD, 'click-transition', 10)
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
      // const rightBarBlocks = ['id-block1-right-bar']
      // rightBarBlocks.forEach(block => {
      //   Animation.addSubClass(block, 'animation-item-intro', 2100)
      //   Animation.removeSubClass(block, 'animation-item-intro', 3000)
      //   Animation.addSubClass(block, 'alpha-1', 2900)
      // })

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
  const currIntroduce = computed<IntroduceItem>(() => {
    return (
      state.main[state.selected.name]?.introduce?.[state.selectedIntroduce] ?? {
        title: 'TEST',
        img: { background: '', note: 'NOTE.TEST' },
        content: [],
        note: 'NOTE.TEST'
      }
    )
  })

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

  const actions = {
    scrollAnim: {
      isBlock1Show: false,
      isBlock1Hide: false,
      isBlock1BarShow: false,
      isBlock1BarHide: false,
      isBlock1MainShow: false,
      isBlock1MainHide: false
    },
    idBlock1Show: () => {
      // console.log('CENTER2.run.idBlock1Show', actions.scrollAnim.isBlock1Show)
      let _a = actions.scrollAnim
      if (_a.isBlock1Show) return
      _a.isBlock1Show = true

      const blocks = [IDS.BLOCK_1_BTN_GROUP]
      Animation.removeClass(IDS.BLOCK_1, 'anim-banner-out')
      blocks.forEach(block => {
        Animation.removeSubClass(block, 'alpha-1', 10)
      })
      Animation.addClass(IDS.BLOCK_1, 'animation-block-right', 50)

      Tools.delay(450).then(() => {
        _a.isBlock1Hide = false
        blocks.forEach(block => {
          Animation.addSubClass(block, 'animation-item-up', 500)
          Animation.removeSubClass(block, 'animation-item-up', 2300)
          Animation.addSubClass(block, 'alpha-1', 2300)
        })
      })
    },
    idBlock1Hide: () => {
      // console.log('CENTER2.run.idBlock1Hide')
      let _a = actions.scrollAnim
      if (_a.isBlock1Hide) return
      _a.isBlock1Hide = true

      Animation.addClass(IDS.BLOCK_1, 'anim-banner-out', 10)
      const blocks = [IDS.BLOCK_1_BTN_GROUP]
      blocks.forEach(block => {
        Animation.removeSubClass(block, 'alpha-1', 50)
      })
      Tools.delay(450).then(() => {
        Animation.removeClass(IDS.BLOCK_1, 'animation-block-right')
        _a.isBlock1Show = false
      })
    },

    idBlock1BarShow: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1BarShow) return
      _a.isBlock1BarShow = true

      Animation.removeClass(IDS.BLOCK_1_RIGHT_BAR, 'anim-gameBlock1-out')
      Animation.addClass(IDS.BLOCK_1_RIGHT_BAR, 'animation-block-left', 100)

      const blocks = [IDS.BLOCK_1_RIGHT_BAR]
      blocks.forEach(block => {
        Animation.removeSubClass(block, 'alpha-1', 500)
      })

      Tools.delay(450).then(() => {
        _a.isBlock1BarHide = false

        blocks.forEach(block => {
          Animation.addSubClass(block, 'animation-item-intro', 10)
          Animation.removeSubClass(block, 'animation-item-intro', 900)
          Animation.addSubClass(block, 'alpha-1', 800)
        })
      })

      Tools.delay(700).then(() => {
        Animation.removeClass(IDS.BLOCK_1_RIGHT, 'anim-gameBlock1-out')
        Animation.addClass(IDS.BLOCK_1_RIGHT, 'click-transition', 50)
        // Animation.addClass(IDS.BLOCK_1_RIGHT, 'anim-gameBlock1-out', 50)
      })
    },
    idBlock1BarHide: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1BarHide) return
      _a.isBlock1BarHide = true

      const blocks = [IDS.BLOCK_1_RIGHT_BAR]
      blocks.forEach(block => {
        Animation.addSubClass(block, 'anim-icon-out', 10)
        Animation.removeSubClass(block, 'anim-icon-out', 1100)
        Animation.removeSubClass(block, 'alpha-1', 1100)
      })

      Tools.delay(1000).then(() => {
        Animation.removeClass(IDS.BLOCK_1_RIGHT_BAR, 'animation-block-left')
        Animation.removeClass(IDS.BLOCK_1_RIGHT_BAR, 'scale1')
        Animation.addClass(IDS.BLOCK_1_RIGHT_BAR, 'anim-gameBlock1-out', 50)
        Tools.delay(450).then(() => {
          _a.isBlock1BarShow = false
        })
      })

      Tools.delay(1300).then(() => {
        Animation.removeClass(IDS.BLOCK_1_RIGHT, 'click-transition')
        Animation.addClass(IDS.BLOCK_1_RIGHT, 'anim-gameBlock1-out', 50)
      })
    },

    idBlock1MainShow: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1MainShow) return
      _a.isBlock1MainShow = true

      Animation.addClass(IDS.BLOCK_1_RIGHT_MAIN, 'animation-block-left', 100)
      Tools.delay(1300).then(() => {
        Animation.addClass(IDS.BLOCK_1_VIDEO_BILLBOARD, 'click-transition', 100)
        _a.isBlock1MainHide = false
      })
    },
    idBlock1MainHide: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1MainHide) return
      _a.isBlock1MainHide = true

      Animation.removeClass(IDS.BLOCK_1_RIGHT_MAIN, 'animation-block-left')
      Animation.removeClass(IDS.BLOCK_1_VIDEO_BILLBOARD, 'click-transition')
      _a.isBlock1MainShow = false
    }
  }
  defineExpose({
    test: () => console.log('CENTER2.test'),
    actions
  })
</script>

<template>
  <div class="center2" :class="`center-${state.key}`">
    <div class="game-info-container">
      <div id="id-center2-block-1" class="block-1">
        <div class="section-header">
          <span class="item setting-text"></span>
        </div>
        <div id="id-block1-grid" class="stats-grid">
          <!-- 文字冒險 game-icon 用來設定動畫 -->
          <Card
            class="game-icon"
            :index="1"
            :height="430"
            :isActive="state.selected.name === STATUS.VISUAL_NOVEL.name"
            :text="STATUS.VISUAL_NOVEL.name"
            @click="clickListener(STATUS.VISUAL_NOVEL)"
            style="--item-index: 0"
          />
          <!-- 角色扮演 -->
          <Card
            class="game-icon"
            :index="2"
            :height="330"
            :isActive="state.selected.name === STATUS.SPORTS.name"
            :text="STATUS.SPORTS.name"
            @click="clickListener(STATUS.SPORTS)"
            style="--item-index: 1"
          />
          <!-- 音樂 -->
          <Card
            class="game-icon"
            :index="3"
            :height="380"
            :isActive="state.selected.name === STATUS.MUSIC.name"
            :text="STATUS.MUSIC.name"
            @click="clickListener(STATUS.MUSIC)"
            style="--item-index: 2"
          />
          <!-- 冒險 -->
          <Card
            class="game-icon"
            :index="4"
            :height="273"
            :isActive="state.selected.name === STATUS.ADVENTURE.name"
            :text="STATUS.ADVENTURE.name"
            @click="clickListener(STATUS.ADVENTURE)"
            style="--item-index: 3"
          />
          <!-- 模擬 -->
          <Card
            class="game-icon"
            :index="5"
            :height="420"
            :isActive="state.selected.name === STATUS.SIMULATION.name"
            :text="STATUS.SIMULATION.name"
            @click="clickListener(STATUS.SIMULATION)"
            style="--item-index: 4"
          />
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
      <!-- <BubbleMachine /> -->
      <!-- BAR.ICON SETTINGS -->
      <div id="id-block1-right-bar" class="block-1-right-2" :class="state.selected.class">
        <GameIcon
          style="--item-index: 0"
          :title="'CAVE'"
          :status="STATUS_ICON.CAVE"
          :selectedTag="0"
          v-model="state.selectedTag"
        />
        <GameIcon style="--item-index: 1" />
        <GameIcon style="--item-index: 2" />
        <GameIcon style="--item-index: 3" />
        <GameIcon style="--item-index: 4" />
        <GameIcon style="--item-index: 5" />
      </div>
      <!-- VIDEO.大的廣告看板 SETTINGS -->
      <div
        id="id-block1-right-main"
        class="block-1-right-main"
        :class="state.selected.class"
        :style="{
          background: state.selected.color
        }"
      >
        <div class="item-left-1" :class="state.selected.class"></div>
        <div
          id="id-video-billboard"
          class="video-billboard"
          :class="state.selected.class"
          :style="{
            transform: `translateY(${state.transform.translateY}px) rotate(${state.transform.rotate}deg)`,
            transition: 'transform 0.2s ease-out'
          }"
        >
          <div class="title">{{ state.main[state.selected.name].title }}</div>
          <div class="content">
            <div class="left">
              <p v-for="(text, index) in state.main[state.selected.name].content" :key="index">
                {{ text }}
              </p>
            </div>
            <div class="right">
              <div class="title">{{ currIntroduce.title }}</div>
              <div class="content-img">
                <div class="img-1">
                  <img :src="currIntroduce.img.background" />
                  <div class="note">{{ currIntroduce.img.note }}</div>
                </div>
              </div>
              <div class="content-text">
                <p v-for="(text, index) in currIntroduce.content" :key="index">{{ text }}</p>
                <div class="auto"></div>
                <div class="note">{{ currIntroduce.note }}</div>
              </div>
            </div>
          </div>
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
    min-height: 1510px;
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

      transform: scaleX(0);
      position: relative;
      transform-origin: left 50%;
      .section-header {
        height: 24px;
      }
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

      transform-origin: right 50%;
      transform: scaleX(0);

      transition: all 0.3s cubic-bezier(0.165, 0.44, 0.64, 1);

      > div {
        margin-left: 2.5%;
      }

      &.scale1 {
        animation-name: scale-anim-a01;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
        // transform: scaleX(1);

        @keyframes scale-anim-a01 {
          0% {
            transform: scaleX(0);
          }
          // 50% { transform: scaleX(0.2);}
          60% {
            transform: scaleX(1.5);
          }
          70% {
            transform: scaleX(0.89);
          }
          80% {
            transform: scaleX(1.5);
          }
          90% {
            transform: scaleX(0.98);
          }
          100% {
            transform: scaleX(1);
          }
        }
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

      transform-origin: left 50%;
      transform: scaleX(0);

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
        // overflow: hidden;
        opacity: 0;

        .title {
          position: absolute;
          left: 10px;
          top: -40px;
          font-size: 50px;
          font-weight: 900;
          letter-spacing: -10px;
        }
        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;

          .left {
            width: 30%;
            height: 100%;
            display: flex;
            align-items: end;

            p {
              padding: 10px;
              text-align: left;
              font-weight: 500;
            }
          }
          .right {
            flex: 1;
            height: 100%;
            display: flex;
            // align-items: center;
            .title {
              position: absolute;
              transform-origin: 0 0;
              transform: rotate(90deg);
              left: unset;
              right: -195px;
              top: -3px;

              font-size: 50px;
              font-weight: 900;
              letter-spacing: -5px;
              color: #202020;
            }
            .content-img {
              width: 50%;
              padding: 10px;
              .img-1 {
                position: relative;
                width: 100%;
                height: 100%;
                border: 1px solid #fff;
                background: #f22b4e;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
                .note {
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  background-color: #202020;
                  color: #fff;
                  padding-left: 2px;
                  padding-right: 2px;

                  font-size: 11px;
                  font-weight: 500;
                }
              }
            }
            .content-text {
              width: calc(50% - 100px);
              padding-top: 20px;
              padding-bottom: 10px;

              display: flex;
              flex-direction: column;
              margin-left: 2%;

              font-weight: 500;
              color: #202020;
              font-size: 14px;
              font-weight: 500;

              p {
                text-align: left;
                margin-bottom: 10px;
                border-left: 1px solid #202020;
                padding-left: 10px;
              }
              .auto {
                flex: 1;
              }
              .note {
                text-align: right;
                font-size: 11px;
                font-weight: 500;
                margin-right: 7%;
              }
            }
          }
        }

        &.bar-visual-novel {
          background: #f22b4e;
          .title {
            color: #f22b4e;
          }
          // opacity: 0.99;
        }
        &.bar-sports {
          background: #ffa333;
          // opacity: 0.99;
        }
        &.bar-music {
          background: #f52b8c;
          // opacity: 0.99;
        }
        &.bar-adventure {
          background: #48c96c;
          // opacity: 0.99;
        }
        &.bar-simulation {
          background: #2dabff;
          // opacity: 0.99;
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
      animation-fill-mode: forwards;
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
    // &.scale1 {
    //   animation-name: scale-anim-a01;
    //   animation-duration: 0.2s;
    //   animation-fill-mode: forwards;
    //   animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
    // }
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
