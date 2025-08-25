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
    <title id="title">RETRO GAMING BANNER</title>
    <desc id="desc">Pink retro comic banner with burst, layered title and side callouts</desc>

    <defs>
      <!-- Background gradient -->
      <linearGradient id="bgGradRetro" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" :stop-color="bgTop" />
        <stop offset="100%" :stop-color="bgBottom" />
      </linearGradient>

      <!-- Dot/star pattern -->
      <pattern id="starDots" width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.2" :fill="starColor" opacity="0.7" />
        <circle cx="12" cy="8" r="1" :fill="starColor" opacity="0.55" />
        <circle cx="6" cy="14" r="0.9" :fill="starColor" opacity="0.4" />
        <animateTransform
          attributeName="patternTransform"
          type="translate"
          from="0 0"
          to="18 0"
          dur="9s"
          repeatCount="indefinite"
        />
      </pattern>

      <!-- Glow and outer shadow -->
      <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b2" />
        <feMerge>
          <feMergeNode in="b2" />
          <feMergeNode in="b1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="outerShadowRetro" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="8"
          :flood-color="outerShadowColor"
          flood-opacity="0.35"
        />
      </filter>

      <!-- Subtle diagonal scanlines overlay -->
      <pattern
        id="scanlinesRetro"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="skewX(45)"
      >
        <rect width="2" height="4" :fill="`rgba(255,255,255,${scanlineAlpha})`" />
      </pattern>

      <!-- Sparkle symbol -->
      <symbol id="sparkleRetro" viewBox="0 0 24 24">
        <path d="M12 0 L14 6 L20 8 L14 10 L12 16 L10 10 L4 8 L10 6 Z" fill="#ffffff" />
      </symbol>

      <!-- Comic burst shape as a symbol (white with black outline) -->
      <symbol id="comicBurst" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
        <g>
          <path
            d="M300 20 L332 52 L380 44 L356 80 L400 98 L360 110 L388 150 L340 138 L332 182 L300 152 L268 182 L260 138 L212 150 L240 110 L200 98 L244 80 L220 44 L268 52 Z"
            fill="#ffffff"
            stroke="#000000"
            stroke-width="18"
            stroke-linejoin="round"
          />
        </g>
      </symbol>
    </defs>

    <!-- Background layer -->
    <g>
      <rect x="0" y="0" width="1200" height="320" fill="url(#bgGradRetro)" />
      <rect x="0" y="0" width="1200" height="320" fill="url(#starDots)" opacity="0.4" />
      <rect x="0" y="0" width="1200" height="320" fill="url(#scanlinesRetro)" opacity="0.05">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="4 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
    </g>

    <!-- Side ornaments -->
    <g :fill="ornamentColor" :stroke="ornamentColor" stroke-width="3" opacity="0.9">
      <!-- left vertical marks -->
      <g>
        <path d="M80 76 v168" stroke-width="2" stroke-dasharray="8 10" />
        <path d="M64 96 h16" />
        <path d="M64 152 h16" />
        <path d="M64 208 h16" />
      </g>
      <!-- right vertical marks -->
      <g>
        <path d="M1120 76 v168" stroke-width="2" stroke-dasharray="8 10" />
        <path d="M1120 96 h16" />
        <path d="M1120 152 h16" />
        <path d="M1120 208 h16" />
      </g>
    </g>

    <!-- Top/Bottom callouts -->
    <g
      text-anchor="middle"
      font-weight="900"
      font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
      :fill="calloutColor"
    >
      <text x="180" y="46" font-size="24">{{ topLeftText }}</text>
      <text x="1020" y="46" font-size="24">{{ topRightText }}</text>
      <text x="180" y="302" font-size="20">{{ bottomLeftText }}</text>
      <text x="1020" y="302" font-size="20">{{ bottomRightText }}</text>

      <!-- little chevrons -->
      <g :stroke="calloutColor" stroke-width="3" fill="none" opacity="0.8">
        <path d="M250 40 h40" />
        <path d="M910 40 h40" />
        <path d="M250 294 h40" />
        <path d="M910 294 h40" />
      </g>
    </g>

    <!-- Central cluster -->
    <g transform="translate(0, 6)">
      <!-- Black oval shadow behind burst -->
      <ellipse
        cx="600"
        cy="160"
        rx="290"
        ry="92"
        fill="#000"
        opacity="0.85"
        filter="url(#outerShadowRetro)"
      />

      <!-- White comic burst on top of the oval -->
      <g transform="translate(300, 70) scale(2.0)">
        <use href="#comicBurst" />
      </g>

      <!-- Small Japanese label -->
      <text
        x="600"
        y="102"
        text-anchor="middle"
        font-size="28"
        font-weight="800"
        font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', Meiryo, system-ui, -apple-system, sans-serif"
        :fill="jpLabelColor"
        stroke="#000"
        stroke-width="1"
        style="paint-order: stroke fill"
      >
        {{ jpLabel }}
      </text>

      <!-- Layered title: black shadow, white stroke, colored fill -->
      <!-- Shadow -->
      <g text-anchor="middle" dominant-baseline="middle" style="paint-order: stroke fill">
        <text x="600" y="178" font-size="116" font-weight="900" :fill="titleShadow" opacity="0.95">
          {{ line1 }}
        </text>
        <text x="600" y="236" font-size="116" font-weight="900" :fill="titleShadow" opacity="0.95">
          {{ line2 }}
        </text>

        <!-- White outline -->
        <text
          x="596"
          y="174"
          font-size="116"
          font-weight="900"
          fill="none"
          :stroke="titleOutline"
          stroke-width="10"
          stroke-linejoin="round"
          filter="url(#neonGlow)"
        >
          {{ line1 }}
        </text>
        <text
          x="596"
          y="232"
          font-size="116"
          font-weight="900"
          fill="none"
          :stroke="titleOutline"
          stroke-width="10"
          stroke-linejoin="round"
          filter="url(#neonGlow)"
        >
          {{ line2 }}
        </text>

        <!-- Fill -->
        <text
          x="596"
          y="174"
          font-size="116"
          font-weight="900"
          :fill="titleFill"
          filter="url(#neonGlow)"
        >
          {{ line1 }}
        </text>
        <text
          x="596"
          y="232"
          font-size="116"
          font-weight="900"
          :fill="titleFill"
          filter="url(#neonGlow)"
        >
          {{ line2 }}
        </text>
      </g>
    </g>

    <!-- Ambient sparkles -->
    <g opacity="0.6">
      <use href="#sparkleRetro" x="160" y="60">
        <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3s" repeatCount="indefinite" />
      </use>
      <use href="#sparkleRetro" x="1030" y="220">
        <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3.4s" repeatCount="indefinite" />
      </use>
      <use href="#sparkleRetro" x="560" y="36">
        <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.4s" repeatCount="indefinite" />
      </use>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  /**
   * Props to customize the retro banner
   */
  interface Props {
    // Texts
    line1?: string
    line2?: string
    jpLabel?: string
    topLeftText?: string
    topRightText?: string
    bottomLeftText?: string
    bottomRightText?: string

    // Colors
    bgTop?: string
    bgBottom?: string
    starColor?: string
    calloutColor?: string
    ornamentColor?: string
    jpLabelColor?: string
    titleFill?: string
    titleOutline?: string
    titleShadow?: string

    // Effects
    scanlineAlpha?: number
    outerShadowColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    line1: 'Salsa',
    line2: 'Soiree',
    jpLabel: 'チャンネル',

    topLeftText: 'LEVEL UP',
    topRightText: 'LEVEL UP',
    bottomLeftText: 'PRO SKILLS',
    bottomRightText: 'PRO SKILLS',

    bgTop: '#ff4fa8',
    bgBottom: '#d83084',
    starColor: '#ffffff',
    calloutColor: '#ffffff',
    ornamentColor: '#ffffff',
    jpLabelColor: '#ffffff',
    titleFill: '#ff2b8f',
    titleOutline: '#ffffff',
    titleShadow: '#000000',

    scanlineAlpha: 0.05,
    outerShadowColor: '#000000'
  })

  const bgTop = computed(() => props.bgTop)
  const bgBottom = computed(() => props.bgBottom)
  const starColor = computed(() => props.starColor)
  const calloutColor = computed(() => props.calloutColor)
  const ornamentColor = computed(() => props.ornamentColor)
  const jpLabelColor = computed(() => props.jpLabelColor)
  const titleFill = computed(() => props.titleFill)
  const titleOutline = computed(() => props.titleOutline)
  const titleShadow = computed(() => props.titleShadow)
  const scanlineAlpha = computed(() => props.scanlineAlpha)
  const outerShadowColor = computed(() => props.outerShadowColor)

  const line1 = computed(() => props.line1)
  const line2 = computed(() => props.line2)
  const jpLabel = computed(() => props.jpLabel)
  const topLeftText = computed(() => props.topLeftText)
  const topRightText = computed(() => props.topRightText)
  const bottomLeftText = computed(() => props.bottomLeftText)
  const bottomRightText = computed(() => props.bottomRightText)
</script>

<style scoped>
  svg {
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
</style>
