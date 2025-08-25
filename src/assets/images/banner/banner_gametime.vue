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
    <title id="title">GAMING TIME</title>
    <desc id="desc">Neon gaming banner with socials and CTA</desc>

    <defs>
      <!-- Background gradient -->
      <linearGradient id="bgGradGT" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" :stop-color="bgTop" />
        <stop offset="100%" :stop-color="bgBottom" />
      </linearGradient>

      <!-- Border gradient -->
      <linearGradient id="borderGradGT" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="borderStart" />
        <stop offset="50%" :stop-color="borderMid" />
        <stop offset="100%" :stop-color="borderEnd" />
      </linearGradient>

      <!-- Text gradient -->
      <linearGradient id="textGradGT" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="textStart" />
        <stop offset="50%" :stop-color="textMid" />
        <stop offset="100%" :stop-color="textEnd" />
      </linearGradient>

      <!-- CTA gradient -->
      <linearGradient id="ctaGradGT" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :stop-color="ctaStart" />
        <stop offset="100%" :stop-color="ctaEnd" />
      </linearGradient>

      <!-- Subtle moving scan highlight -->
      <linearGradient id="scanHighlightGT" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>

      <!-- Grid pattern -->
      <pattern id="gridGT" width="12" height="12" patternUnits="userSpaceOnUse">
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
      <filter id="glowGT" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Outer shadow -->
      <filter id="outerShadowGT" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="8"
          :flood-color="outerShadowColor"
          flood-opacity="0.4"
        />
      </filter>

      <!-- Pixel-tech corners clip -->
      <clipPath id="pixelCornersGT">
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

      <!-- Shimmer mask for diagonal sweep -->
      <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>
      <mask id="shimmerMask">
        <rect x="0" y="0" width="1200" height="320" fill="url(#shimmerGrad)">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-600 -160"
            to="1200 320"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </rect>
      </mask>

      <!-- Sparkle shape -->
      <symbol id="sparkle" viewBox="0 0 24 24">
        <path d="M12 0 L14 6 L20 8 L14 10 L12 16 L10 10 L4 8 L10 6 Z" fill="#ffffff" />
      </symbol>

      <!-- Pulsing ring filter -->
      <filter id="ringBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.0" />
      </filter>

      <!-- Strong neon glow for rings -->
      <filter id="ringNeon" x="-300%" y="-300%" width="600%" height="600%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Diagonal scanlines overlay -->
      <pattern
        id="scanlinesGT"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="skewX(45)"
      >
        <rect width="2" height="4" :fill="`rgba(255,255,255,${scanlineAlpha})`" />
      </pattern>

      <!-- Social pill symbol (rounded rect with small icon circle) -->
      <symbol id="socialPill" viewBox="0 0 120 26" preserveAspectRatio="xMidYMid meet">
        <rect
          x="0.5"
          y="0.5"
          width="119"
          height="25"
          rx="13"
          ry="13"
          fill="#0f1028"
          :stroke="borderStart"
          stroke-width="1"
        />
        <circle cx="14" cy="13" r="7" :fill="neonCyan" opacity="0.9" />
      </symbol>

      <!-- Global desaturation filter -->
      <filter id="desaturateGT">
        <feColorMatrix type="saturate" :values="desaturate" />
      </filter>
    </defs>

    <g filter="url(#desaturateGT)">
      <!-- Background -->
      <g clip-path="url(#pixelCornersGT)">
        <rect x="0" y="0" width="1200" height="320" fill="url(#bgGradGT)" />
        <!-- Moving grid -->
        <rect x="0" y="0" width="1200" height="320" fill="url(#gridGT)" opacity="0.03"></rect>
        <!-- Scan highlight sweeping down -->
        <rect x="0" y="-320" width="1200" height="320" fill="url(#scanHighlightGT)">
          <animate attributeName="y" from="-320" to="320" dur="4s" repeatCount="indefinite" />
        </rect>
        <!-- Subtle diagonal scanlines overlay -->
        <rect x="0" y="0" width="1200" height="320" fill="url(#scanlinesGT)" opacity="0.03">
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

      <!-- Corner pixels -->
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

      <!-- Socials row -->
      <g :transform="`translate(0, 36)`">
        <g
          v-for="(s, i) in socials"
          :key="i"
          :transform="`translate(${socialBaseX + i * socialSpacing - 60}, 0)`"
          opacity="0.05"
        >
          <use href="#socialPill" />
          <text
            x="32"
            y="18"
            font-size="12"
            font-weight="700"
            font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
            :fill="subtitleColor"
            style="paint-order: stroke fill"
          >
            {{ s.label }}
          </text>
        </g>
      </g>

      <!-- Title -->
      <g text-anchor="middle" dominant-baseline="middle" transform="translate(0, 8)">
        <text
          x="600"
          y="156"
          font-size="92"
          font-weight="900"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          :fill="neonCyan"
          :opacity="neonCyanOpacity"
          filter="url(#glowGT)"
          letter-spacing="6"
          style="paint-order: stroke fill"
        >
          {{ mainTitle }}
        </text>
        <text
          x="604"
          y="160"
          font-size="92"
          font-weight="900"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          :fill="neonMagenta"
          :opacity="neonMagentaOpacity"
          filter="url(#glowGT)"
          letter-spacing="6"
          style="paint-order: stroke fill"
        >
          {{ mainTitle }}
        </text>
        <text
          x="602"
          y="158"
          font-size="92"
          font-weight="900"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          fill="url(#textGradGT)"
          stroke="#c8f1ff"
          stroke-width="0.6"
          letter-spacing="6"
          style="paint-order: stroke fill"
        >
          {{ mainTitle }}
        </text>
      </g>

      <!-- subtle neon breathing -->
      <g text-anchor="middle" dominant-baseline="middle" transform="translate(0, 8)" opacity="0.1">
        <text
          x="600"
          y="156"
          font-size="92"
          font-weight="900"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          :fill="neonCyan"
        >
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
          {{ mainTitle }}
        </text>
      </g>

      <!-- Divider line -->
      <g opacity="0.7">
        <line
          x1="280"
          y1="168"
          x2="920"
          y2="168"
          stroke="url(#borderGradGT)"
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

      <!-- CTA pill at bottom -->
      <g>
        <rect
          x="210"
          y="238"
          width="780"
          height="44"
          rx="8"
          ry="8"
          fill="url(#ctaGradGT)"
          filter="url(#outerShadowGT)"
        />
        <!-- shimmer over CTA -->
        <rect
          x="210"
          y="238"
          width="780"
          height="44"
          rx="8"
          ry="8"
          fill="#ffffff"
          mask="url(#shimmerMask)"
          opacity="0.25"
        />
        <!-- dotted left -->
        <g :fill="ctaDotColor">
          <circle v-for="i in dotsLeft" :key="`dl-${i}`" :cx="228 + (i - 1) * 14" cy="260" r="2" />
        </g>
        <!-- dotted right -->
        <g :fill="ctaDotColor">
          <circle v-for="i in dotsRight" :key="`dr-${i}`" :cx="770 + (i - 1) * 14" cy="260" r="2" />
        </g>
        <text
          x="600"
          y="266"
          font-size="20"
          font-weight="900"
          text-anchor="middle"
          font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
          :fill="ctaTextColor"
          style="paint-order: stroke fill"
        >
          {{ ctaText }}
        </text>
        <!-- sparkles -->
        <g opacity="0.6">
          <use href="#sparkle" x="220" y="230">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.4;1"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </use>
          <use href="#sparkle" x="960" y="230">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.3;1"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </use>
        </g>
        <!-- pulsing rings -->
        <g :stroke="borderStart" stroke-width="3" fill="none" opacity="1" filter="url(#ringNeon)">
          <circle cx="600" cy="160" r="8" stroke="#ff004c">
            <animate attributeName="r" values="8;600;8" dur="2.2s" repeatCount="indefinite" />
            <animate
              attributeName="opacity"
              values="0.8;0;0.8"
              dur="2.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#ff0033;#ff6a00;#ffc800;#00ff66;#00f7ff;#5a00ff;#ff00ff;#ff0033"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="600" cy="160" r="8" stroke="#ff8a00">
            <animate
              attributeName="r"
              values="8;800;8"
              dur="2.6s"
              begin="0.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0;0.6"
              dur="2.6s"
              begin="0.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#ff6a00;#ffc800;#00ff66;#00f7ff;#5a00ff;#ff00ff;#ff0033;#ff6a00"
              dur="3.5s"
              begin="0.15s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="600" cy="160" r="8" stroke="#ffe500">
            <animate
              attributeName="r"
              values="8;1000;8"
              dur="3s"
              begin="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0;0.5"
              dur="3s"
              begin="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke"
              values="#ffd000;#00ff66;#00f7ff;#5a00ff;#ff00ff;#ff0033;#ff6a00;#ffd000"
              dur="3.5s"
              begin="0.3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  type Preset = 'neon' | 'pastel'
  interface BannerColorProps {
    preset?: Preset
    bgTop?: string
    bgBottom?: string

    borderStart?: string
    borderMid?: string
    borderEnd?: string

    textStart?: string
    textMid?: string
    textEnd?: string

    neonCyan?: string
    neonMagenta?: string
    cornerColor?: string

    outerShadowColor?: string
    gridStroke?: string
    scanlineAlpha?: number
    desaturate?: number
    subtitleColor?: string
    neonCyanOpacity?: number
    neonMagentaOpacity?: number

    ctaStart?: string
    ctaEnd?: string
    ctaTextColor?: string
    ctaDotColor?: string
  }

  interface Props extends BannerColorProps {
    mainTitle?: string
    ctaText?: string
    socials?: Array<{ label: string }>
  }

  const props = withDefaults(defineProps<Props>(), {
    preset: 'neon',
    scanlineAlpha: 0.03,
    desaturate: 1,
    neonCyanOpacity: 0.7,
    neonMagentaOpacity: 0.55,
    mainTitle: 'GAMING TIME',
    ctaText: 'HAPPY.FAT.YOYO',
    socials: () => [{ label: '' }, { label: '' }, { label: '' }, { label: '' }]
  })

  const neon = {
    bgTop: '#67b9e7',
    bgBottom: '#d33f62',
    borderStart: '#00e5ff',
    borderMid: '#7a00ff',
    borderEnd: '#ff00ff',
    textStart: '#ffe45e',
    textMid: '#ffb3ff',
    textEnd: '#7df0ff',
    neonCyan: '#00e5ff',
    neonMagenta: '#ff00ff',
    cornerColor: '#00e5ff',
    outerShadowColor: '#00e5ff',
    gridStroke: '#26245a',
    subtitleColor: '#cfe9ff',
    ctaStart: '#ff4fd3',
    ctaEnd: '#ffd23f',
    ctaTextColor: '#1c1033',
    ctaDotColor: '#ffffff'
  }

  const pastel = {
    bgTop: '#18233d',
    bgBottom: '#233150',
    borderStart: '#9ed0e6',
    borderMid: '#d5c6ff',
    borderEnd: '#f0a8ff',
    textStart: '#ffffff',
    textMid: '#e8ecff',
    textEnd: '#c8f1ff',
    neonCyan: '#b8e6e8',
    neonMagenta: '#f0a8ff',
    cornerColor: '#9ed0e6',
    outerShadowColor: '#9ed0e6',
    gridStroke: '#35466d',
    subtitleColor: '#e3f0ff',
    ctaStart: '#f0a8ff',
    ctaEnd: '#ffe08a',
    ctaTextColor: '#1f2847',
    ctaDotColor: '#ffffff'
  }

  const theme = computed(() => (props.preset === 'pastel' ? pastel : neon))

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

  const ctaStart = computed(() => props.ctaStart ?? theme.value.ctaStart)
  const ctaEnd = computed(() => props.ctaEnd ?? theme.value.ctaEnd)
  const ctaTextColor = computed(() => props.ctaTextColor ?? theme.value.ctaTextColor)
  const ctaDotColor = computed(() => props.ctaDotColor ?? theme.value.ctaDotColor)

  const scanlineAlpha = computed(() => props.scanlineAlpha)
  const desaturate = computed(() => props.desaturate)
  const neonCyanOpacity = computed(() => props.neonCyanOpacity)
  const neonMagentaOpacity = computed(() => props.neonMagentaOpacity)

  // socials layout
  const socialSpacing = 150
  const socialBaseX = computed(() => 600 - ((props.socials.length - 1) * socialSpacing) / 2)

  // dots for CTA
  const dotsLeft = 14
  const dotsRight = 12
</script>

<style scoped>
  svg {
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
  }
</style>
