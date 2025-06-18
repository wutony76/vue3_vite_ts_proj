<script setup lang="ts">
  import { reactive } from 'vue'
  import { _uuid2 } from '@/logic/utils/Encrypt'

  const state = reactive({
    key: _uuid2()
  })
</script>

<template>
  <div class="center3" :class="`center-${state.key}`"></div>
</template>

<style lang="scss" scoped>
  .center3 {
    border: 1px solid #2600ff;
    min-height: 1510px;
    margin-top: 0px;
  }
</style>
