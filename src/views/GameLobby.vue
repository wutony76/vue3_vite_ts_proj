<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Splitting from 'splitting'
import Net from '@/logic/base/Net'

import Animation from '@/logic/utils/Animation'
import ArtsEffect from '@/logic/utils/ArtsEffect'
import { ACTIONS, GAME, STATIC, PATH_NAME, STATUS_ICON } from '@/logic/utils/Parameter'
import Lobby from '@/logic/lobby/Lobby'
import Nvbar from '@/components/Ui/NvbarList.vue'
import GameIcon from '@/components/Lobby/GameIcon.vue'
import MainFooter from '@/components/Lobby/Footer.vue'

const router = useRouter()
defineOptions({
  name: "GameLoddy",
  inheritAttrs: false,
})

// Animation timing constants
const ANIMATION_TIMING = {
  NAVBAR: 10,
  FOOTER: 10,
  LOGO: 500,
  APPY_WORD: 1500,
  YOYO_WORD: 2000,
  FAT_WORD: 3000,
  BANNER: 700,
  CONTACT: 1100,
  CONTACT_LIST: 2000,
  FACEBOOK_BUTTON: 2500,
  FACEBOOK_BUTTON_END: 3000,
  GAME_LIST: 900,
  GAME_BLOCK: 1600,
  GAME_ITEM: 2100,
  GAME_ITEM_END: 3000,
  GAME_ITEM_ALPHA: 2900,
  LOGO_EFFECT: 300,
  PATH_CHANGE: 1300,
  PATH_RELOAD: 10
} as const

// Animation sequences
const initAnimations = () => {
  // Layout animations
  Animation.addClass('nvbarBlock', 'animation-block-down', ANIMATION_TIMING.NAVBAR)
  Animation.addClass('mainFooter', 'animation-block-down', ANIMATION_TIMING.FOOTER)

  // Logo animations
  Animation.addClass('logoBox', 'page--alphaIn', ANIMATION_TIMING.LOGO)
  Animation.addClass('appyWord', 'headline--self001', ANIMATION_TIMING.APPY_WORD)
  Animation.addClass('yoyoWord', 'headline--self001', ANIMATION_TIMING.YOYO_WORD)
  Animation.addClass('fatWord', 'page--alphaIn', ANIMATION_TIMING.FAT_WORD)

  // Block animations
  Animation.addClass('bannerBlock', 'animation-block-right', ANIMATION_TIMING.BANNER)
  Animation.addClass('contactBlock', 'animation-block-left', ANIMATION_TIMING.CONTACT)
  Animation.addClass('contactListBlock', 'animation-block-down', ANIMATION_TIMING.CONTACT_LIST)

  // Facebook button animation
  Animation.addClass('buttonFacebook', 'animation-scale-90-show-start', ANIMATION_TIMING.FACEBOOK_BUTTON)
  Animation.addClass('buttonFacebook', 'animation-scale-90-show-end', ANIMATION_TIMING.FACEBOOK_BUTTON_END)
  setTimeout(() => {
    Animation.removeClass('buttonFacebook', 'animation-scale-90-show-start')
  }, ANIMATION_TIMING.FACEBOOK_BUTTON_END)

  // Game list animations
  Animation.addClass('gameListBlock', 'animation-block-up', ANIMATION_TIMING.GAME_LIST)
  Animation.addClass('gameBlock1', 'animation-block-right', ANIMATION_TIMING.GAME_BLOCK)

  // Game item animations
  const gameBlocks = ['block1GameList', 'block1GameList2', 'block1GameList3']
  gameBlocks.forEach(block => {
    Animation.addSubClass(block, 'animation-item-intro', ANIMATION_TIMING.GAME_ITEM)
    Animation.removeSubClass(block, 'animation-item-intro', ANIMATION_TIMING.GAME_ITEM_END)
    Animation.addSubClass(block, 'alpha-1', ANIMATION_TIMING.GAME_ITEM_ALPHA)
  })

  // Logo effect
  setTimeout(() => {
    ArtsEffect.thickness('logoBox', 7, '#b14c4a', '#2a0303')
  }, ANIMATION_TIMING.LOGO_EFFECT)
}

