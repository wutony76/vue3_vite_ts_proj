export type GameType = 'Visual Novel' | 'Sports' | 'Music' | 'Adventure' | 'Simulation'

export interface GameStatusType {
  name: GameType
  color: string
  class: string
}

export const STATUS = {
  VISUAL_NOVEL: {
    name: 'Visual Novel' as GameType,
    color: '#ff6981',
    class: 'bar-visual-novel'
  },
  SPORTS: {
    name: 'Sports' as GameType,
    color: '#ffd269',
    class: 'bar-sports'
  },
  MUSIC: {
    name: 'Music' as GameType,
    color: '#ff79dd',
    class: 'bar-music'
  },
  ADVENTURE: {
    name: 'Adventure' as GameType,
    color: '#71de95',
    class: 'bar-adventure'
  },
  SIMULATION: {
    name: 'Simulation' as GameType,
    color: '#4ccae0',
    class: 'bar-simulation'
  }
} as const

export type GameStatusType = (typeof STATUS)[keyof typeof STATUS]
