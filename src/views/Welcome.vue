<script setup lang="ts">
  import Start from '@/components/Lobby/StartForCanvas.vue'
  import { useRouter } from 'vue-router'
  import { PATH_NAME } from '@/logic/utils/Parameter'
  import Tools from '@/logic/utils/Tools'

  const router = useRouter()
  const actions = {
    start: () => {
      Tools.delay(1500).then(() => {
        router.replace({ name: PATH_NAME.LOBBY })
      })
    }
  }
</script>

<template>
  <div class="welcome">
    <Start @actionsEnd="actions.start" />
  </div>
</template>

<style scoped>
  .welcome {
    background: #ffeaea;
    width: 100vw;
    height: 100vh;
  }
</style>
