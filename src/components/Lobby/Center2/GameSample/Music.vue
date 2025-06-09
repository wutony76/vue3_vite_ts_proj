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
    <div class="controls">
      <button @click="startAutoPlay" :disabled="isPlaying">Play Swan Lake</button>
      <button @click="stopAutoPlay" :disabled="!isPlaying">Stop</button>
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

  interface Note {
    note: string
    duration: number
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

  // Swan Lake main theme notes
  const swanLakeNotes: Note[] = [
    { note: 'E4', duration: 500 },
    { note: 'G4', duration: 500 },
    { note: 'B4', duration: 500 },
    { note: 'C5', duration: 1000 },
    { note: 'B4', duration: 500 },
    { note: 'G4', duration: 500 },
    { note: 'E4', duration: 1000 },
    { note: 'D4', duration: 500 },
    { note: 'F4', duration: 500 },
    { note: 'A4', duration: 500 },
    { note: 'B4', duration: 1000 },
    { note: 'A4', duration: 500 },
    { note: 'F4', duration: 500 },
    { note: 'D4', duration: 1000 },
    { note: 'C4', duration: 500 },
    { note: 'E4', duration: 500 },
    { note: 'G4', duration: 500 },
    { note: 'A4', duration: 1000 },
    { note: 'G4', duration: 500 },
    { note: 'E4', duration: 500 },
    { note: 'C4', duration: 1000 },
    { note: 'B3', duration: 500 },
    { note: 'D4', duration: 500 },
    { note: 'F4', duration: 500 },
    { note: 'G4', duration: 1000 },
    { note: 'F4', duration: 500 },
    { note: 'D4', duration: 500 },
    { note: 'B3', duration: 1000 }
  ]

  const isPlaying = ref(false)
  let currentNoteIndex = 0
  let playInterval: number | null = null

  const playNote = (key: PianoKey) => {
    key.isActive = true
    // Here you can add sound playback logic
  }

  const stopNote = (key: PianoKey) => {
    key.isActive = false
  }

  const findKeyByNote = (note: string): PianoKey | undefined => {
    return keys.value.find(key => key.note === note)
  }

  const playNextNote = () => {
    if (currentNoteIndex >= swanLakeNotes.length) {
      currentNoteIndex = 0
    }

    const note = swanLakeNotes[currentNoteIndex]
    const key = findKeyByNote(note.note)

    if (key) {
      playNote(key)
      setTimeout(() => {
        stopNote(key)
      }, note.duration)
    }

    currentNoteIndex++
  }

  const startAutoPlay = () => {
    if (isPlaying.value) return

    isPlaying.value = true
    currentNoteIndex = 0

    playInterval = window.setInterval(() => {
      playNextNote()
    }, 500)
  }

  const stopAutoPlay = () => {
    if (!isPlaying.value) return

    isPlaying.value = false
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }

    // Reset all keys
    keys.value.forEach(key => {
      key.isActive = false
    })
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

    .controls {
      position: absolute;
      right: 10px;
      top: -50px;
      display: flex;
      gap: 10px;

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background: #f978b2;
        color: white;
        cursor: pointer;
        transition: opacity 0.3s;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &:hover:not(:disabled) {
          opacity: 0.8;
        }
      }
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
    background: #f52b8c;
    .key-label {
      color: #fff;
    }
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
