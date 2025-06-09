<template>
  <div class="block-1-detail" :class="selected.class">
    <div class="title">
      <div class="W1">{{ handle.selectedTitle()[0] }}</div>
      <div class="W2" v-if="handle.selectedTitle().length > 1">
        {{ handle.selectedTitle()[1] }}
      </div>
    </div>
    <!-- 文字冒險遊戲 -->
    <div
      v-if="
        [
          STATUS.VISUAL_NOVEL.name
          // STATUS.SPORTS.name,
          // STATUS.MUSIC.name,
          // STATUS.ADVENTURE.name,
          // STATUS.SIMULATION.name
        ].includes(selected.name)
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

<script setup lang="ts">
  import { STATUS, GameStatusType } from './Scripts/config'
  import GameVisualNovel from './GameSample/VisualNovel.vue'
  import GameSport from './GameSample/Sport.vue'
  import GameMusic from './GameSample/Music.vue'

  const props = defineProps<{
    selected: GameStatusType
  }>()

  const handle = {
    selectedTitle: () => {
      const title = props.selected.name
      return title.toLocaleUpperCase().split(' ')
    }
  }
</script>

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
        min-width: 475px;
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
          overflow: unset;
        }
      }
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