const clickListener = (actions: string) => {
  switch (actions) {
    case ACTIONS.RELOAD:
      window.location.reload()
      break
    case GAME.ELECTRONIC.SNAKE:
      changePath(STATIC.SPACE, PATH_NAME.SNAKE)
      break
    case GAME.ELECTRONIC.RACING:
      changePath(STATIC.SPACE, PATH_NAME.RACING)
      break
    case GAME.ELECTRONIC.TETRIMINOS:
      changePath(STATIC.SPACE, PATH_NAME.TETRIMINOS)
      break
    case GAME.ELECTRONIC.LOTTERY:
      changePath(STATIC.SPACE, PATH_NAME.LOTTERY)
      break
  }
}

const changePath = (_target: string, _name: string) => {
  Animation.addClass('lobbyContainer', 'animation-load-out', 10)
  setTimeout(() => {
    if (_target) router.replace({ path: _target })
    if (_name) router.replace({ name: _name })
    setTimeout(() => { window.location.reload() }, ANIMATION_TIMING.PATH_RELOAD)
  }, ANIMATION_TIMING.PATH_CHANGE)
}

const init = () => {
  Net.test({
    title: 'TEST_這是標題',
    body: 'TEST_這是身體',
    userId: 'TEST_a1234567',
  }).then((res: Object) => {
    console.log('TEST.API.RES', res)
  })
}

onMounted(() => {
  console.log('onMounted')
  init()
  Splitting()
  new Lobby()

  nextTick(() => {
    console.log('nextTick')
    initAnimations()
    setupHoverEffects()
  })
})

const setupHoverEffects = () => {
  // Game list hover effect
  $('#gameListBlock').find('[tag="GAMELIST"]').hover(() => {
    const note = $('#gameListBlock').find('[tag="NOTE"]')
    const hoverClass = 'note-gamelist-right'
    if (!note.attr('class')?.split(' ').includes(hoverClass)) {
      note.addClass(hoverClass)
      setTimeout(() => note.removeClass(hoverClass), 1700)
    }
  })

  // Contact list hover effect
  $('#contactListBlock').hover(() => {
    const note = $('#contactBlock').find('[tag="NOTE"]')
    const hoverClass = 'note-contact-left'
    if (!note.attr('class')?.split(' ').includes(hoverClass)) {
      note.addClass(hoverClass)
      setTimeout(() => note.removeClass(hoverClass), 1700)
    }
  })
}

</script>

