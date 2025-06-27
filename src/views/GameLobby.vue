<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Splitting from 'splitting'
  import Net from '@/logic/base/Net'

  import Animation from '@/logic/utils/Animation'
  import ArtsEffect from '@/logic/utils/ArtsEffect'
  import { ACTIONS, GAME, STATIC, PATH_NAME, STATUS_ICON } from '@/logic/utils/Parameter'
  import Lobby from '@/logic/lobby/Lobby'
  import Nvbar from '@/components/Ui/NvbarList.vue'
  import GameIcon from '@/components/Lobby/GameIcon.vue'
  import PluginCenter2 from '@/components/Lobby/Center2/Index.vue'
  import PluginCenter3 from '@/components/Lobby/Center3/Index.vue'
  import MainFooter from '@/components/Lobby/Footer.vue'
  import PluginGameBoyAnim from '@/components/SelfIcon/PluginGameBoyAnim.vue'
  import Tools from '@/logic/utils/Tools'

  const router = useRouter()
  defineOptions({
    name: 'GameLoddy',
    inheritAttrs: false
  })

  const state = reactive({
    mainDom: null as HTMLElement | null,
    hasDom: false,
    ticking: false,
    isInit: false,
    timeCheck: false,
    lastScrollTop: 0,
    lastScrollTimestamp: 0
  })

  const selfRefs = reactive({
    pluginCenter2: null
  })
  // 用於綁定 ref 的函式
  const setRef = (el: any) => {
    if (el) selfRefs.pluginCenter2 = el
  }

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
    Animation.addClass(
      'buttonFacebook',
      'animation-scale-90-show-start',
      ANIMATION_TIMING.FACEBOOK_BUTTON
    )
    Animation.addClass(
      'buttonFacebook',
      'animation-scale-90-show-end',
      ANIMATION_TIMING.FACEBOOK_BUTTON_END
    )
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
        // window.location.reload()
        router.replace({ name: PATH_NAME.WELCOME })
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

      case ACTIONS.SCROLL_TOP:
        // console.log('ACTIONS.SCROLL_TOP')
        if (state.hasDom) state.mainDom!.scrollTo({ top: 0, behavior: 'smooth' })
        break
    }
  }
  const changePath = (_target: string, _name: string) => {
    Animation.addClass('lobbyContainer', 'animation-load-out', 10)
    setTimeout(() => {
      if (_target) router.replace({ path: _target })
      if (_name) router.replace({ name: _name })
      setTimeout(() => {
        window.location.reload()
      }, ANIMATION_TIMING.PATH_RELOAD)
    }, ANIMATION_TIMING.PATH_CHANGE)
  }

  const func = {
    ts() {
      return new Date().getTime()
    }
  }
  const updateState = {
    setMainDom() {
      const dom = document.querySelector('.gameLobby')
      if (dom) {
        state.hasDom = true
        state.mainDom = dom as HTMLElement
      }
    }
  }
  const handle = {
    scroll() {
      if (state.ticking) return
      state.ticking = true
      const scrollTop = state.mainDom!.scrollTop || 0
      const direction = scrollTop > state.lastScrollTop ? scrollAnim.DOWN : scrollAnim.UP
      state.lastScrollTop = scrollTop
      state.lastScrollTimestamp = func.ts()
      // console.log('scroll', state.mainDom!.scrollTop, direction)

      // ***run.something.start
      // __process.nvbar animation__
      if (scrollTop <= 25 && direction === scrollAnim.UP) scrollAnim.top35_show()
      if (scrollTop > 35 && direction === scrollAnim.DOWN) scrollAnim.top35_hide()
      // __banner__
      if (scrollTop <= 70 && direction === scrollAnim.UP) scrollAnim.top135_show()
      if (scrollTop > 135 && direction === scrollAnim.DOWN) scrollAnim.top135_hide()
      // __contact__
      if (scrollTop <= 180 && direction === scrollAnim.UP) scrollAnim.top250_show()
      if (scrollTop > 250 && direction === scrollAnim.DOWN) scrollAnim.top250_hide()
      // __gameList.1.block__
      if (scrollTop <= 290) scrollAnim.top290_show()
      if (scrollTop > 290 && direction === scrollAnim.DOWN) scrollAnim.top290_hide()
      // __gameList.2.block__
      if (scrollTop <= 500) scrollAnim.top500_show()
      if (scrollTop > 500 && direction === scrollAnim.DOWN) scrollAnim.top500_hide()

      // __START-CENTER2__
      if (scrollTop >= 420 && scrollTop <= 880) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1Show()
      }
      if ((scrollTop >= 1050 && direction === scrollAnim.DOWN) || scrollTop < 300) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1Hide()
      }
      if (
        (scrollTop >= 700 && scrollTop <= 880) ||
        (scrollTop <= 1300 && scrollTop >= 880 && direction === scrollAnim.UP)
      ) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1BarShow()
      }
      if ((scrollTop >= 1350 && direction === scrollAnim.DOWN) || scrollTop < 600) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1BarHide()
      }
      if (scrollTop >= 1000 && scrollTop < 1700) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1MainShow()
      }
      if (scrollTop < 600 || (scrollTop >= 1750 && direction === scrollAnim.DOWN)) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1MainHide()
      }
      if (scrollTop >= 1200 && scrollTop < 2200) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1DetailShow()
      }
      if (scrollTop < 600 || (scrollTop >= 2250 && direction === scrollAnim.DOWN)) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.actions.idBlock1DetailHide()
      }

      // __ADD.MOUSE.EFFECT__
      if (scrollTop >= 800 && scrollTop < 2300) {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.setup.add_center2_effect()
      } else {
        if (selfRefs.pluginCenter2) selfRefs.pluginCenter2?.setup.remove_center2_effect()
      }

      // __START-CENTER3__

      // __process.banner animation__
      // ***run.something.end
      state.ticking = false
    },
    timerCheck() {
      const now = func.ts()
      const delta = now - state.lastScrollTimestamp
      this.checkScroll(delta)
      setTimeout(() => this.timerCheck(), 500)
    },
    checkScroll(delta: number) {
      // if (state.lastScrollTimestamp <= 0) return
      // if (!state.isInit) return
      if (delta < 500) return
      if (state.timeCheck) return
      state.timeCheck = true
      handle.scroll()
    }
  }
  const init = {
    test() {
      Net.test({
        title: 'TEST_這是標題',
        body: 'TEST_這是身體',
        userId: 'TEST_a1234567'
      }).then((res: Object) => {
        console.log('TEST.API.RES', res)
      })
    },
    run() {
      Splitting()
      new Lobby()

      // -state.settings-
      updateState.setMainDom()
      setup.hover_main_dom()
      handle.timerCheck()
    }
  }
  const scrollAnim = {
    UP: 'up' as const,
    DOWN: 'down' as const,
    scrollRecode: {
      top35_show: false,
      top35_hide: false,
      top135_show: false,
      top135_hide: false,
      top250_show: false,
      top250_hide: false,
      top290_show: false,
      top290_hide: false,
      top500_show: false,
      top500_hide: false
    },

    top35_show() {
      if (scrollAnim.scrollRecode.top35_show) return
      scrollAnim.scrollRecode.top35_show = true

      $('.nvbarContainer').show(10, () => {
        Animation.addClass('nvbarBlock', 'animation-block-down', 10)

        Animation.addClass('logoBox', 'page--alphaIn', ANIMATION_TIMING.LOGO)
        Animation.addClass('appyWord', 'headline--self001', ANIMATION_TIMING.APPY_WORD)
        Animation.addClass('yoyoWord', 'headline--self001', ANIMATION_TIMING.YOYO_WORD)
        Animation.addClass('fatWord', 'page--alphaIn', ANIMATION_TIMING.FAT_WORD)

        scrollAnim.scrollRecode.top35_hide = false
      })
    },
    top35_hide() {
      if (scrollAnim.scrollRecode.top35_hide) return
      scrollAnim.scrollRecode.top35_hide = true
      $('.nvbarContainer').hide(300, () => {
        // 隱藏後的動作
        $('#nvbarBlock').css({
          'background-color': 'transparent'
        })
        Animation.removeClass('nvbarBlock', 'animation-block-down')

        Animation.removeClass('logoBox', 'page--alphaIn')
        Animation.removeClass('appyWord', 'headline--self001')
        Animation.removeClass('yoyoWord', 'headline--self001')
        Animation.removeClass('fatWord', 'page--alphaIn')
        scrollAnim.scrollRecode.top35_show = false
      })
    },

    top135_show() {
      if (scrollAnim.scrollRecode.top135_show) return
      scrollAnim.scrollRecode.top135_show = true

      $('#bannerBlock').removeClass('anim-banner-out')
      Tools.delay(10).then(() => {
        $('#bannerBlock').addClass('animation-block-right')
        scrollAnim.scrollRecode.top135_hide = false
      })
    },
    top135_hide() {
      if (scrollAnim.scrollRecode.top135_hide) return
      scrollAnim.scrollRecode.top135_hide = true

      $('#bannerBlock').addClass('anim-banner-out')
      Tools.delay(450).then(() => {
        $('#bannerBlock').removeClass('animation-block-right')
        scrollAnim.scrollRecode.top135_show = false
      })
    },

    top250_show() {
      if (scrollAnim.scrollRecode.top250_show) return
      scrollAnim.scrollRecode.top250_show = true

      $('#contactBlock').removeClass('anim-contact-out')
      Tools.delay(10).then(() => {
        Animation.addClass('bannerBlock', 'animation-block-right', 10)
        Animation.addClass('contactBlock', 'animation-block-left', 400)
        Animation.addClass('contactListBlock', 'animation-block-down', 1000)
        Animation.addClass('buttonFacebook', 'animation-scale-90-show-start', 1500)
        Animation.addClass('buttonFacebook', 'animation-scale-90-show-end', 2000)
        if (scrollAnim.scrollRecode.top250_hide) {
          Animation.removeClass('buttonFacebook', 'animation-scale-90-show-start')
          Animation.removeClass('buttonFacebook', 'animation-scale-90-show-end')
        }
        // Tools.delay(1500).then(() => {
        //   Animation.removeClass('buttonFacebook', 'animation-scale-90-show-start')
        //   Animation.addClass('buttonFacebook', 'animation-scale-90-show-end', 10)
        // })
        Tools.delay(2000).then(() => {
          scrollAnim.scrollRecode.top250_hide = false
        })
      })
    },
    top250_hide() {
      if (scrollAnim.scrollRecode.top250_hide) return
      scrollAnim.scrollRecode.top250_hide = true

      $('#contactBlock').addClass('anim-contact-out')
      Animation.removeClass('buttonFacebook', 'animation-scale-90-show-start')
      Animation.removeClass('buttonFacebook', 'animation-scale-90-show-end')

      Tools.delay(450).then(() => {
        $('#contactBlock').removeClass('animation-block-right')

        Animation.removeClass('bannerBlock', 'animation-block-right')
        Animation.removeClass('contactBlock', 'animation-block-left')
        Animation.removeClass('contactListBlock', 'animation-block-down')
        scrollAnim.scrollRecode.top250_show = false
      })
    },

    top290_show() {
      if (scrollAnim.scrollRecode.top290_show) return
      scrollAnim.scrollRecode.top290_show = true
      $('#gameBlock1').removeClass('anim-gameBlock1-out')
      Tools.delay(10).then(() => {
        Animation.addClass('gameBlock1', 'animation-block-right', 10)
        setTimeout(() => {
          const gameBlocks = ['block1GameList']
          gameBlocks.forEach(block => {
            Animation.addSubClass(block, 'animation-item-intro', 10)
            Animation.removeSubClass(block, 'animation-item-intro', 1100)
            Animation.addSubClass(block, 'alpha-1', 1100)
          })
          scrollAnim.scrollRecode.top290_hide = false
        }, 450)
      })
    },
    top290_hide() {
      if (scrollAnim.scrollRecode.top290_hide) return
      scrollAnim.scrollRecode.top290_hide = true

      const gameBlocks = ['block1GameList']
      gameBlocks.forEach(block => {
        Animation.addSubClass(block, 'anim-icon-out', 10)
        Animation.removeSubClass(block, 'anim-icon-out', 1100)
        Animation.removeSubClass(block, 'alpha-1', 1100)
      })
      setTimeout(() => {
        $('#gameBlock1').addClass('anim-gameBlock1-out')
        Tools.delay(450).then(() => {
          Animation.removeClass('gameBlock1', 'animation-block-right')
          scrollAnim.scrollRecode.top290_show = false
        })
      }, 700)
    },

    top500_show() {
      if (scrollAnim.scrollRecode.top500_show) return
      scrollAnim.scrollRecode.top500_show = true

      Tools.delay(10).then(() => {
        Animation.addClass('gameListBlock', 'animation-block-up', 10)

        const gameBlocks = ['block1GameList2', 'block1GameList3']
        gameBlocks.forEach(block => {
          Animation.addSubClass(block, 'animation-item-intro', 100)
          Animation.removeSubClass(block, 'animation-item-intro', 1000)
          Animation.addSubClass(block, 'alpha-1', 900)
        })

        scrollAnim.scrollRecode.top500_hide = false
      })
    },
    top500_hide() {
      if (scrollAnim.scrollRecode.top500_hide) return
      scrollAnim.scrollRecode.top500_hide = true
      const gameBlocks = ['block1GameList2', 'block1GameList3']
      gameBlocks.forEach(block => {
        Animation.addSubClass(block, 'anim-icon-out', 10)
        Animation.removeSubClass(block, 'anim-icon-out', 1100)
        Animation.removeSubClass(block, 'alpha-1', 1100)
      })
      setTimeout(() => {
        $('#gameListBlock').addClass('anim-gameListBlock-out')
        Tools.delay(450).then(() => {
          Animation.removeClass('gameListBlock', 'animation-block-up')
          Animation.removeClass('gameListBlock', 'anim-gameListBlock-out')
          scrollAnim.scrollRecode.top500_show = false
        })
      }, 1200)
    }
  }
  // -SETUP. SOMETHING-
  const setup = {
    hover_note_effects() {
      // Game list hover effect
      $('#gameListBlock')
        .find('[tag="GAMELIST"]')
        .hover(() => {
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
    },
    hover_main_dom() {
      state.mainDom!.addEventListener('scroll', function () {
        handle.scroll()
        state.timeCheck = false
      })
    }
  }

  onMounted(() => {
    // state.isReady = true
    // if (!state.isReady) return
    init.test()
    init.run()
    nextTick(() => {
      initAnimations()
      setup.hover_note_effects()

      console.log('selfRefs', selfRefs.pluginCenter2)
      if (selfRefs.pluginCenter2) {
        selfRefs.pluginCenter2.test()
      }
    })
  })
</script>

<template>
  <div class="gameLobby animations">
    <div id="loadPage" class="loadPage"></div>
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
                <span
                  class="item setting-text self button--float"
                  @click="clickListener(ACTIONS.RELOAD)"
                >
                  RELOAD
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
            <div class="content-block">banner</div>
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
              <div class="header-footer"></div>
              <!-- mask -->
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
            <span class="note note-text" tag="NOTE">
              (〃°ω°〃)上班好累喔！ 玩一下遊戲吧 ♡♥♥♥♡♡</span
            >
            <span class="item setting-text" tag="GAMELIST">
              GAMELIST
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
              <GameIcon style="--item-index: 4" />
              <GameIcon style="--item-index: 3" />
              <GameIcon
                style="--item-index: 2"
                :title="'Tetriminos'"
                :status="STATUS_ICON.DEFAULT"
                @click="clickListener(GAME.ELECTRONIC.TETRIMINOS)"
              />
              <GameIcon
                style="--item-index: 1"
                :status="STATUS_ICON.RACING"
                @click="clickListener(GAME.ELECTRONIC.RACING)"
              />
              <GameIcon
                style="--item-index: 0"
                :status="STATUS_ICON.SNAKE"
                @click="clickListener(GAME.ELECTRONIC.SNAKE)"
              />
            </div>
          </div>

          <div class="gameOtherBlock">
            <!-- GAME.ELECTRONIC.BLOCK02 -->
            <div id="gameBlock2" class="list-block-2">
              <span class="item setting-text"> ELECTRONIC </span>
              <div id="block1GameList2" class="list-game-block">
                <GameIcon style="--item-index: 0" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 1" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 2" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 3" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 4" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 5" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 6" :status="STATUS_ICON.COMINGSOON" />
              </div>
            </div>
            <!-- GAME.ELECTRONIC.BLOCK03 -->
            <div id="gameBlock3" class="list-block-3">
              <span class="item setting-text"> ELECTRONIC </span>
              <div id="block1GameList3" class="list-game-block">
                <GameIcon style="--item-index: 5" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 4" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 3" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 2" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 1" :status="STATUS_ICON.COMINGSOON" />
                <GameIcon style="--item-index: 0" :status="STATUS_ICON.COMINGSOON" />
              </div>
            </div>
          </div>
        </div>
        <!-- center2 -->
        <PluginCenter2 :ref="el => setRef(el)" />
        <!-- center3 -->
        <PluginCenter3 />
        <div class="center end"></div>
      </div>
      <!-- <div class="main-footer"></div> -->
      <MainFooter id="mainFooter" />

      <!-- GAMEBOYICON 回到頂端按鈕 -->
      <div style="position: fixed; bottom: 20px; right: 25px; z-index: 90">
        <PluginGameBoyAnim
          :size="90"
          :text="'HAPPY FAT YOYO'"
          @click="clickListener(ACTIONS.SCROLL_TOP)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../assets/css/game/gameLobby.scss';

  .gameboy-icon {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);

      .gameboy-svg {
        .gameboy-screen {
          animation: screenGlow 2s infinite;
        }

        .gameboy-button {
          animation: buttonPress 0.5s infinite;
        }

        .gameboy-dpad {
          animation: dpadGlow 1s infinite;
        }
      }
    }

    .gameboy-svg {
      width: 100%;
      height: 100%;

      .gameboy-body {
        fill: #9bbc0f; // GameBoy 經典綠色
        stroke: #0f380f; // 深綠色邊框
        stroke-width: 2;
      }

      .gameboy-screen {
        fill: #0f380f; // 深綠色螢幕
        opacity: 0.9;
      }

      .gameboy-button {
        fill: #0f380f; // 深綠色按鈕
        opacity: 0.9;
      }

      .gameboy-dpad {
        stroke: #0f380f; // 深綠色方向鍵
        stroke-width: 2;
        fill: none;
      }
    }
  }

  @keyframes screenGlow {
    0%,
    100% {
      opacity: 0.9;
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes buttonPress {
    0%,
    100% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }
  }

  @keyframes dpadGlow {
    0%,
    100% {
      stroke-opacity: 1;
    }

    50% {
      stroke-opacity: 0.7;
    }
  }

  #nvbarBlock {
    transition: opacity 0.3s ease;
    opacity: 1;
    visibility: visible;

    &.hidden {
      opacity: 0;
      visibility: visible;
    }
  }
</style>
