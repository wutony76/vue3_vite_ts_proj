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
    background: linear-gradient(to bottom, #2c3e50, #1a1a1a);
    padding: 30px;
    border-radius: 15px 0 0 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;

    .keyboard-container {
      display: flex;
      position: relative;
      height: 250px;
      min-width: max-content;
      padding: 20px;
      background: linear-gradient(to bottom, #1a1a1a, #2c3e50);
      border-radius: 10px;
      box-shadow: inset 0 5px 15px rgba(0, 0, 0, 0.5);
    }

    .controls {
      position: absolute;
      right: 10px;
      top: -50px;
      display: flex;
      gap: 10px;

      button {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(to bottom, #394856, #15191d);
        color: #eb177e;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 4px 15px rgba(245, 43, 140, 0.3);

        &:disabled {
          color: #fff;
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 43, 140, 0.4);
        }

        &:active:not(:disabled) {
          transform: translateY(1px);
        }
      }
    }
  }

  .key {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 15px;
    cursor: pointer;
    user-select: none;
    transition: all 0.1s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .white {
    width: 60px;
    height: 100%;
    background: linear-gradient(to bottom, #fff 0%, #f0f0f0 100%);
    border: 1px solid #e0e0e0;
    border-radius: 0 0 8px 8px;
    z-index: 1;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:hover {
      background: linear-gradient(to bottom, #fff 0%, #f5f5f5 100%);
    }
  }

  .black {
    width: 40px;
    height: 60%;
    background: linear-gradient(to bottom, #333 0%, #1a1a1a 100%);
    margin: 0 -20px;
    z-index: 2;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

    &:hover {
      background: linear-gradient(to bottom, #404040 0%, #262626 100%);
    }
  }

  .key.active {
    background: #f52b8c;
    border-color: #e15093;
    transform: translateY(2px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    .key-label {
      color: #fff;
    }
  }

  .black.active {
    background: #f52b8c;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .key-label {
    font-size: 12px;
    font-weight: bold;
    color: #666;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
    transition: color 0.1s ease;
  }

  .black .key-label {
    color: #fff;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  }
</style>
