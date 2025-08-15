<script setup lang="ts">
  import { reactive } from 'vue'
  import { nextTick, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useBaseStore } from '@/logic/stores/base'
  const { bsState } = storeToRefs(useBaseStore())
  const state = reactive({
    isHovered: false
  })
  console.log('FOOTER.bsState', bsState.value)

  const handle = {
    enter: () => {
      state.isHovered = true
      bsState.value.isHoverFooter = true
    },
    leave: () => {
      state.isHovered = false
      bsState.value.isHoverFooter = false
    }
  }

  // 暴露 isHovered 属性给父组件
  defineExpose({
    isHovered: () => state.isHovered
  })

  onMounted(() => {
    nextTick(() => {
      const windowWd: number | undefined = $(window).width()
      const domWd: number | undefined = $('.my-name').width()
      if (windowWd && domWd) $('.my-name').css('left', `${windowWd / 2 - domWd / 2}px`)
    })
  })
</script>

<template>
  <!-- :class="{ 'is-hovered': state.isHovered }" -->
  <div
    class="container-footer"
    @mouseenter="handle.enter()"
    @mouseleave="handle.leave()"
    :class="{ 'is-hovered': bsState.isHoverFooter }"
  >
    <div class="top">
      <!-- <div data-splitting class="my-name headline--flip">
        Welcome to my work. Nice to meet you. Hope everybody have fun. HappyFATyoyyo wishes you all
        the best. Welcome to exchange technical discussions and provide technical support. You can
        contact me by email.
      </div> -->
      <div class="note0">©2025.02 HappyFATyoyo.LOBBY</div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style lang="scss">
  .gameLobby {
    .container-footer {
      .word,
      .char {
        // border: 1px solid #0000ff;
        animation-delay: var(--del);
        animation-direction: var(--dir, normal);
        animation-duration: var(--dur);
        animation-iteration-count: var(--it, infinite);
        animation-name: var(--name);

        animation-timing-function: var(--tf);
        animation-fill-mode: var(--fill, forwards);
        display: inline-block;
        position: relative;
        transform-origin: 50% 100%;
        z-index: 1;
      }
    }

    @keyframes footer-flip {
      5% {
        transform: rotateX(1turn);
        color: #474747;
      }

      10% {
        transform: rotateX(2turn);
        color: #ffeaea;
      }

      20% {
        transform: rotateX(3turn);
      }

      40% {
        transform: rotateX(4turn);
        color: #474747;
      }

      70%,
      100% {
        transform: rotateX(5turn);
        color: #ffeaea;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .container-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 50;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    transform: translateY(0);

    &.is-hovered {
      animation: hover-a01;
      animation-duration: 0.4s; // 持續時間
      animation-fill-mode: forwards;
      animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
      @keyframes hover-a01 {
        0% {
          transform: translateY(0px);
        }
        90% {
          transform: translateY(-10px) scaleY(1.2);
          bottom: 20px;
        }
        100% {
          transform: translateY(0px);
        }
      }
      .top {
        height: 350px;
      }
    }

    .top {
      height: 35px;
      border-radius: 30px 20px 0 0;
      background: #474747;
      transition: height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      will-change: height;
      transform: translateZ(0);

      .my-name {
        font-size: 20px;
        font-weight: 700;
        font-family: unset;
        color: #ffeaea;

        position: absolute;
        top: -20px;
        left: 20%;
        font-size: 15px;
        white-space: nowrap;
      }

      .note0 {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: end;
        font-size: 13px;
        color: #bbbbbb;
      }
    }

    .footer {
      background: #3f3f3f;
      height: 10px;
    }
  }

  :deep(.headline--flip) {
    .char {
      --name: footer-flip;
      --dur: 10000ms;
      --del: calc(var(--char-index) * 0.3s);
      --tf: linear;
      // --dur: 4000ms;
      // --del: calc(var(--char-index) * 0.075s);
      // --tf: linear;
    }
  }
</style>
