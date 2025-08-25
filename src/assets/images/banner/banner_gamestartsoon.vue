<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 320"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-labelledby="title desc"
    width="100%"
    height="100%"
  >
    <title id="title">GAME STARTING SOON</title>
    <desc id="desc">A pixel-tech neon banner with animated grid and scanline effects</desc>

    <defs>
      <!-- Background gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" :stop-color="bgTop" />
        <stop offset="100%" :stop-color="bgBottom" />
      </linearGradient>

      <!-- Border gradient -->
      <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="borderStart" />
        <stop offset="50%" :stop-color="borderMid" />
        <stop offset="100%" :stop-color="borderEnd" />
      </linearGradient>

      <!-- Text gradient -->
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="textStart" />
        <stop offset="50%" :stop-color="textMid" />
        <stop offset="100%" :stop-color="textEnd" />
      </linearGradient>

      <!-- Subtle moving scan highlight -->
      <linearGradient id="scanHighlight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>

      <!-- Grid pattern -->
      <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M12 0H0V12" :stroke="gridStroke" stroke-width="1" shape-rendering="crispEdges" />
        <animateTransform
          attributeName="patternTransform"
          type="translate"
          from="0 0"
          to="12 0"
          dur="6s"
          repeatCount="indefinite"
        />
      </pattern>

      <!-- Glow filter for neon effect -->
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Outer shadow -->
      <filter id="outerShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="8"
          :flood-color="outerShadowColor"
          flood-opacity="0.4"
        />
      </filter>

      <!-- Corner notch shape as a clip-path to give pixel-tech corners -->
      <clipPath id="pixelCorners">
        <path
          d="
          M 24 0 H 1176 L 1200 24 V 296 L 1176 320 H 24 L 0 296 V 24 Z
          M 44 0 L 0 44 V 0 Z
          M 1200 44 L 1156 0 H 1200 Z
          M 0 320 L 44 320 L 0 276 Z
          M 1200 276 L 1156 320 H 1200 Z
        "
        />
      </clipPath>

      <!-- Animated diagonal scanlines overlay (very subtle) -->
      <pattern
        id="scanlines"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="skewX(45)"
      >
        <rect width="2" height="4" :fill="`rgba(255,255,255,${scanlineAlpha})`" />
      </pattern>
      <!-- Global desaturation filter -->
      <filter id="desaturate">
        <feColorMatrix type="saturate" :values="desaturate" />
      </filter>
    </defs>

    <g filter="url(#desaturate)">
      <!-- Background -->
      <g clip-path="url(#pixelCorners)">
        <rect x="0" y="0" width="1200" height="320" fill="url(#bgGrad)" />

        <!-- Moving grid -->
        <rect x="0" y="0" width="1200" height="320" fill="url(#grid)" opacity="0.05"></rect>

        <!-- Scan highlight sweeping down -->
        <rect x="0" y="-320" width="1200" height="320" fill="url(#scanHighlight)">
          <animate attributeName="y" from="-320" to="320" dur="4s" repeatCount="indefinite" />
        </rect>

        <!-- Subtle diagonal scanlines overlay -->
        <rect x="0" y="0" width="1200" height="320" fill="url(#scanlines)" opacity="0.06">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="4 0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      <!-- Border -->
      <!-- <rect
      x="50"
      y="60"
      width="1100"
      height="200"
      fill="none"
      stroke="url(#borderGrad)"
      stroke-width="4"
      filter="url(#outerShadow)"
      shape-rendering="crispEdges"
    /> -->

      <!-- Corner pixels for retro vibe -->
      <g :fill="cornerColor" opacity="0.9">
        <rect x="16" y="16" width="6" height="6" />
        <rect x="28" y="16" width="6" height="6" />
        <rect x="16" y="28" width="6" height="6" />

        <rect x="1178" y="16" width="6" height="6" />
        <rect x="1166" y="16" width="6" height="6" />
        <rect x="1178" y="28" width="6" height="6" />

        <rect x="16" y="298" width="6" height="6" />
        <rect x="28" y="298" width="6" height="6" />
        <rect x="16" y="286" width="6" height="6" />

        <rect x="1178" y="298" width="6" height="6" />
        <rect x="1166" y="298" width="6" height="6" />
        <rect x="1178" y="286" width="6" height="6" />
      </g>

      <!-- Title text: neon layered for glow and chromatic aberration -->
      <g text-anchor="middle" dominant-baseline="middle" transform="translate(0, -6)">
        <!-- Cyan glow layer -->
        <text
          x="600"
          y="153"
          font-size="88"
          font-weight="900"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          :fill="neonCyan"
          :opacity="neonCyanOpacity"
          filter="url(#glow)"
          letter-spacing="6"
          style="paint-order: stroke fill"
        >
          GAME STARTING SOON
        </text>
        <!-- Magenta offset layer -->
        <text
          x="604"
          y="157"
          font-size="88"
          font-weight="900"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          :fill="neonMagenta"
          :opacity="neonMagentaOpacity"
          filter="url(#glow)"
          letter-spacing="6"
          style="paint-order: stroke fill"
        >
          GAME STARTING SOON
        </text>
        <!-- Main gradient text -->
        <text
          x="602"
          y="155"
          font-size="88"
          font-weight="900"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          fill="url(#textGrad)"
          stroke="#c8f1ff"
          stroke-width="0.6"
          letter-spacing="6"
          style="paint-order: stroke fill"
        >
          GAME STARTING SOON
        </text>

        <!-- Divider line with animated dash -->
        <g opacity="0.7">
          <line
            x1="280"
            y1="165"
            x2="920"
            y2="165"
            stroke="url(#borderGrad)"
            stroke-width="2"
            stroke-linecap="square"
            stroke-dasharray="10 6"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-32"
              dur="2s"
              repeatCount="indefinite"
            />
          </line>
        </g>

        <!-- Subtitle -->
        <text
          x="600"
          y="216"
          font-size="40"
          font-weight="800"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          :fill="subtitleColor"
          opacity="0.95"
          letter-spacing="3"
          style="paint-order: stroke fill"
        >
          Starting Soon...
        </text>

        <!-- Blinking pixels under subtitle -->
        <g>
          <rect x="480" y="238" width="8" height="8" :fill="neonCyan">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="496" y="238" width="8" height="8" :fill="neonMagenta">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="512" y="238" width="8" height="8" :fill="neonCyan">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="688" y="238" width="8" height="8" :fill="neonMagenta">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="704" y="238" width="8" height="8" :fill="neonCyan">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="720" y="238" width="8" height="8" :fill="neonMagenta">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.1s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  type Preset = 'neon' | 'pastel'
  /** 配色設定：每個欄位對應到 SVG 機能或區塊 */
  interface BannerColorProps {
    preset?: Preset // 預設主題：'neon' 或 'pastel'
    bgTop?: string // 背景漸層：頂部色
    bgBottom?: string // 背景漸層：底部色

    borderStart?: string // 邊框/分隔線漸層：起點色
    borderMid?: string // 邊框/分隔線漸層：中間色
    borderEnd?: string // 邊框/分隔線漸層：終點色

    textStart?: string // 主標題文字漸層：起點色
    textMid?: string // 主標題文字漸層：中間色
    textEnd?: string // 主標題文字漸層：終點色

    neonCyan?: string // 霓虹青色發光層（主標題外發光）
    neonMagenta?: string // 霓虹洋紅發光層（主標題外發光/偏移）
    cornerColor?: string // 邊角像素點顏色

    outerShadowColor?: string // 外框投影顏色（DropShadow）
    gridStroke?: string // 背景移動網格線顏色
    scanlineAlpha?: number // 斜向掃描線透明度（0~1）
    desaturate?: number // 全局去飽和度（1=原色, 0=灰階）
    subtitleColor?: string // 副標題文字顏色
    neonCyanOpacity?: number // 霓虹青色發光層透明度
    neonMagentaOpacity?: number // 霓虹洋紅發光層透明度
  }

  const props = withDefaults(defineProps<BannerColorProps>(), {
    preset: 'neon',
    scanlineAlpha: 0.05,
    desaturate: 1,
    neonCyanOpacity: 0.7,
    neonMagentaOpacity: 0.55
  })

  const neon = {
    bgTop: '#0b1020',
    bgBottom: '#0f1835',
    borderStart: '#00e5ff',
    borderMid: '#7a00ff',
    borderEnd: '#00e5ff',
    textStart: '#e2f9ff',
    textMid: '#9ad2ff',
    textEnd: '#e2f9ff',
    neonCyan: '#00e5ff',
    neonMagenta: '#ff00ff',
    cornerColor: '#00e5ff',
    outerShadowColor: '#00e5ff',
    gridStroke: '#1c2744',
    subtitleColor: '#a6d8ff'
  }

  const pastel = {
    bgTop: '#18233d',
    bgBottom: '#233150',
    borderStart: '#9ed0e6',
    borderMid: '#d5c6ff',
    borderEnd: '#9ed0e6',
    textStart: '#ffffff',
    textMid: '#dfeaff',
    textEnd: '#ffffff',
    neonCyan: '#b8e6e8',
    neonMagenta: '#f0a8ff',
    cornerColor: '#9ed0e6',
    outerShadowColor: '#9ed0e6',
    gridStroke: '#35466d',
    subtitleColor: '#e3f0ff'
  }

  const theme = computed(() => (props.preset === 'pastel' ? pastel : neon))

  // Effective values used by the template (props override theme)
  const bgTop = computed(() => props.bgTop ?? theme.value.bgTop)
  const bgBottom = computed(() => props.bgBottom ?? theme.value.bgBottom)
  const borderStart = computed(() => props.borderStart ?? theme.value.borderStart)
  const borderMid = computed(() => props.borderMid ?? theme.value.borderMid)
  const borderEnd = computed(() => props.borderEnd ?? theme.value.borderEnd)
  const textStart = computed(() => props.textStart ?? theme.value.textStart)
  const textMid = computed(() => props.textMid ?? theme.value.textMid)
  const textEnd = computed(() => props.textEnd ?? theme.value.textEnd)
  const neonCyan = computed(() => props.neonCyan ?? theme.value.neonCyan)
  const neonMagenta = computed(() => props.neonMagenta ?? theme.value.neonMagenta)
  const cornerColor = computed(() => props.cornerColor ?? theme.value.cornerColor)
  const outerShadowColor = computed(() => props.outerShadowColor ?? theme.value.outerShadowColor)
  const gridStroke = computed(() => props.gridStroke ?? theme.value.gridStroke)
  const subtitleColor = computed(() => props.subtitleColor ?? theme.value.subtitleColor)

  const scanlineAlpha = computed(() => props.scanlineAlpha)
  const desaturate = computed(() => props.desaturate)
  const neonCyanOpacity = computed(() => props.neonCyanOpacity)
  const neonMagentaOpacity = computed(() => props.neonMagentaOpacity)
</script>

<style scoped>
  svg {
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
</style>
