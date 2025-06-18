<script setup lang="ts">
  import { STATUS, GameStatusType } from './Scripts/config'
  import GameVisualNovel from './GameSample/VisualNovel.vue'
  import GameSport from './GameSample/Sport.vue'
  import GameMusic from './GameSample/Music.vue'
  import GameSimulation from './GameSample/Simulation.vue'
  import Tools from '@/logic/utils/Tools'

  const props = defineProps<{
    selected: GameStatusType
  }>()

  const IDS = {
    BLOCK_1_DETAIL: 'id-block1-detail'
  }

  const handle = {
    selectedTitle: () => {
      const title = props.selected.name
      return title.toLocaleUpperCase().split(' ')
    }
  }

  const actions = {
    scrollAnim: {
      isBlock1Show: false,
      isBlock1Hide: false
    },
    base: () => {
      const parent = $(`#${IDS.BLOCK_1_DETAIL}`)
      const title = parent.find('.title')
      const w1 = parent.find('.W1')
      const w2 = parent.find('.W2')
      const main = parent.find('.main')
      const left = main.find('.left')
      const center = main.find('.center')
      const right = main.find('.right')
      return {
        parent,
        title,
        w1,
        w2,
        main,
        left,
        center,
        right
      }
    },
    titleShow: (cb: Function) => {
      const { title, w1, w2, left, center, right } = actions.base()
      if (title) title.addClass('anim-title-move')
      if (w1) w1.addClass('anim-title-show1')
      if (w2) w2.addClass('anim-title-show2')
      Tools.delay(500).then(() => {
        if (left) left.addClass('anim-left-show')
        if (center) {
          center.children('p').each(function (this: HTMLElement, index: number) {
            setTimeout(() => {
              $(this).addClass('anim-p-show')
            }, index * 300)
          })
          center.children('.block').each(function (this: HTMLElement, index: number) {
            setTimeout(() => {
              $(this).find('p').addClass('anim-p-show')
            }, index * 300)
          })
        }
        if (right) right.addClass('anim-right-show')
        Tools.delay(1000).then(() => {
          if (cb) cb?.()
        })
      })
    },
    titleHide: (cb: Function) => {
      const { main, title, w1, w2, left, center, right } = actions.base()
      if (main) main.addClass('anim-main-hide')
      if (title) title.addClass('anim-main-hide')
      // __init.anim__
      Tools.delay(1000).then(() => {
        if (main) main.removeClass(['anim-main-hide'])
        if (title) title.removeClass(['anim-main-hide', 'anim-title-move'])
        if (w1) w1.removeClass('anim-title-show1')
        if (w2) w2.removeClass('anim-title-show2')
        if (left) left.removeClass('anim-left-show')
        if (center)
          center.children('p').each(function (this: HTMLElement, index: number) {
            setTimeout(() => {
              $(this).removeClass('anim-p-show')
            }, index * 300)
          })
        center.children('.block').each(function (this: HTMLElement, index: number) {
          setTimeout(() => {
            $(this).find('p').removeClass('anim-p-show')
          }, index * 300)
        })
        if (right) right.removeClass('anim-right-show')
        if (cb) cb?.()
      })
    }
  }
  defineExpose({
    actions
  })
</script>

