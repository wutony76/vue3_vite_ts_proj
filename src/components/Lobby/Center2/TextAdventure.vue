<template>
  <div class="main">
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
        content. Players interact with the game world, explore the story, solve puzzles, or advance
        the plot by reading the narrative and entering commands or selecting options. This type of
        game can be said to be one of the earliest narrative interactive forms in the history of
        digital games, combining elements of novels, role-playing, and puzzle solving.
      </p>
    </div>
    <div class="right">
      <div class="light"></div>
      <div class="light2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Component logic can be added here if needed
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: white;
    border-radius: 0px 60px 20px 0px;
    height: 410px;
    overflow: hidden;
  }

  .left {
    width: 200px;
    padding: 20px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 20px;
        font-size: 18px;
        color: #333;
        position: relative;
        padding-left: 20px;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #666;
        }
      }
    }
  }

  .center {
    flex: 1;
    margin: 0 40px;
    padding: 20px;
    display: flex;
    align-items: center;

    p {
      font-size: 16px;
      line-height: 1.6;
      color: #444;
      text-align: justify;
    }
  }

  .right {
    width: 200px;
    position: relative;
    padding: 20px;

    .light,
    .light2 {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      position: absolute;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .light {
      top: 50px;
      right: 50px;
    }

    .light2 {
      top: 150px;
      right: 30px;
      width: 60px;
      height: 60px;
    }
  }
</style>
