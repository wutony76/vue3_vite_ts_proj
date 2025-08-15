import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useBaseStore = defineStore('base', () => {
  const bsState = reactive({
    isHoverFooter: false
  })

  return { bsState }
})
