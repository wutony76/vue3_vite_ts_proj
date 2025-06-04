const Tools = {
  getRandom: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  formatSorce: (score: number) => {
    return String(score).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  delay: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default Tools
