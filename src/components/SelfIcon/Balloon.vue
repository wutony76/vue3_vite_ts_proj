<template>
  <div class="balloon-container">
    <svg
      class="balloon"
      :class="{ 'animate-float': animate }"
      viewBox="0 0 24 24"
      :width="size"
      :height="size"
    >
      <!-- Balloon string -->
      <path
        d="M12 22V14"
        :stroke="stringColor"
        stroke-width="1.5"
        stroke-linecap="round"
        fill="none"
      />
      <!-- Balloon body -->
      <path
        d="M12 14c-3.866 0-7-3.582-7-8 0-4.418 3.134-6 7-6s7 1.582 7 6c0 4.418-3.134 8-7 8z"
        :fill="color"
      />
      <!-- Balloon highlight -->
      <path
        d="M10 4.5a4 4 0 0 1 2.5-.5"
        stroke="rgba(255,255,255,0.5)"
        stroke-width="1.5"
        stroke-linecap="round"
        fill="none"
      />
      <!-- Balloon knot -->
      <circle cx="12" cy="14" r="1" :fill="stringColor" />
    </svg>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Balloon',
    props: {
      animate: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: '#FF6B6B' // 粉紅色
      },
      stringColor: {
        type: String,
        default: '#4A4A4A' // 深灰色
      },
      size: {
        type: [Number, String],
        default: 50,
        validator: (value: number | string) => {
          const num = typeof value === 'string' ? parseInt(value) : value
          return num > 0
        }
      }
    }
  })
</script>

<style scoped lang="scss">
  .balloon-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .balloon {
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &.animate-float {
      animation: float 3s ease-in-out infinite;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-6px) rotate(3deg);
    }
    50% {
      transform: translateY(-10px) rotate(-2deg);
    }
    75% {
      transform: translateY(-6px) rotate(1deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }
</style>
