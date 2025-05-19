<script setup lang="ts">
import Card from './Card.vue';
import { reactive, onMounted, onUnmounted } from 'vue';

const STATUS = {
  VISUAL_NOVEL:
  {
    name: 'Visual Novel',
    color: '#ff6981',
  },
  SPORTS: {
    name: 'Sports',
    color: '#ffd269',
  },
  MUSIC: {
    name: 'Music',
    color: '#ff79dd',
  },
  ADVENTURE: {
    name: 'Adventure',
    color: '#71de95',
  },
  SIMULATION: {
    name: 'Simulation',
    color: '#4ccae0',
  },
}
const state = reactive({
  isClick: false,
  selected: STATUS.VISUAL_NOVEL,
  block1RightWidth: '50px',
})

const clickListener = (status: typeof STATUS[keyof typeof STATUS]) => {
  state.selected = status
}
const init = {
  run() {
    state.isClick = false
  }
}


const updateWidth = () => {
  const windowWidth = window.innerWidth;
  const width = Math.min(Math.max(windowWidth * 0.15 - 30, 50), 500);
  state.block1RightWidth = `${width}px`;
};

onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<template>
  <div class="center2">
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

      <div class="block-1-right" :style="{ width: state.block1RightWidth, background: state.selected.color }">
      </div>
      1<div class="block-1-right-main" :style="{
        background: state.selected.color,
      }">
        <div>test</div>
      </div>

      <div class="info-section" style="display: none;">
        <div class="section-header">
          <span class="item setting-text">RECENT ACTIVITY</span>
        </div>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">🎯</div>
            <div class="activity-content">
              <div class="activity-title">Snake Game High Score</div>
              <div class="activity-time">2 hours ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">🏎️</div>
            <div class="activity-content">
              <div class="activity-title">New Racing Record</div>
              <div class="activity-time">5 hours ago</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">🎲</div>
            <div class="activity-content">
              <div class="activity-title">Tetriminos Level Up</div>
              <div class="activity-time">1 day ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center2 {
  border: 1px solid #2600ff;
  min-height: 1500px;
  margin-top: 0px;
}

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
    height: 400px;
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
    height: 370px;
    bottom: -70px;
    right: 0px;
    background: white;
    border-radius: 180px 0px 0px 0px;
    transition: width 0.3s ease, background-color 0.5s ease;
  }

  .block-1-right-main {
    margin-top: 65px;
    position: absolute;
    width: 100%;
    background: #fff;
    min-height: 500px;
    transition: background-color 0.5s ease;
  }
}
</style>