<template>
  <div class="gameLobby animations">
    <div id="loadPage" class="loadPage"> </div>
    <div id="lobbyContainer" class="lobbyContainer">
      <div id="nvbarBlock" class="nvbar">
        <div class="nvbarContainer">
          <div class="content-block">
            <div id="logoBox" class="logo">
              <div class="logoBox">
                <span class="firstWord">H</span>
                <span id="appyWord" class="appyWord self" data-splitting>APPY</span>
                <span id="fatWord" class="fatWord self" data-splitting>FAT</span>
                <span id="yoyoWord" class="yoyoWord self" data-splitting> yoyo </span>
              </div>
              <div id="logoLine" class="line1"></div>
            </div>
            <div>center</div>
            <div class="settings">
              <div class="listBox">
                <span class="item setting-text self button--float" @click="clickListener(ACTIONS.RELOAD)"> RELOAD
                </span>
              </div>
            </div>
          </div>
          <div class="footer"></div>
        </div>
      </div>

      <!-- __MAIN__ -->
      <div class="main">
        <div class="header">
          <div id="bannerBlock" class="bannerBlock">
            <div class="content-block"> banner </div>
            <span class="item setting-text"> INTRODUCE </span>
            <div class="footer"></div>
          </div>
          <!-- <div class="contactBlock">
            <div id="contactBlock" class="content-block">
              <span class="item setting-text"> CONTACT </span>
              <span id="buttonFacebook" class="item button-facebook"> FACEBOOK </span>

              <div id="contactListBlock" class="list-block">
                <span class="item button-email"> EMAIL </span>
                <span class="item button-linkedin"> LINKEDIN </span>
                <span class="item button-instagram"> INSTAGRAM </span>
                <span class="item button-line"> LINE </span>
              </div>

              <div class="header-footer"></div>
              <div class="footer"></div>
            </div>
          </div> -->
        </div>
        <div class="header-left">
          <div class="contactBlock">
            <div id="contactBlock" class="content-block">
              <span class="item setting-text"> CONTACT </span>
              <span id="buttonFacebook" class="item button-facebook"> FACEBOOK </span>

              <div id="contactListBlock" class="list-block">
                <span class="item button-email"> EMAIL </span>
                <span class="item button-linkedin"> LINKEDIN </span>
                <span class="item button-instagram"> INSTAGRAM </span>
                <span class="item button-line"> LINE </span>
              </div>

              <span class="note note-text" tag="NOTE">有錢賺聯絡我 (Ò ‸ Ó╬)</span>
              <div class="header-footer"></div> <!-- mask -->
              <div class="footer"></div>
            </div>
          </div>
        </div>

        <!-- center1 -->
        <div class="center">
          <div class="nvbarBlock">
            <Nvbar></Nvbar>
          </div>
          <div id="gameListBlock" class="gameListBlock">
            <span class="note note-text" tag="NOTE"> (〃°ω°〃)上班好累喔！ 玩一下遊戲吧 ♡♥♥♥♡♡</span>
            <span class="item setting-text" tag="GAMELIST"> GAMELIST
              <span class="path00"></span>
              <span class="path01 title-rotate"></span>
            </span>
            <div class="footer"></div>
          </div>

          <!-- GAME.ELECTRONIC.BLOCK01 -->
          <div id="gameBlock1" class="list-block-1">
            <span class="item setting-text"> ELECTRONIC </span>
            <div id="block1GameList" class="list-game-block">
              <!-- HTML. default icon sample ? -->
              <!-- <div style="--item-index: 2;" class="game-icon game-block ready">
                <div class="content">?</div>
              </div> -->
              <GameIcon style="--item-index: 4;" />
              <GameIcon style="--item-index: 3;" />
              <GameIcon style="--item-index: 2;" :title="'Tetriminos'" :status="STATUS_ICON.DEFAULT"
                @click="clickListener(GAME.ELECTRONIC.TETRIMINOS)" />
              <GameIcon style="--item-index: 1;" :status="STATUS_ICON.RACING"
                @click="clickListener(GAME.ELECTRONIC.RACING)" />
              <GameIcon style="--item-index: 0;" :status="STATUS_ICON.SNAKE"
                @click="clickListener(GAME.ELECTRONIC.SNAKE)" />
            </div>
          </div>

          <div class="gameOtherBlock">
            <!-- GAME.ELECTRONIC.BLOCK02 -->
            <div id="gameBlock2" class="list-block-2">
              <span class="item setting-text"> ELECTRONIC </span>
              <div id="block1GameList2" class="list-game-block">
                <GameIcon style="--item-index: 0;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 1;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 2;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 3;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 4;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 5;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 6;" :status="STATUS_ICON.COMINGSOON" />
              </div>
            </div>
            <!-- GAME.ELECTRONIC.BLOCK03 -->
            <div id="gameBlock3" class="list-block-3">
              <span class="item setting-text"> ELECTRONIC </span>
              <div id="block1GameList3" class="list-game-block">
                <GameIcon style="--item-index: 5;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 4;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 3;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 2;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 1;" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 0;" :status="STATUS_ICON.COMINGSOON" />
              </div>
            </div>
          </div>
        </div>
        <!-- center2 -->
        <div class="center2">
        </div>
        <!-- center2.end -->
        <div class="center end">
        </div>
      </div>
      <!-- <div class="main-footer"></div> -->
      <MainFooter id="mainFooter" />
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/css/game/gameLobby.scss";
</style>
