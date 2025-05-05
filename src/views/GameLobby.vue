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
// const state = reactive({ })

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
    setTimeout(() => { window.location.reload() }, 10)
  }, 1300)
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

    // layout
    Animation.addClass('nvbarBlock', 'animation-block-down', 10)
    Animation.addClass('mainFooter', 'animation-block-down', 10)

    // logo
    Animation.addClass('logoBox', 'page--alphaIn', 500)
    Animation.addClass('appyWord', 'headline--self001', 1500)
    Animation.addClass('yoyoWord', 'headline--self001', 2000)
    Animation.addClass('fatWord', 'page--alphaIn', 3000)
    // Animation.addClass('logoLine', 'logo-line-move', 3300)

    Animation.addClass('bannerBlock', 'animation-block-right', 700)
    Animation.addClass('contactBlock', 'animation-block-left', 1100)
    Animation.addClass('contactListBlock', 'animation-block-down', 2000)
    Animation.addClass('buttonFacebook', 'animation-scale-90-show-start', 2500)
    Animation.addClass('buttonFacebook', 'animation-scale-90-show-end', 3000)
    setTimeout(() => {
      Animation.removeClass('buttonFacebook', 'animation-scale-90-show-start')
    }, 3000)

    // gamelist 
    Animation.addClass('gameListBlock', 'animation-block-up', 900)
    Animation.addClass('gameBlock1', 'animation-block-right', 1600)
    // Animation.addClass('gameBlock2', 'animation-block-right', 1600)

    Animation.addSubClass('block1GameList', 'animation-item-intro', 2100)
    Animation.removeSubClass('block1GameList', 'animation-item-intro', 3000)
    Animation.addSubClass('block1GameList', 'alpha-1', 2900)

    Animation.addSubClass('block1GameList2', 'animation-item-intro', 2100)
    Animation.removeSubClass('block1GameList2', 'animation-item-intro', 3000)
    Animation.addSubClass('block1GameList2', 'alpha-1', 2900)

    Animation.addSubClass('block1GameList3', 'animation-item-intro', 2100)
    Animation.removeSubClass('block1GameList3', 'animation-item-intro', 3000)
    Animation.addSubClass('block1GameList3', 'alpha-1', 2900)


    // Animation.addClass('logoBox', 'page--alphaIn', 500)
    setTimeout(() => {
      ArtsEffect.thickness('logoBox', 7, '#b14c4a', '#2a0303')
    }, 300)


    /*
     * ACTIONS. 
     */
    // __Note.gameList__
    $('#gameListBlock').find('[tag="GAMELIST"]').hover(() => {
      let _dom = $('#gameListBlock').find('[tag="NOTE"]')
      let _class = 'note-gamelist-right'
      if (!_dom.attr('class')?.split(' ').includes(_class)) {
        _dom.addClass(_class)
        setTimeout(() => {
          _dom.removeClass(_class)
        }, 1700)
      }
    })
    // __Note.contactListBlock__
    $('#contactListBlock').hover(() => {
      let _dom = $('#contactBlock').find('[tag="NOTE"]')
      let _class = 'note-contact-left'
      if (!_dom.attr('class')?.split(' ').includes(_class)) {
        _dom.addClass(_class)
        setTimeout(() => {
          _dom.removeClass(_class)
        }, 1700)
      }
    })

  })
})

</script>

<template>
  <div class="gameLobby animations">
    <!-- <div id="loadPage" class="loadPage"></div> -->
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
                <span class="item setting-text self button--float" @click="clickListener(ACTIONS.RELOAD)"> RELOAD </span>
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
              <GameIcon style="--item-index: 2;" :title="'Tetriminos'"
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