<template>
  <div id="id-block1-detail" class="block-1-detail anim-init" :class="selected.class">
    <div class="title">
      <div class="W1">{{ handle.selectedTitle()[0] }}</div>
      <div class="W2" v-if="handle.selectedTitle().length > 1">
        {{ handle.selectedTitle()[1] }}
      </div>
    </div>
    <!-- 文字冒險遊戲 -->
    <div v-if="[STATUS.VISUAL_NOVEL.name].includes(selected.name)" class="main">
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
          Text-based Adventure is an interactive game type that uses text as the main interface and
          content. Players interact with the game world, explore the story, solve puzzles, or
          advance the plot by reading the narrative and entering commands or selecting options. This
          type of game can be said to be one of the earliest narrative interactive forms in the
          history of digital games, combining elements of novels, role-playing, and puzzle solving.
        </p>

        <div class="center-hover">
          This type of game emphasizes immersion, imagination, and choice, and is also an important
          source of inspiration for the development of narrative games. Whether you are a player,
          creator, or narrative lover, text adventure is a classic path worth trying.
        </div>
      </div>
      <div class="right">
        <div class="light"></div>
        <div class="light2"></div>
        <GameVisualNovel />
      </div>
    </div>
    <!-- 運動 -->
    <div v-else-if="selected.name === STATUS.SPORTS.name" class="main">
      <div class="left">
        <ul>
          <li>競技策略</li>
          <li>戰術組合</li>
          <li>模擬情境</li>
        </ul>
      </div>
      <div class="center">
        <p>
          A classic game type that combines competition, realism and entertainment, satisfying the
          passion for various sports and providing players of all kinds with the opportunity to
          unleash their sportsmanship and strategic wisdom in the virtual world.
        </p>

        <div class="center-hover">
          This type of game emphasizes immersion, imagination, and choice, and is also an important
          source of inspiration for the development of narrative games. Whether you are a player,
          creator, or narrative lover, text adventure is a classic path worth trying.
        </div>
      </div>
      <div class="right">
        <GameSport />
      </div>
    </div>
    <!-- 節奏 -->
    <div v-else-if="selected.name === STATUS.MUSIC.name" class="main">
      <div class="left">
        <ul>
          <li>操作簡單</li>
          <li>各種曲風</li>
          <li>節奏對應</li>
        </ul>
      </div>
      <div class="center">
        <p>
          According to the rhythm, melody and beat of the music, you can operate at the right time
          to get points or advance the plot. This kind of game combines vision, hearing and action
          response, which is a perfect combination of music and interactive entertainment.
        </p>

        <!-- <div class="center-hover">
          This type of game emphasizes immersion, imagination, and choice, and is also an important
          source of inspiration for the development of narrative games. Whether you are a player,
          creator, or narrative lover, text adventure is a classic path worth trying.
        </div> -->
      </div>
      <div class="right">
        <!-- <div class="light"></div>
        <div class="light2"></div> -->
        <GameMusic />
      </div>
    </div>
    <!-- 冒險 -->
    <div v-else-if="selected.name === STATUS.ADVENTURE.name" class="main">
      <div class="left">
        <ul>
          <li>故事劇情</li>
          <li>探索解謎</li>
          <li>角色互動</li>
        </ul>
      </div>

      <div class="center">
        <div class="block">
          <p>
            Text-based Adventure is an interactive game type that uses text as the main interface
            and content. Players interact with the game world, explore the story, solve puzzles, or
            advance the plot by reading the narrative and entering commands or selecting options.
            This type of game can be said to be one of the earliest narrative interactive forms in
            the history of digital games, combining elements of novels, role-playing, and puzzle
            solving.
          </p>
        </div>
        <div class="block">
          <p>
            The game is based on logical reasoning, spatial thinking, mechanical manipulation, and
            environmental observation. Players need to solve various puzzles while exploring the
            world to advance the plot or unlock new scenes. This type of game combines intellectual
            challenges with narrative elements, and often tests players' patience and creativity.
          </p>
        </div>
        <div class="block">
          <p>
            The game is centered around creating a tense atmosphere, psychological pressure, and
            fear of the unknown, and allows players to immerse themselves in the game through
            limited resources, survival elements, and plot scares. It usually includes elements such
            as exploration, puzzle solving, stealth, or escape. Some games include combat, and some
            games have no ability to fight back.
          </p>
        </div>
        <div class="block">
          <p>
            Horizontal adventures are horizontal games played in 2D or pseudo-2.5D perspectives,
            where players explore levels from left to right, which may include platform jumping,
            puzzle solving, plot interaction, and combat. Many titles emphasize art style and
            narrative, and may also incorporate Metroidvania or Roguelike elements.
          </p>
        </div>
      </div>
      <!-- <div class="right">
        <div class="light"></div>
        <div class="light2"></div>
      </div> -->
    </div>
    <!-- 模擬 -->
    <div v-else-if="selected.name === STATUS.SIMULATION.name" class="main">
      <div class="left">
        <ul>
          <li>高自由度</li>
          <li>策略耐心</li>
          <li>過程導向</li>
        </ul>
      </div>
      <div class="center">
        <p>
          This type of game simulates the operation process of a real or fictional system, allowing
          players to play the role of controller or participant and experience an operation mode
          similar to the real world. This type of game focuses on details, process and strategy, and
          does not necessarily emphasize winning or losing, but emphasizes management, control, and
          simulation experience.
        </p>

        <!-- <div class="shark"></div> -->

        <div class="center-hover">
          Simulation is a deep, varied, educational and creative game type. Whether you want to be
          an architect, an airbus captain, a mayor, a farmer or a doctor, you can achieve it through
          simulation games. This type of game is suitable for players who like to control details,
          pursue high simulation or systematic gameplay, or those who want to play slowly and manage
          slowly.
        </div>
      </div>
      <div class="right">
        <GameSimulation />
      </div>
    </div>
    <!-- DEFAULT -->
    <div v-else class="main">
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
          Text-based Adventure is an interactive game type that uses text as the main interface and
          content. Players interact with the game world, explore the story, solve puzzles, or
          advance the plot by reading the narrative and entering commands or selecting options. This
          type of game can be said to be one of the earliest narrative interactive forms in the
          history of digital games, combining elements of novels, role-playing, and puzzle solving.
        </p>

        <div class="center-hover">
          This type of game emphasizes immersion, imagination, and choice, and is also an important
          source of inspiration for the development of narrative games. Whether you are a player,
          creator, or narrative lover, text adventure is a classic path worth trying.
        </div>
      </div>
      <div class="right">
        <div class="light"></div>
        <div class="light2"></div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<style lang="scss" scoped>
  .block-1-detail {
    margin-top: 590px;
    position: absolute;
    width: 100%;

    &:hover {
      // transform: translateY(-5px);
      // box-shadow: 10px 10px 0px rgba(0, 0, 0, 1);
    }
    .title {
      position: relative;
      text-align: left;
      color: #000;
      margin-left: -5px;
      font-size: 75px;
      font-weight: 900;
      z-index: 30;
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
        transform-origin: 50% top;
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
        min-width: 475px;
        min-height: 30%;
        height: auto;
        border: 2px solid #000;
        position: absolute;
        transform: translate(61.5%, 7%);
        // transform-origin: 50% 50%;

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

    &.bar-visual-novel {
      .title {
        color: #f22b4e;
      }
      .main {
        .center {
          min-width: 475px;
          min-height: 225px;
          border-color: #f22b4e;
          transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

          &:hover {
            box-shadow: 0px 135px 0px #f22b4e7a;
          }

          .center-hover {
            width: 100%;
            position: absolute;
            top: 230px;
            left: 0px;
            padding: 15px;
            padding-top: 0px;
            padding-bottom: 0px;
            color: #ffeaea;
          }
        }
        .right {
          .light,
          .light2 {
            z-index: 5;
            opacity: 0.2;
          }
        }
      }
    }
    &.bar-sports {
      .title {
        color: #ffa333;
      }
      .main {
        .left {
          top: 54px;
        }
        .center {
          width: 475px;
          min-height: 130px;
          border-color: #ffa333;
          transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

          &:hover {
            box-shadow: 475px 0px 0px #ffa333;
          }

          .center-hover {
            width: 100%;
            position: absolute;
            top: 15px;
            left: 475px;
            padding: 15px;
            padding-top: 0px;
            padding-bottom: 0px;
            color: #ffeaea;
          }
        }
        .right {
          width: 75%;
          height: 55%;
          bottom: -60px;
          border-top: 1px;
          border-radius: 0;
          border-radius: 0 0 0px 10px;
          background: #ffedc3;
          border-color: #ffa333;
          overflow: unset;
        }
      }
      // background: #ffa333;
      // opacity: 0.99;
    }
    &.bar-music {
      .title {
        position: relative;
        color: #f52b8c;
        z-index: 2;
      }
      .main {
        .left {
          z-index: 1;
          box-shadow: 0px 2px 10px #99888833;
        }
        .center {
          top: 10px;
          border-color: #f52b8c;
          width: 50%;

          display: flex;
          align-items: center;
        }
        .right {
          width: 78%;
          height: 65%;
          bottom: -65px;

          overflow: unset;
          background: unset;
          border-top: unset;
          border-left: unset;
          border-bottom: unset;
          border-radius: unset;
        }
      }
    }
    &.bar-adventure {
      .title {
        color: #48c96c;
      }
      .main {
        .center {
          display: flex;
          border: unset;
          width: 75%;
          transform: translate(29%, -9%);

          .block {
            width: unset;
            margin-right: 2%;
            border: 2px solid #48c96c;
            padding: 10px;
            font-weight: 900;
            flex: 1.5;

            &:nth-child(2) {
              flex: 1.2;
              border: 4px solid #30c55a;
              font-weight: 800;
              position: relative;
              top: 10px;
            }
            &:nth-child(3) {
              flex: 1.4;
              border: 6px solid #47af48;
              font-weight: 700;
              position: relative;
              top: -30px;
            }
            &:nth-child(4) {
              flex: 1.5;
              border: 8px solid #48c98d;
              font-weight: 600;
              position: relative;
              top: 15px;
            }
            &:last-child {
              margin-right: unset;
            }
          }
        }
      }
      // background: #48c96c;
      // opacity: 0.99;
    }
    &.bar-simulation {
      .title {
        position: relative;
        z-index: 1;
        color: #2dabff;
      }
      .main {
        .center {
          border-color: #2dabff;
          border: unset;
          p {
            border: 4px solid #2dabff;
            padding: 10px;
            margin-bottom: 10px;
          }
          .center-hover {
            color: #fff;
            background: #51c8ef;
            padding: 10px;
          }
        }
        .right {
          overflow: unset;
          border-top: 5px solid #ccc;
          border-bottom: 30px solid #ccc;
          border-radius: 0 0 0 30px;
        }
      }
      // background: #2dabff;
      // opacity: 0.99;
    }
  }

  .block-1-detail.anim-init {
    .title {
      margin-left: 200px;
      .W1 {
        letter-spacing: 50px;
        transform: skewX(50deg);
        opacity: 0.05;
      }
      .W2 {
        letter-spacing: 50px;
        transform: skewX(-50deg);
        opacity: 0.05;
      }
    }
    .main {
      .left {
        transform: scaleY(0);
      }
      .center {
        p {
          transform: skewX(40deg) rotate(165deg);
          opacity: 0.05;
        }
      }
      .right {
        transform: scale(0);
      }
    }
  }

  // __ANIM.SETTINGS__
  .anim-title-move {
    animation: title-move-a01;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
    @keyframes title-move-a01 {
      80% {
        margin-left: -20px;
      }
      100% {
        margin-left: -5px;
      }
    }
  }
  .anim-title-show1 {
    animation: title-a01;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
    @keyframes title-a01 {
      80% {
        transform: skewX(-60deg);
      }
      100% {
        letter-spacing: -7px;
        transform: skewX(0deg);
        opacity: 1;
      }
    }
  }
  .anim-title-show2 {
    animation: title-a02;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
    @keyframes title-a02 {
      80% {
        transform: skewX(60deg);
      }
      100% {
        letter-spacing: -7px;
        transform: skewX(0deg);
        opacity: 1;
      }
    }
  }

  .anim-left-show {
    animation: left-show-a01;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
    @keyframes left-show-a01 {
      80% {
        transform: scaleY(1.5);
      }
      100% {
        transform: scaleY(1);
      }
    }
  }
  .anim-p-show {
    animation: p-show-a01;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
    @keyframes p-show-a01 {
      100% {
        transform: skewX(0deg) rotate(0deg);
        opacity: 1;
      }
    }
  }
  .anim-right-show {
    animation: right-show-a01;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
    @keyframes right-show-a01 {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      20% {
        transform: scale(1.2);
      }
      40% {
        transform: scale(0.89);
      }
      60% {
        transform: scale(1.04);
      }
      80% {
        transform: scale(0.98);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  .anim-main-hide {
    animation: main-hide-a01;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    @keyframes main-hide-a01 {
      100% {
        opacity: 0;
      }
    }
  }
</style>
