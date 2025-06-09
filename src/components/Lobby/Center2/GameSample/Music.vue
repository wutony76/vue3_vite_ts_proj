<template>
  <div class="piano-keyboard">
    <div class="keyboard-container">
      <div
        v-for="(key, index) in keys"
        :key="index"
        :class="['key', key.type, { active: key.isActive }]"
        @mousedown="playNote(key)"
        @mouseup="stopNote(key)"
        @mouseleave="stopNote(key)"
      >
        <span class="key-label">{{ key.note }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface PianoKey {
    note: string
    type: 'white' | 'black'
    isActive: boolean
  }

  const keys = ref<PianoKey[]>([
    // First Octave
    { note: 'C3', type: 'white', isActive: false },
    { note: 'C#3', type: 'black', isActive: false },
    { note: 'D3', type: 'white', isActive: false },
    { note: 'D#3', type: 'black', isActive: false },
    { note: 'E3', type: 'white', isActive: false },
    { note: 'F3', type: 'white', isActive: false },
    { note: 'F#3', type: 'black', isActive: false },
    { note: 'G3', type: 'white', isActive: false },
    { note: 'G#3', type: 'black', isActive: false },
    { note: 'A3', type: 'white', isActive: false },
    { note: 'A#3', type: 'black', isActive: false },
    { note: 'B3', type: 'white', isActive: false },
    // Second Octave
    { note: 'C4', type: 'white', isActive: false },
    { note: 'C#4', type: 'black', isActive: false },
    { note: 'D4', type: 'white', isActive: false },
    { note: 'D#4', type: 'black', isActive: false },
    { note: 'E4', type: 'white', isActive: false },
    { note: 'F4', type: 'white', isActive: false },
    { note: 'F#4', type: 'black', isActive: false },
    { note: 'G4', type: 'white', isActive: false },
    { note: 'G#4', type: 'black', isActive: false },
    { note: 'A4', type: 'white', isActive: false },
    { note: 'A#4', type: 'black', isActive: false },
    { note: 'B4', type: 'white', isActive: false },
    // Third Octave
    { note: 'C5', type: 'white', isActive: false },
    { note: 'C#5', type: 'black', isActive: false },
    { note: 'D5', type: 'white', isActive: false },
    { note: 'D#5', type: 'black', isActive: false },
    { note: 'E5', type: 'white', isActive: false },
    { note: 'F5', type: 'white', isActive: false },
    { note: 'F#5', type: 'black', isActive: false },
    { note: 'G5', type: 'white', isActive: false },
    { note: 'G#5', type: 'black', isActive: false },
    { note: 'A5', type: 'white', isActive: false },
    { note: 'A#5', type: 'black', isActive: false },
    { note: 'B5', type: 'white', isActive: false }
  ])

  const playNote = (key: PianoKey) => {
    key.isActive = true
    // Here you can add sound playback logic
  }

  const stopNote = (key: PianoKey) => {
    key.isActive = false
  }
</script>

<style lang="scss" scoped>
  .piano-keyboard {
    background: #f0f0f0;

    .keyboard-container {
      display: flex;
      position: relative;
      height: 250px;
      min-width: max-content;
    }
  }

  .key {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 10px;
    cursor: pointer;
    user-select: none;
  }

  .white {
    width: 60px;
    height: 100%;
    background: white;
    border: 1px solid #f978b2;
    border-radius: 0 0 5px 5px;
    z-index: 1;
  }

  .black {
    width: 40px;
    height: 60%;
    background: #333;
    margin: 0 -20px;
    z-index: 2;
    border-radius: 0 0 5px 5px;
  }

  .key.active {
    background: #e0e0e0;
  }

  .black.active {
    background: #666;
  }

  .key-label {
    font-size: 12px;
    color: #666;
  }

  .black .key-label {
    color: #fff;
  }
</style>
