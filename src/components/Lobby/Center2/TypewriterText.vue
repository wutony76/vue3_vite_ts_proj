<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'

  const props = defineProps<{
    text: string
    speed?: number
    autoPlay?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'statusChange', status: 'playing' | 'paused' | 'completed'): void
  }>()

  const displayText = ref('')
  const isTyping = ref(false)
  const showCursor = ref(true)
  const isPlaying = ref(props.autoPlay ?? true)
  const currentIndex = ref(0)
  let typeInterval: number | null = null

  const typeText = async () => {
    if (!isPlaying.value) return

    isTyping.value = true
    emit('statusChange', 'playing')

    while (currentIndex.value < props.text.length && isPlaying.value) {
      displayText.value += props.text[currentIndex.value]
      currentIndex.value++
      await new Promise(resolve => setTimeout(resolve, props.speed || 50))
    }

    if (currentIndex.value >= props.text.length) {
      isTyping.value = false
      emit('statusChange', 'completed')
    } else {
      emit('statusChange', 'paused')
    }
  }

  const play = () => {
    if (!isPlaying.value) {
      isPlaying.value = true
      typeText()
    }
  }

  const pause = () => {
    isPlaying.value = false
    emit('statusChange', 'paused')
  }

  const reset = () => {
    displayText.value = ''
    currentIndex.value = 0
    isTyping.value = false
    isPlaying.value = props.autoPlay ?? true
    if (isPlaying.value) {
      typeText()
    }
  }

  const clear = () => {
    displayText.value = ''
    currentIndex.value = 0
    isTyping.value = false
    isPlaying.value = false
    emit('statusChange', 'paused')
  }

  // 光標閃爍效果
  const startCursorBlink = () => {
    setInterval(() => {
      showCursor.value = !showCursor.value
    }, 500)
  }

  watch(
    () => props.text,
    () => {
      reset()
    }
  )

  onMounted(() => {
    if (isPlaying.value) {
      typeText()
    }
    startCursorBlink()
  })

  // 暴露方法給父組件
  defineExpose({
    play,
    pause,
    reset,
    clear
  })
</script>

<template>
  <span class="typewriter-text">
    {{ displayText }}<span class="cursor" :class="{ 'cursor-blink': !isTyping }">|</span>
  </span>
</template>

<style scoped>
  .typewriter-text {
    display: inline-block;
  }

  .cursor {
    display: inline-block;
    margin-left: 2px;
    color: currentColor;
  }

  .cursor-blink {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
