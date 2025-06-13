<template>
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="treasure-chest-icon"
  >
    <!-- 寶箱主體 -->
    <rect
      x="8"
      y="28"
      width="48"
      height="24"
      rx="4"
      fill="#a97c50"
      stroke="#6b4a2b"
      stroke-width="2"
    />
    <!-- 寶箱蓋 -->
    <rect
      x="6"
      y="16"
      width="52"
      height="18"
      rx="6"
      fill="#c9a063"
      stroke="#6b4a2b"
      stroke-width="2"
    />
    <!-- 蓋子陰影 -->
    <rect x="6" y="26" width="52" height="4" rx="2" fill="#8b6842" opacity="0.5" />
    <!-- 金屬邊 -->
    <rect
      x="8"
      y="28"
      width="48"
      height="4"
      rx="2"
      fill="#e6c97a"
      stroke="#bfa14a"
      stroke-width="1"
    />
    <rect
      x="8"
      y="48"
      width="48"
      height="4"
      rx="2"
      fill="#e6c97a"
      stroke="#bfa14a"
      stroke-width="1"
    />
    <!-- 鎖頭 -->
    <rect
      x="30"
      y="44"
      width="4"
      height="8"
      rx="1"
      fill="#d4af37"
      stroke="#8a7a3a"
      stroke-width="1"
    />
    <circle cx="32" cy="48" r="1" fill="#8a7a3a" />
    <!-- 寶物：金幣 -->
    <circle cx="18" cy="54" r="2" fill="#ffd700" stroke="#bfa14a" stroke-width="0.5" />
    <circle cx="24" cy="52" r="1.2" fill="#ffd700" stroke="#bfa14a" stroke-width="0.5" />
    <circle cx="46" cy="54" r="1.5" fill="#ffd700" stroke="#bfa14a" stroke-width="0.5" />
    <!-- 寶物：寶石 -->
    <polygon
      points="40,50 42,52 41,54 39,54 38,52"
      fill="#4fd1c5"
      stroke="#2a8a7a"
      stroke-width="0.5"
    />
    <polygon
      points="50,50 51,52 50,54 48,54 47,52"
      fill="#b6e6d7"
      stroke="#2a8a7a"
      stroke-width="0.5"
    />
    <!-- 寶物：球體 -->
    <circle cx="36" cy="40" r="3" fill="#6fd1c2" stroke="#2a8a7a" stroke-width="0.5" />
    <!-- 寶物：棒狀物 -->
    <rect
      x="20"
      y="38"
      width="2"
      height="8"
      rx="1"
      fill="#b98c5a"
      stroke="#6b4a2b"
      stroke-width="0.5"
    />
    <rect
      x="44"
      y="38"
      width="2"
      height="8"
      rx="1"
      fill="#b98c5a"
      stroke="#6b4a2b"
      stroke-width="0.5"
    />
    <!-- 飛舞的蝴蝶 -->
    <path d="M56 18 Q57 16 58 18 Q59 20 56 18" fill="#ffe066" />
  </svg>
</template>

<style scoped>
  .treasure-chest-icon {
    width: 48px;
    height: 48px;
    display: block;
  }
</style>
