<script setup lang="ts">
  import { reactive, onMounted, onUnmounted, computed } from 'vue'
  import { _uuid2 } from '@/logic/utils/Encrypt'
  import Animation from '@/logic/utils/Animation'
  import BlockDetail from './BlockDetail.vue'
  import GameIcon from '@/components/Lobby/GameIcon.vue'
  import Card from './Card.vue'
  import TypewriterText from './TypewriterText.vue'
  // import BubbleMachine from '@/components/SelfIcon/BubbleMachine.vue'
  import { STATUS_ICON } from '@/logic/utils/Parameter'
  import { STATUS, GameStatusType } from './Scripts/config'
  import Tools from '@/logic/utils/Tools'

  import SampleCave from '@/assets/images/game_cave.png'
  import SampleMemories from '@/assets/images/game_memories.png'
  import SampleWord from '@/assets/images/game_word.jpeg'
  import SampleAnchorhead from '@/assets/images/game_anchorhead.jpg'
  import Sample99spirits from '@/assets/images/game_99spirits.jpg'
  import SamplePyramid from '@/assets/images/game_pyramid.png'

  import SampleFIFA from '@/assets/images/game_fifa.jpg'
  import SamplePowerPros from '@/assets/images/game_powerpros.webp'
  import SampleTennis from '@/assets/images/game_tennis2.png'
  import SampleSnowCraft from '@/assets/images/game_snowcraft.jpeg'
  import SampleSki from '@/assets/images/game_ski.gif'
  import SampleVolleyball from '@/assets/images/game_volleyball.jpg'

  import SamplePatapon from '@/assets/images/game_patapon.png'
  import SampleTaiko from '@/assets/images/game_taikonotatsujin.jpg'
  import SamplePiano from '@/assets/images/game_piano.webp'
  import SampleDtxmainia from '@/assets/images/game_dtxmania.jpg'
  import SampleStepmania from '@/assets/images/game_stepmania.jpeg'
  import SampleCytus from '@/assets/images/game_cytus.png'
  // import Cave from '@/components/SelfIcon/Cave.vue'

  interface IntroduceItem {
    title: string
    icon: string
    img: {
      background: string
      note: string
    }
    content: string[]
    note: string
    tag?: string
  }

  const state = reactive({
    key: _uuid2(),
    isClick: false,
    selected: STATUS.VISUAL_NOVEL as GameStatusType,
    selectedIntroduce: 0,
    typewriterRefs: [] as any[],
    isPlaying: false,

    block1RightWidth: '50px',
    scrollY: 0,
    transform: {
      translateY: 0,
      rotate: 0
    },
    main: {
      [STATUS.VISUAL_NOVEL.name]: {
        title: '純文字冒險',
        content: [
          '只以文字作主要介面和遊戲內容。用閱讀敘事，輸入指示或選擇選項來與遊戲世界互動，探索故事、解謎或推進劇情。主題內容更是多樣，再融合了小說、角色扮演和解謎，更是大大的增加既有的遊戲性、自由度，深深地吸引著自由度與喜歡自己想像的玩家們。玩起來彷彿自己親身經歷了一段故事。'
        ],
        introduce: [
          {
            tag: 'cave',
            icon: 'CAVE',
            title: '巨洞冒險',
            img: {
              background: SampleCave,
              note: '巨洞冒險-畫面參考'
            },
            content: [
              '由於當時電腦性能限制，此遊戲沒有圖像、音樂及音效，只有純粹的文字。有如閱讀小說，玩家須閱讀畫面出現的文章，並輸入關鍵字以進行遊戲。',
              '玩法類似《龍與地下城》，不過是由電腦擔任地下城主（即遊戲管理者）的角色。電腦會以文字敘述遊戲的背景、玩家遭遇的事件、敵人、物品之類事物。',
              '玩家輸入「看」（look）的指令，電腦會敘述遊戲中玩家所在位置的背景。輸入「拿取」（take），則可拿取物品。輸入「往西走」（go west），玩家就會在遊戲中的虛擬世界中往西方前進。遊戲背景為玩家一開始位於被森林包圍的紅磚建築旁，並進入一處神秘的洞穴探險，玩家會在途中與敵人進行戰鬥，並試圖取得隱藏的寶藏。'
            ],
            note: '資料來源: wiki.巨洞冒險'
          },
          {
            tag: 'memories',
            icon: 'MEMORIES',
            title: '記憶重構',
            img: {
              background: SampleMemories,
              note: 'AI示意圖'
            },
            content: [
              '你醒來時身處陌生房間，一段記憶被抹除。你必須靠一支手機、一段監控錄像與你腦中的閃回，拼湊出真相。隨著劇情推進，你會發現背後的謎團遠比表面複雜，每個角色都有不可告人的秘密……',
              '採用分章節敘事，每章都像一部懸疑短劇。玩家扮演的主角會捲入一連串神秘案件中，從蛛絲馬跡中找出真相。結合 文字敘述、語音對話、實景照片、監控錄影 等多種表現手法，遊戲過程中需查閱資料、破解密碼、拼圖、監控回放推理，提升沉浸感與參與感。',
              '每一個選擇都可能導致劇情走向不同的方向，根據玩家的選擇，角色生死、案件結局都會改變。'
            ],
            note: '資料來源: gpt.記憶重構'
          },
          {
            tag: 'word',
            icon: 'WORD',
            title: '文字遊戲',
            img: {
              background: SampleWord,
              note: 'gpt示意圖'
            },
            content: [
              '由Team9開發的獨特解謎遊戲，其核心概念是將文字本身作為遊戲元素，不僅是敘述和介面，同時也是物件、人物和場景。 玩家需要透過刪除、移動、拆解、組合文字，來影響遊戲劇情，解決各種文字謎題。',
              '遊戲的世界由中文字構成，每個字都有其獨特的功能和意義，玩家必須靈活運用這些特性來解開謎題。玩家可以自由地操作文字，改變句子的意義，甚至改寫事實，從而影響遊戲的進程，這種高自由度是遊戲的一大亮點。',
              '需要玩家跳脫傳統思維，從文字的字形、字義、語法等層面去思考，才能找到解決方案。遊戲的故事劇情引人入勝，玩家在解謎的同時，也能體驗到一段精彩的故事。'
            ],
            note: '資料來源: google.文字遊戲'
          },
          {
            tag: 'anchorhead',
            icon: 'ANCHORHEAD',
            title: 'ANCHORHEAD',
            img: {
              background: SampleAnchorhead,
              note: 'Anchorhead-畫面參考'
            },
            content: [
              '遊戲以恐怖和心理為主題，玩家將扮演一名調查記者，在一個被稱為Anchorhead的精神病院中展開調查。遊戲採用了非線性敘事方式，玩家可以根據自己的選擇和決策來推進故事的發展。遊戲中也穿插了許多謎題和解密元素，增加了遊戲的趣味性和挑戰性。',
              '你與丈夫剛搬到一座位於海岸邊的神秘小鎮「Anchorhead」，準備開始新生活。但當你探索這個鎮上的歷史時，你會發現你們家族的過去藏有令人毛骨悚然的秘密，而一場古老的邪教儀式正悄悄重啟……'
            ],
            note: '資料來源: google.Anchorhead'
          },
          {
            tag: '99spirits',
            icon: '99SPIRITS',
            title: '九十九神',
            img: {
              background: Sample99spirits,
              note: '九十九神-畫面參考'
            },
            content: [
              '九十九神是日本獨立遊戲製作人TORaIKI的首款日式RPG遊戲。其故事圍繞著日本民間傳說展開，畫面為典型日系動漫風格，遊戲中的式神在日系遊戲中較為常見。遊戲操作簡單，基本靠滑鼠就能完成全部操作。',
              '以 女劍客 Hanabusa 為主角，她為母之仇踏上討伐九十九神道路，途中結識白狐妖 Komiya 等多位同伴與 NPC 。 每位角色都有鮮明性格，互動性強，劇情豐富。'
            ],
            note: '資料來源: google.九十九神'
          },
          {
            tag: 'pyramid',
            icon: 'PYRAMID',
            title: '神奇金字塔',
            img: {
              background: SamplePyramid,
              note: 'gpt示意圖'
            },
            content: [
              '在神秘的埃及沙漠深處，一座失落已久的金字塔重現於世。你是一名年輕的語言學家，應邀加入一支國際探險隊，目的是解開金字塔內部的遠古機關與失落文明的秘密。',
              '但在踏入金字塔後，團隊逐漸失聯，神秘的文字與詭異聲音開始出現。你必須運用對語言與符號的理解，在古老謎語、機關陷阱與潛伏危機中找到出口──或者，成為這場千年詛咒的下一位犧牲者……'
            ],
            note: '資料來源: gpt.神奇金字塔'
          }
        ]
      },
      [STATUS.SPORTS.name]: {
        title: '競技運動',
        content: [
          '模擬體育運動為主的內容、一般會以真實世界的運動賽事為藍本，涵蓋足球、籃球、棒球、網球、高爾夫、賽車等眾多項目。玩家可以選擇扮演運動員，賽車手，體驗競技刺激的樂趣，身臨其境體驗一些極限運動的刺激與速度感。'
        ],
        introduce: [
          {
            tag: 'fifa',
            icon: 'FIFA',
            title: 'FIFA',
            img: {
              background: SampleFIFA,
              note: 'FIFA-畫面參考'
            },
            content: [
              '遊戲以逼真的方式呈現足球運動，讓玩家可以操作世界各地的球員和球隊，在大型聯賽中爭奪勝利。 遊戲包含了多種模式，例如FIFA Ultimate Team、職業生涯模式、EA SPORTS VOLTA FOOTBALL等，讓玩家可以體驗不同層面的足球魅力。',
              '擁有超過17,000名球員、700支球隊、90座球場以及30多個聯盟的授權，每年都會推出新的版本，加入新的功能和改進，讓玩家保持新鮮感，以精細的畫面和細節，呈現真實的足球比賽，讓玩家仿佛置身於賽場之中。'
            ],
            note: '資料來源: google.FIFA'
          },
          {
            tag: 'power-pros',
            icon: 'POWERPROS',
            title: '實況野球',
            img: {
              background: SamplePowerPros,
              note: 'Power Pros-畫面參考'
            },
            content: [
              '以原創球員高中或大學棒球生涯的基礎訓練與隨機事件組成，可藉由這些事件與訓練增加經驗值，玩家可將這些經驗值自由分配到想學的技能與能力點上，從而創造出一位玩家心中理想的原創球員，進而打造出一隻原創球隊，該原創球隊可併入其他模式依同遊玩。'
            ],
            note: '資料來源: wiki.實況野球'
          },
          {
            tag: 'tennis',
            icon: 'TENNIS',
            title: '網球王子',
            img: {
              background: SampleTennis,
              note: '網球王子-畫面參考'
            },
            content: [
              '在GB平台，遊戲通常角色扮演和網球對戰元素，讓玩家可以操作網球王子中的角色，體驗不同的故事劇情，並在比賽中一較高下。 此外，遊戲中也常會有收集和育成角色的要素，讓玩家更深入地了解網球王子的世界觀和角色魅力。',
              '可以通過遊戲中的各種方式來提升角色的能力，例如訓練、升級等，讓玩家的角色在對戰中更具優勢。可以收集卡片、角色模型等要素，讓玩家可以收集自己喜歡的角色和道具，增加遊戲的收藏價值。可以操作自己喜歡的角色，進行網球對戰，遊戲中通常會有不同的技巧和必殺技，讓對戰更具策略性和娛樂性。'
            ],
            note: '資料來源: google.網球王子'
          },
          {
            tag: 'snowcraft',
            icon: 'SNOWCRAFT',
            title: '打雪仗',
            img: {
              background: SampleSnowCraft,
              note: '打雪仗-畫面參考'
            },
            content: [
              '玩法上非常的簡單，在每個關卡中，玩家都會有三個穿紅衣的小朋友可以控制，並透過閃躲與丟雪球攻擊，將對面穿著綠色外套的小朋友全部擊倒即可過關並獲得分數，但可別小看這些穿著綠色外套的小朋友們啊，因為關卡越到後面，玩家的紅色小朋友數量並不會增加唷，會增加的只有綠色小朋友的數量，所以到了越後面的關卡，很有可能會出現十幾個打3個的局面喔，非常的有挑戰性。'
            ],
            note: '資料來源: google.打雪仗'
          },
          {
            tag: 'ski-free',
            icon: 'SKI',
            title: '滑雪冒險',
            img: {
              background: SampleSki,
              note: '滑雪-畫面參考'
            },
            content: [
              '背景Chris Pirih於1991年創作，遊戲目標簡單，飛下斜坡略過障礙。Pirih因為個人興趣編寫的SkiFree（使用C語言）。',
              '復古經典小遊戲，滑雪要躲避障礙物，一路往下滑過關，當滑行距離超過2000m的時候，就會有雪怪跑出來追你!'
            ],
            note: '資料來源: google.滑雪'
          },
          {
            tag: 'volleyball',
            icon: 'VOLLEYBALL',
            title: '沙灘排球',
            img: {
              background: SampleVolleyball,
              note: '熱血沙灘排球-畫面參考'
            },
            content: [
              ' 熱血沙灘排球是一款休閒益智的像素風體育排球競技遊戲，玩家在遊戲中可以收集解鎖不同的角色，組成自己的排球隊伍，挑戰越來越強的對手，不斷獲得勝利，升級自己的能力，戰勝對手和獲得獎勵！有超過120個角色和35個排球可供選擇，你也可以改變場上的位置。'
            ],
            note: '資料來源: google.熱血沙灘排球'
          }
        ]
      },
      [STATUS.MUSIC.name]: {
        title: '韻律節奏',
        content: [
          '提供了另一種獨特的娛樂體驗，考驗玩家的節奏感和反應速度，讓玩家配合音樂節奏進行操作，通常包含按鍵、舞蹈或歌唱等玩法。讓玩家在享受音樂的同時，也能訓練反應能力和節奏感。隨著科技的進步，這類遊戲的玩法和呈現方式也越來越豐富，吸引了越來越多的玩家參與。'
        ],
        introduce: [
          {
            tag: 'patapon',
            icon: 'PATAPON',
            title: '戰鼓啪打碰',
            img: {
              background: SamplePatapon,
              note: '戰鼓啪打碰-畫面參考'
            },
            content: [
              '玩家將扮演神明，指揮像眼球般的生物「PATAPON」進行冒險。 遊戲的核心玩法是透過敲擊四種不同節奏的太鼓，來下達指令，引導PATAPON 部隊前進、攻擊、防禦等....',
              '以其獨特的節奏指令系統、豐富的PATAPON 兵種、以及兼具策略性和操作性的遊戲性，吸引了許多玩家的喜愛。'
            ],
            note: '資料來源: google.patapon'
          },
          {
            tag: 'taiko-no-tatsujin',
            icon: 'TAIKO',
            title: '太鼓達人',
            img: {
              background: SampleTaiko,
              note: '太鼓達人-畫面參考'
            },
            content: [
              '是一款跟著音樂節奏敲打太鼓的節奏遊戲。 玩家需要根據螢幕上顯示的音符，配合音樂節奏，敲擊太鼓的鼓面或邊緣，準確地完成演奏。 遊戲有多種模式，包括單人演奏、雙人對戰、線上對戰，以及收錄了各種不同類型樂曲的歌曲庫，讓玩家可以盡情享受打鼓的樂趣。',
              '遊戲收錄了各種不同類型的樂曲，包括流行音樂、動畫歌曲、古典音樂、原創歌曲等，且每首樂曲都有不同的難度和節奏。是一款操作簡單、樂趣十足的節奏遊戲，無論是新手還是老玩家，都能在遊戲中找到樂趣。 多樣化的遊玩模式和豐富的樂曲庫，讓玩家可以盡情享受打鼓的樂趣。'
            ],
            note: '資料來源: google.太鼓達人'
          },
          {
            tag: 'piano',
            icon: 'PIANO',
            title: '鋼琴大師',
            img: {
              background: SamplePiano,
              note: '鋼琴大師-畫面參考'
            },
            content: [
              '是一款結合了音樂和節奏元素的單機遊戲。玩家需要根據音樂節奏點擊螢幕上的音符，完成關卡挑戰，體驗音樂與遊戲的完美結合。 遊戲提供多種音樂選擇和難度設置，適合不同程度的玩家。',
              '玩家需要跟著音樂節奏點擊螢幕上的音符，體驗指尖跳躍的快感。內包含大量經典鋼琴曲和流行歌曲，滿足不同玩家的音樂喜好。提供不同難度和挑戰模式，讓玩家根據自身等級選擇。搭配音樂節奏，帶來視聽享受。'
            ],
            note: '資料來源: google.鋼琴大師'
          },
          {
            tag: 'dtxmania',
            icon: 'DTXMANIA',
            title: 'DTXMANIA',
            img: {
              background: SampleDtxmainia,
              note: 'dtxmania-畫面參考'
            },
            content: [
              '是一款電玩模擬器，是一種讓玩家使用電子鼓模擬打鼓的音樂遊戲。 玩家可以搭配遊戲軟體，透過敲擊電子鼓的鼓面，來跟著遊戲中的節奏軌跡進行演奏，享受打鼓的樂趣。 許多電子鼓遊戲還提供豐富的歌曲庫和譜面，讓玩家可以挑戰不同風格的音樂，並練習打鼓技巧。',
              '遊戲可以採用"中斷遊戲"，失血過多就會進入"FAIL"，那可是相當令人相當惋惜的；相對的，過關後所得到的成就感也是相當的令人滿足。最大的特色允許玩家自行編排和創作，也就是說，你能把你手中的鼓譜編進遊戲中，並加入歌曲或節拍器，就能做到專屬於自己的遊戲資料。'
            ],
            note: '資料來源: google.dtxmania'
          },
          {
            tag: 'step-mania',
            icon: 'STEPMANIA',
            title: 'STEPMANIA',
            img: {
              background: SampleStepmania,
              note: 'StepMania-畫面參考'
            },
            content: [
              '是一款免費且開放原始碼的舞蹈和節奏遊戲，讓玩家透過鍵盤或跳舞毯來進行遊戲，模擬跳舞機的體驗。 玩家需要在音樂節拍對應的時間點，按下對應方向的按鍵或跳上跳舞毯上的對應區域，遊戲會根據準確度給予評價。',
              '遊戲畫面中，箭頭會從螢幕下方向上滾動，玩家需要在箭頭到達上方指定區域時，按下對應的按鍵或跳上跳舞毯上的對應位置。對齊目標時，玩家要在鍵盤或跳舞毯上按下相應按鍵。箭頭遇到目標的時刻取決於音樂的節拍。遊戲的積分取決於玩家能夠多準確地在歌曲節拍的時間點觸發箭頭。玩家的努力通過字母成績和量化的分數來評價。 '
            ],
            note: '資料來源: google.StepMania'
          },
          {
            tag: 'cytus',
            icon: 'CYTUS',
            title: 'CYTUS',
            img: {
              background: SampleCytus,
              note: 'Cytus-畫面參考'
            },
            content: [
              '由雷亞遊戲開發的音樂節奏遊戲，以獨特的動態掃描線和手繪風格的畫面聞名。 玩家需要根據音樂節奏，在掃描線經過時，準確地觸擊螢幕上的拍點。 遊戲收錄了多樣化的音樂，並邀請了多位知名音樂遊戲樂師參與製作，例如Tsukasa、Naotyu-和Sta。',
              '需要隨著遊戲介面中，上下移動的掃描線來適時演奏對應音符。遊戲中有三種拍點按鈕，點擊音符Click Note，長按音符Hold Note和拖動音符Drag Note。根據CAPCOM的Cytus Omega官方網站，Cytus Omega將會有一種新的拍點按鈕。遊戲中的音符分為藍紫色與藍綠色兩種，掃描線自上而下與自下而上移動時，音符將展現出不同的顏色。'
            ],
            note: '資料來源: cytus.Cytus'
          }
        ]
      },
      [STATUS.ADVENTURE.name]: {
        title: 'ADVENTURE',
        content: []
      },
      [STATUS.SIMULATION.name]: {
        title: 'SIMULATION',
        content: []
      }
    }
  })
  const selfDom = reactive({
    videoBillboard: null as any
  })

  const IDS = {
    BLOCK_1: 'id-center2-block-1',
    BLOCK_1_BTN_GROUP: 'id-block1-grid',
    BLOCK_1_RIGHT: `id-block-1-right-${state.key}`,
    BLOCK_1_RIGHT_BAR: 'id-block1-right-bar',
    BLOCK_1_RIGHT_MAIN: 'id-block1-right-main',
    BLOCK_1_VIDEO_BILLBOARD: 'id-video-billboard'
  }

  const click = {
    changeCard(status: GameStatusType) {
      // 停止自動切換計時器
      init.stopRandomTimer()
      state.isClick = true

      // 添加點擊動畫類
      const elements = [
        '.block-1-right',
        '.block-1-right-2',
        '.block-1-right-main',
        '.video-billboard'
      ]
      elements.forEach(selector => {
        const el = document.querySelector(selector)
        if (el) {
          el.classList.add('click-transition')
          setTimeout(() => {
            el.classList.remove('click-transition')
            // console.log('selector', selector)

            if (['.block-1-right-2'].includes(selector))
              Animation.addClass(IDS.BLOCK_1_RIGHT_BAR, 'scale1', 10)

            if (['.block-1-right-main'].includes(selector))
              Animation.addClass(IDS.BLOCK_1_RIGHT_MAIN, 'animation-block-left', 10)

            if (['.video-billboard'].includes(selector))
              Animation.addClass(IDS.BLOCK_1_VIDEO_BILLBOARD, 'click-transition', 10)
          }, 500)
        }
      })
      state.selected = status

      // __切換遊戲類型，設定selectedIntroduce__
      state.selectedIntroduce = 0
      // if (status.name === STATUS.VISUAL_NOVEL.name) state.selectedIntroduce = 0
      // else if (status.name === STATUS.SPORTS.name) state.selectedIntroduce = 6

      //__DETAIL.ANIM更新__
      setTimeout(() => {
        click.changeIntroduce(state.selectedIntroduce)
      }, 10)
    },
    changeIntroduce(index: number = -1) {
      if (index < 0) return
      state.selectedIntroduce = index

      Tools.delay(10).then(() => {
        if (!selfDom.videoBillboard) return
        // __clear.actions__
        selfDom.videoBillboard.find('[tag="content-img"]').removeClass('anim-img-show')
        selfDom.videoBillboard.find('[tag="selected-title"]').removeClass('anim-img-show')
        selfDom.videoBillboard.find('[tag="selected-note"]').removeClass('anim-img-show')
        selfDom.videoBillboard
          .find('[tag="content-text"]')
          .children('p')
          .removeClass('anim-content-show')

        Tools.delay(100).then(() => {
          // __add.actions__
          selfDom.videoBillboard.find('[tag="content-img"]').addClass('anim-img-show')
          selfDom.videoBillboard
            .find('[tag="content-text"]')
            .children('p')
            .each(function (this: HTMLElement, index: number) {
              setTimeout(() => {
                $(this).addClass('anim-content-show')
              }, index * 300)
            })
          setTimeout(() => {
            selfDom.videoBillboard.find('[tag="selected-title"]').addClass('anim-img-show')
            selfDom.videoBillboard.find('[tag="selected-note"]').addClass('anim-img-show')
          }, 900)
        })
      })
    }
  }

  const init = {
    timer: null as number | null,
    playRandomSelected() {
      const randomIndex = Math.floor(Math.random() * Object.keys(STATUS).length)
      const randomKey = Object.keys(STATUS)[randomIndex] as keyof typeof STATUS
      state.selected = STATUS[randomKey] as GameStatusType
    },
    startRandomTimer() {
      // 每 5 秒隨機選擇一次
      this.timer = window.setInterval(() => {
        this.playRandomSelected()
      }, 5000)
    },
    stopRandomTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    setupHoverEffects() {
      // block hover effect
      const blockId = `#id-block-1-right-${state.key}`
      const hoverClass = 'right-title-hover'
      const jqDome = $(blockId).find(`[tag="title"]`)
      jqDome.on('mouseenter', function () {
        if (!$(this).attr('class')?.split(' ').includes(hoverClass)) $(this).addClass(hoverClass)
      })
      jqDome.on('mouseleave', function () {
        $(this).removeClass(hoverClass)
      })
    },
    run() {
      state.isClick = false
      // const rightBarBlocks = ['id-block1-right-bar']
      // rightBarBlocks.forEach(block => {
      //   Animation.addSubClass(block, 'animation-item-intro', 2100)
      //   Animation.removeSubClass(block, 'animation-item-intro', 3000)
      //   Animation.addSubClass(block, 'alpha-1', 2900)
      // })

      // 啟動隨機選擇計時器
      // this.startRandomTimer()
    }
  }
  const handle = {
    selectedTitle: () => {
      const arr = state.selected.name.toUpperCase().split(' ')
      return arr
    }
  }
  const updateWidth = () => {
    const windowWidth = window.innerWidth
    const width = Math.min(Math.max(windowWidth * 0.15 - 30, 50), 500)
    state.block1RightWidth = `${width}px`
  }
  const handleScroll = () => {
    const el = document.querySelector('.gameLobby')
    if (!el) return
    state.scrollY = el.scrollTop
  }
  const currIntroduce = computed<IntroduceItem>(() => {
    return (
      state.main[state.selected.name]?.introduce?.[state.selectedIntroduce] ?? {
        tag: 'test',
        title: 'TEST',
        img: { background: '', note: 'NOTE.TEST' },
        content: [],
        note: 'NOTE.TEST'
      }
    )
  })
  const currGameArrInfo = computed(() => {
    const _main = state.main
    let _status = ''
    let _item: IntroduceItem[] | null = null
    // let out: { key: number; icon: string; title: string; status: string; tag: number }[] = []

    if (state.selected.name === STATUS.VISUAL_NOVEL.name) _status = STATUS_ICON.CAVE
    else if (state.selected.name === STATUS.SPORTS.name) _status = STATUS_ICON.FIFA
    else if (state.selected.name === STATUS.MUSIC.name) _status = STATUS_ICON.PATAPON

    _item = _main[state.selected.name]?.introduce ?? []
    return [
      { key: 0, status: _status, tag: 0, title: _item?.[0]?.icon ?? 'NONE' },
      { key: 1, status: _status, tag: 1, title: _item?.[1]?.icon ?? 'NONE' },
      { key: 2, status: _status, tag: 2, title: _item?.[2]?.icon ?? 'NONE' },
      { key: 3, status: _status, tag: 3, title: _item?.[3]?.icon ?? 'NONE' },
      { key: 4, status: _status, tag: 4, title: _item?.[4]?.icon ?? 'NONE' },
      { key: 5, status: _status, tag: 5, title: _item?.[5]?.icon ?? 'NONE' }
    ]
  })

  const setup = {
    hover() {
      const domTag = IDS.BLOCK_1_VIDEO_BILLBOARD
      const dom = $(`#${domTag}`) as any
      selfDom.videoBillboard = dom

      dom.on('mouseenter', function () {
        dom.find('[tag="title"]').addClass('hover-show')
        if (state.isPlaying) return
        replayTypewriter()
      })
      dom.on('mouseleave', function () {
        dom.find('[tag="title"]').removeClass('hover-show')
      })
    }
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    const el = document.querySelector('.gameLobby')
    if (el) el.addEventListener('scroll', handleScroll)

    init.setupHoverEffects()
    setup.hover()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
    const el = document.querySelector('.gameLobby')
    if (el) el.removeEventListener('scroll', handleScroll)

    // 清除計時器
    init.stopRandomTimer()
  })

  init.run()

  const actions = {
    scrollAnim: {
      isBlock1Show: false,
      isBlock1Hide: false,
      isBlock1BarShow: false,
      isBlock1BarHide: false,
      isBlock1MainShow: false,
      isBlock1MainHide: false
    },
    idBlock1Show: () => {
      // console.log('CENTER2.run.idBlock1Show', actions.scrollAnim.isBlock1Show)
      let _a = actions.scrollAnim
      if (_a.isBlock1Show) return
      _a.isBlock1Show = true

      const blocks = [IDS.BLOCK_1_BTN_GROUP]
      Animation.removeClass(IDS.BLOCK_1, 'anim-banner-out')
      blocks.forEach(block => {
        Animation.removeSubClass(block, 'alpha-1', 10)
      })
      Animation.addClass(IDS.BLOCK_1, 'animation-block-right', 50)

      Tools.delay(450).then(() => {
        _a.isBlock1Hide = false
        blocks.forEach(block => {
          Animation.addSubClass(block, 'animation-item-up', 500)
          Animation.removeSubClass(block, 'animation-item-up', 2300)
          Animation.addSubClass(block, 'alpha-1', 2300)
        })
      })
    },
    idBlock1Hide: () => {
      // console.log('CENTER2.run.idBlock1Hide')
      let _a = actions.scrollAnim
      if (_a.isBlock1Hide) return
      _a.isBlock1Hide = true

      Animation.addClass(IDS.BLOCK_1, 'anim-banner-out', 10)
      const blocks = [IDS.BLOCK_1_BTN_GROUP]
      blocks.forEach(block => {
        Animation.removeSubClass(block, 'alpha-1', 50)
      })
      Tools.delay(450).then(() => {
        Animation.removeClass(IDS.BLOCK_1, 'animation-block-right')
        _a.isBlock1Show = false
      })
    },

    idBlock1BarShow: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1BarShow) return
      _a.isBlock1BarShow = true

      Animation.removeClass(IDS.BLOCK_1_RIGHT_BAR, 'anim-gameBlock1-out')
      Animation.addClass(IDS.BLOCK_1_RIGHT_BAR, 'animation-block-left', 100)

      const blocks = [IDS.BLOCK_1_RIGHT_BAR]
      blocks.forEach(block => {
        Animation.removeSubClass(block, 'alpha-1', 500)
      })

      Tools.delay(450).then(() => {
        _a.isBlock1BarHide = false

        blocks.forEach(block => {
          Animation.addSubClass(block, 'animation-item-intro', 10)
          Animation.removeSubClass(block, 'animation-item-intro', 900)
          Animation.addSubClass(block, 'alpha-1', 800)
        })
      })

      Tools.delay(700).then(() => {
        Animation.removeClass(IDS.BLOCK_1_RIGHT, 'anim-gameBlock1-out')
        Animation.addClass(IDS.BLOCK_1_RIGHT, 'click-transition', 50)
        // Animation.addClass(IDS.BLOCK_1_RIGHT, 'anim-gameBlock1-out', 50)
      })
    },
    idBlock1BarHide: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1BarHide) return
      _a.isBlock1BarHide = true

      const blocks = [IDS.BLOCK_1_RIGHT_BAR]
      blocks.forEach(block => {
        Animation.addSubClass(block, 'anim-icon-out', 10)
        Animation.removeSubClass(block, 'anim-icon-out', 1100)
        Animation.removeSubClass(block, 'alpha-1', 1100)
      })

      Tools.delay(1000).then(() => {
        Animation.removeClass(IDS.BLOCK_1_RIGHT_BAR, 'animation-block-left')
        Animation.removeClass(IDS.BLOCK_1_RIGHT_BAR, 'scale1')
        Animation.addClass(IDS.BLOCK_1_RIGHT_BAR, 'anim-gameBlock1-out', 50)
        Tools.delay(450).then(() => {
          _a.isBlock1BarShow = false
        })
      })

      Tools.delay(1300).then(() => {
        Animation.removeClass(IDS.BLOCK_1_RIGHT, 'click-transition')
        Animation.addClass(IDS.BLOCK_1_RIGHT, 'anim-gameBlock1-out', 50)
      })
    },

    idBlock1MainShow: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1MainShow) return
      _a.isBlock1MainShow = true

      Animation.addClass(IDS.BLOCK_1_RIGHT_MAIN, 'animation-block-left', 100)
      Tools.delay(1300).then(() => {
        Animation.addClass(IDS.BLOCK_1_VIDEO_BILLBOARD, 'click-transition', 100)
        _a.isBlock1MainHide = false

        // __SHOW-ANIMATIONS__
        Tools.delay(1300).then(() => {
          if (!selfDom.videoBillboard) return
          // __add.actions__
          selfDom.videoBillboard.find('[tag="content-img"]').addClass('anim-img-show')
          selfDom.videoBillboard
            .find('[tag="content-text"]')
            .children('p')
            .each(function (this: HTMLElement, index: number) {
              setTimeout(() => {
                $(this).addClass('anim-content-show')
              }, index * 300)
            })
          setTimeout(() => {
            selfDom.videoBillboard.find('[tag="selected-title"]').addClass('anim-img-show')
            selfDom.videoBillboard.find('[tag="selected-note"]').addClass('anim-img-show')
          }, 900)
        })
      })
    },
    idBlock1MainHide: () => {
      let _a = actions.scrollAnim
      if (_a.isBlock1MainHide) return
      _a.isBlock1MainHide = true
      state.isPlaying = false
      clearTypewriter()

      Animation.removeClass(IDS.BLOCK_1_RIGHT_MAIN, 'animation-block-left')
      Animation.removeClass(IDS.BLOCK_1_VIDEO_BILLBOARD, 'click-transition')
      _a.isBlock1MainShow = false

      Tools.delay(10).then(() => {
        if (!selfDom.videoBillboard) return
        // __clear.actions__
        selfDom.videoBillboard.find('[tag="content-img"]').removeClass('anim-img-show')
        selfDom.videoBillboard.find('[tag="selected-title"]').removeClass('anim-img-show')
        selfDom.videoBillboard.find('[tag="selected-note"]').removeClass('anim-img-show')
        selfDom.videoBillboard
          .find('[tag="content-text"]')
          .children('p')
          .removeClass('anim-content-show')
      })
    }
  }
  defineExpose({
    test: () => console.log('CENTER2.test'),
    actions
  })

  const handleTypewriterStatus = (status: 'playing' | 'paused' | 'completed') => {
    // console.log('Typewriter status:', status)
  }

  // __打字機.ACTIONS__
  const toggleTypewriter = (flag: boolean) => {
    state.isPlaying = flag
    state.typewriterRefs.forEach(ref => {
      if (state.isPlaying) {
        ref.play()
      } else {
        ref.pause()
      }
    })
  }
  const replayTypewriter = () => {
    state.typewriterRefs.forEach(ref => {
      ref.reset()
    })
    state.isPlaying = true
    toggleTypewriter(true)
  }
  const clearTypewriter = () => {
    state.typewriterRefs.forEach(ref => {
      ref.clear()
    })
    state.isPlaying = false
  }
</script>

<template>
  <div class="center2" :class="`center-${state.key}`">
    <div class="game-info-container">
      <div id="id-center2-block-1" class="block-1">
        <div class="section-header">
          <span class="item setting-text"></span>
        </div>
        <div id="id-block1-grid" class="stats-grid">
          <!-- 文字冒險 game-icon 用來設定動畫 -->
          <Card
            class="game-icon"
            :index="1"
            :height="430"
            :isActive="state.selected.name === STATUS.VISUAL_NOVEL.name"
            :text="STATUS.VISUAL_NOVEL.name"
            @click="click.changeCard(STATUS.VISUAL_NOVEL)"
            style="--item-index: 0"
          />
          <!-- 角色扮演 -->
          <Card
            class="game-icon"
            :index="2"
            :height="330"
            :isActive="state.selected.name === STATUS.SPORTS.name"
            :text="STATUS.SPORTS.name"
            @click="click.changeCard(STATUS.SPORTS)"
            style="--item-index: 1"
          />
          <!-- 音樂 -->
          <Card
            class="game-icon"
            :index="3"
            :height="380"
            :isActive="state.selected.name === STATUS.MUSIC.name"
            :text="STATUS.MUSIC.name"
            @click="click.changeCard(STATUS.MUSIC)"
            style="--item-index: 2"
          />
          <!-- 冒險 -->
          <Card
            class="game-icon"
            :index="4"
            :height="273"
            :isActive="state.selected.name === STATUS.ADVENTURE.name"
            :text="STATUS.ADVENTURE.name"
            @click="click.changeCard(STATUS.ADVENTURE)"
            style="--item-index: 3"
          />
          <!-- 模擬 -->
          <Card
            class="game-icon"
            :index="5"
            :height="420"
            :isActive="state.selected.name === STATUS.SIMULATION.name"
            :text="STATUS.SIMULATION.name"
            @click="click.changeCard(STATUS.SIMULATION)"
            style="--item-index: 4"
          />
        </div>
      </div>

      <div
        :id="`id-block-1-right-${state.key}`"
        :tag="`tag-block-1-right-${state.key}`"
        class="block-1-right"
        :style="{ width: state.block1RightWidth, background: state.selected.color }"
      >
        <div class="item setting-text" tag="title">LIFESTYLE</div>
      </div>
      <!-- <BubbleMachine /> -->

      <!-- BAR.ICON SETTINGS -->
      <!-- selected {{ state.selected.name }} -->
      <div id="id-block1-right-bar" class="block-1-right-2" :class="state.selected.class">
        <div class="list">
          <GameIcon
            v-for="(item, index) in currGameArrInfo"
            :key="index"
            :style="`--item-index: ${item.key}`"
            :title="item.title"
            :status="item.status"
            :selectedTag="item.tag"
            v-model="state.selectedIntroduce"
            @click="click.changeIntroduce(index)"
          />
        </div>
      </div>

      <!-- VIDEO.大的廣告看板 SETTINGS -->
      <div
        id="id-block1-right-main"
        class="block-1-right-main"
        :class="state.selected.class"
        :style="{
          background: state.selected.color
        }"
      >
        <div class="item-left-1" :class="state.selected.class"></div>
        <div
          id="id-video-billboard"
          class="video-billboard"
          :class="state.selected.class"
          :style="{
            transform: `translateY(${state.transform.translateY}px) rotate(${state.transform.rotate}deg)`,
            transition: 'transform 0.2s ease-out'
          }"
        >
          <div class="title" tag="title">{{ state.main[state.selected.name].title }}</div>
          <div class="content">
            <div class="left">
              <p v-for="(text, index) in state.main[state.selected.name].content" :key="index">
                <TypewriterText
                  :text="text"
                  :speed="70"
                  :autoPlay="state.isPlaying"
                  @statusChange="handleTypewriterStatus"
                  :ref="
                    el => {
                      if (el) state.typewriterRefs[index] = el
                    }
                  "
                />
              </p>
            </div>
            <div class="right">
              <div class="title" :class="[`${currIntroduce.tag}`]" tag="selected-title">
                {{ currIntroduce.title }}
              </div>
              <div class="content-img" tag="content-img">
                <div class="img-1" :class="[`${currIntroduce.tag}`]">
                  <img :src="currIntroduce.img.background" />
                  <div class="note">{{ currIntroduce.img.note }}</div>
                </div>
              </div>
              <div class="content-text" tag="content-text">
                <p v-for="(text, index) in currIntroduce.content" :key="index">{{ text }}</p>
                <div class="auto"></div>
                <div class="note" tag="selected-note">{{ currIntroduce.note }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- detail -->
      <BlockDetail :selected="state.selected" />
      <div class="block-1-detail" :class="state.selected.class" style="display: none">
        <div class="title">
          <div class="W1">{{ handle.selectedTitle()[0] }}</div>
          <div class="W2" v-if="handle.selectedTitle().length > 1">
            {{ handle.selectedTitle()[1] }}
          </div>
        </div>
        <div
          v-if="
            [
              STATUS.VISUAL_NOVEL.name,
              STATUS.SPORTS.name,
              STATUS.MUSIC.name,
              STATUS.ADVENTURE.name,
              STATUS.SIMULATION.name
            ].includes(state.selected.name)
          "
          class="main"
        >
          <div class="left">
            <ul>
              <li>文字界面</li>
              <li>玩家互動</li>
              <li>探索解謎</li>
              <li>高自由度</li>
              <li>具想像力</li>
            </ul>
          </div>
          <div class="center">
            <p>
              Text-based Adventure is an interactive game type that uses text as the main interface
              and content. Players interact with the game world, explore the story, solve puzzles,
              or advance the plot by reading the narrative and entering commands or selecting
              options. This type of game can be said to be one of the earliest narrative interactive
              forms in the history of digital games, combining elements of novels, role-playing, and
              puzzle solving.
            </p>

            <!-- <p>
              This type of game emphasizes immersion, imagination, and choice. It is not only a
              pioneering form of game, but also an important source of inspiration for the
              development of narrative games today. Whether you are a player, creator, or narrative
              lover, text adventure is a classic path worth trying.
            </p> -->
          </div>
          <div class="right">
            <div class="light"></div>
            <div class="light2"></div>
          </div>
        </div>
        <div class="footer"></div>
      </div>

      <!-- Add control button -->
      <!-- <button class="typewriter-control" @click="toggleTypewriter">
        {{ state.isPlaying ? '暫停' : '播放' }}
      </button> -->

      <!-- Add replay button -->
      <!-- <button class="typewriter-control replay" @click="replayTypewriter">重新播放</button> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .center2 {
    border: 1px solid #2600ff;
    min-height: 1510px;
    margin-top: 0px;

    .right-title-hover {
      cursor: default;
      animation-name: electronic-hover;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
      animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
      transform-origin: right center;

      @keyframes electronic-hover {
        20% {
          top: 0px;
          transform: rotate(270deg) scaleX(1.5);
        }

        100% {
          top: -25px;
          letter-spacing: -1px;
          transform: rotate(270deg) scaleX(1);
        }
      }
    }
  }

  // MAIN
  .game-info-container {
    padding-right: 15%;
    border: 1px solid #00ff09;
    // overflow: hidden;
    position: relative;

    .info-section {
      background: linear-gradient(135deg, rgba(42, 3, 3, 0.1) 0%, rgba(177, 76, 74, 0.1) 100%);
      border-radius: 12px;
      padding: 20px;
      border: 1px solid rgba(177, 76, 74, 0.2);

      .section-header {
        margin-bottom: 20px;

        .setting-text {
          color: #b14c4a;
          font-size: 18px;
          text-shadow: 0 0 10px rgba(177, 76, 74, 0.3);
        }
      }
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .activity-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: linear-gradient(135deg, rgba(42, 3, 3, 0.8) 0%, rgba(177, 76, 74, 0.8) 100%);
        border-radius: 8px;
        transition: all 0.3s ease;
        border: 1px solid rgba(177, 76, 74, 0.3);

        &:hover {
          transform: translateX(4px);
          background: linear-gradient(135deg, rgba(42, 3, 3, 0.9) 0%, rgba(177, 76, 74, 0.9) 100%);
          box-shadow: 0 4px 12px rgba(177, 76, 74, 0.2);
        }

        .activity-icon {
          font-size: 20px;
          color: #fff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .activity-content {
          flex: 1;

          .activity-title {
            font-size: 16px;
            color: #fff;
            margin-bottom: 4px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }

          .activity-time {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
    .block-1 {
      background: white;
      border: 0px;
      border-radius: 0px 60px 20px 0px;
      padding: 20px;
      padding-top: 5%;
      padding-left: 10%;
      padding-right: 3.5%;
      height: 410px;
      overflow: hidden;

      transform: scaleX(0);
      position: relative;
      transform-origin: left 50%;
      .section-header {
        height: 24px;
      }
      .stats-grid {
        display: flex;
        flex-direction: row;
        align-items: end;
        gap: 20px;
      }
    }
    .block-1-right {
      position: absolute;
      height: 600px;
      bottom: -360px;
      right: 0px;
      background: white;
      border-radius: 180px 0px 0px 0px;
      transition:
        width 0.3s ease,
        background-color 0.5s ease;
      overflow: hidden;

      .item.setting-text {
        line-height: 33px;
        color: var(--bgLobbyColor);
        font-size: 75px;
        font-weight: 900;
        letter-spacing: -6px;
        transform-origin: 100% 50%;
        text-align: left;
        // width: 450px;
        height: 45px;
        position: absolute;
        top: -230px;
        right: 30px;
        z-index: 10;
        transform: rotate(270deg);
      }
    }
    .block-1-right-2 {
      background: #ff0000;
      height: 170px;
      bottom: -185px;
      position: absolute;
      right: 0px;
      width: 82%;
      border-radius: 18px 0px 0px 15px;
      display: flex;
      align-items: center;
      z-index: 2;
      padding-left: 3%;

      transform-origin: right 50%;
      transform: scaleX(0);
      transition: all 0.3s cubic-bezier(0.165, 0.44, 0.64, 1);

      > div {
        margin-left: 2.5%;
      }
      .list {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 30px;
      }

      &.scale1 {
        animation-name: scale-anim-a01;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
        // transform: scaleX(1);

        @keyframes scale-anim-a01 {
          0% {
            transform: scaleX(0);
          }
          // 50% { transform: scaleX(0.2);}
          60% {
            transform: scaleX(1.5);
          }
          70% {
            transform: scaleX(0.89);
          }
          80% {
            transform: scaleX(1.5);
          }
          90% {
            transform: scaleX(0.98);
          }
          100% {
            transform: scaleX(1);
          }
        }
      }

      // background color 設定
      &.bar-visual-novel {
        background: linear-gradient(to right, #f4284a, #9469e3dd);
        opacity: 0.99;
      }
      &.bar-sports {
        background: linear-gradient(to right, #ffac30, #ff7b47dd);
        opacity: 0.99;
      }
      &.bar-music {
        background: #ff79dd;
        background: linear-gradient(to right, #f52b8c, #9469e3dd);
        opacity: 0.99;
      }
      &.bar-adventure {
        background: #71de95;
        background: linear-gradient(to right, #48c96c, rgb(130 207 80 / 87%));
        opacity: 0.99;
      }
      &.bar-simulation {
        background: #4ccae0;
        background: linear-gradient(to right, #2dabff, #9469e3dd);
        opacity: 0.99;
      }
    }

    .block-1-right-main {
      margin-top: 65px;
      position: absolute;
      width: 100%;
      background: #fff;
      min-height: 500px;
      transition: background-color 0.5s ease;

      transform-origin: left 50%;
      transform: scaleX(0);

      // 左邊的區域.裝飾
      .item-left-1,
      .item-left-2,
      .item-left-3 {
        position: absolute;
        height: 100%;
      }

      .item-left-1 {
        background: #f22b4e;
        width: 2%;

        &.bar-visual-novel {
          background: #f22b4e;
          opacity: 0.99;
        }

        &.bar-sports {
          background: #ffa333;
          opacity: 0.99;
        }

        &.bar-music {
          background: #f52b8c;
          opacity: 0.99;
        }

        &.bar-adventure {
          background: #48c96c;
          opacity: 0.99;
        }

        &.bar-simulation {
          background: #2dabff;
          opacity: 0.99;
        }
      }

      .video-billboard {
        position: absolute;
        background: #ff0000;
        width: 95%;
        height: 75%;
        left: 1.3%;
        top: 151px;
        border-radius: 18px 0px 120px 0px;
        transform-origin: center center;
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000px;
        // overflow: hidden;
        opacity: 0;

        .title {
          position: absolute;
          left: 7px;
          top: -40px;
          font-size: 50px;
          font-weight: 900;
          letter-spacing: -10px;
          transform-origin: 50% bottom;

          &.hover-show {
            animation: title-hover 0.35s ease-out;
            animation-fill-mode: forwards;
            @keyframes title-hover {
              0% {
                transform: scaleY(0.3);
                top: -40px;
              }
              80% {
                top: -60px;
                transform: scaleY(1.5);
              }
              90% {
                top: -50px;
                transform: scaleY(1.7);
              }
              100% {
                transform: scaleY(1);
                top: -60px;
              }
            }
          }
        }
        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;

          .left {
            width: 30%;
            height: 100%;
            display: flex;
            align-items: end;

            p {
              padding: 10px;
              text-align: left;
              font-weight: 500;
            }
          }
          .right {
            flex: 1;
            height: 100%;
            display: flex;
            // align-items: center;
            .title {
              position: absolute;
              transform-origin: 0 0;
              transform: rotate(90deg);
              left: unset;
              right: -195px;
              top: -3px;

              font-size: 50px;
              font-weight: 900;
              letter-spacing: -5px;
              color: #202020;

              opacity: 0;

              &.pyramid {
                right: -240px;
              }
              &.anchorhead {
                right: -332px;
                top: 0px;
              }
              &.fifa {
                right: -108px;
              }
              &.snowcraft {
                right: -150px;
              }
              &.patapon {
                right: -242px;
              }
              &.dtxmania {
                right: -253px;
              }
              &.step-mania {
                right: -271px;
              }
              &.cytus {
                right: -168px;
              }
            }
            .content-img {
              width: 50%;
              padding: 10px;
              opacity: 0;

              .img-1 {
                position: relative;
                width: 100%;
                height: 100%;
                background: #959595;
                border-radius: 10px;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 10px;
                  filter: contrast(120%) brightness(110%) saturate(130%)
                    drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3));
                  transition: all 0.3s ease;

                  &:hover {
                    filter: contrast(130%) brightness(120%) saturate(150%)
                      drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.4)) hue-rotate(2deg);
                    transform: scale(1.02);
                    & + ::after {
                      animation: blink 0.75s ease-in-out infinite;
                    }
                  }
                }
                .note {
                  position: absolute;
                  bottom: 10px;
                  right: 10px;
                  background-color: #202020;
                  color: #fff;
                  padding-left: 2px;
                  padding-right: 2px;

                  font-size: 11px;
                  font-weight: 500;
                }

                //__IMG.FILTER__
                &.cytus,
                &.step-mania,
                &.dtxmania,
                &.piano,
                &.taiko-no-tatsujin,
                &.snowcraft,
                &.memories,
                &.power-pros,
                &.tennis {
                  img {
                    filter: unset;
                  }
                }
              }
            }
            .content-text {
              width: calc(50% - 100px);
              padding-top: 20px;
              padding-bottom: 10px;

              display: flex;
              flex-direction: column;
              margin-left: 2%;

              font-weight: 500;
              color: #202020;
              font-size: 14px;
              font-weight: 500;

              p {
                text-align: left;
                margin-bottom: 10px;
                border-left: 1px solid #202020;
                padding-left: 10px;

                transform-origin: 50% top;
                transform: scaleY(0);
              }
              .auto {
                flex: 1;
              }
              .note {
                text-align: right;
                font-size: 11px;
                font-weight: 500;
                margin-right: 7%;
                opacity: 0;
              }
            }
          }
        }

        // __DETAILS.TITLE__
        &.bar-visual-novel {
          background: #f22b4e;
          .title {
            color: #f22b4e;
          }
        }
        &.bar-sports {
          background: #ffa333;
          .title {
            color: #ffa333;
          }
        }
        &.bar-music {
          background: #f52b8c;
          .title {
            color: #f52b8c;
          }
        }
        &.bar-adventure {
          background: #48c96c;
          .title {
            color: #48c96c;
          }
        }
        &.bar-simulation {
          background: #2dabff;
          .title {
            color: #2dabff;
          }
        }
      }
    }
  }

  .block-1-right,
  .block-1-right-2,
  .block-1-right-main,
  .video-billboard {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    &.click-transition {
      animation: clickEffect 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
      @keyframes clickEffect {
        0% {
          transform: scale(0.95);
          opacity: 0.8;
        }

        50% {
          transform: scale(1.02);
          opacity: 0.9;
        }

        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    // &.scale1 {
    //   animation-name: scale-anim-a01;
    //   animation-duration: 0.2s;
    //   animation-fill-mode: forwards;
    //   animation-timing-function: cubic-bezier(0.165, 0.44, 0.64, 1);
    // }
  }

  .block-1-detail {
    margin-top: 590px;
    position: absolute;
    width: 100%;

    .title {
      text-align: left;
      color: #000;
      margin-left: -5px;
      font-size: 75px;
      font-weight: 900;
      .W1,
      .W2 {
        line-height: 52px;
      }
    }
    .main {
      width: 100%;
      // border: 1px solid red;
      display: flex;
      justify-content: space-between;
      height: 350px;

      .left {
        // margin-top: 10px;
        position: absolute;
        width: 20%;
        height: 370px;
        background: #e6e0e0;
        border-bottom: 20px solid #fff;
        border-radius: 0px 0px 120px 0px;

        display: flex;
        justify-content: end;
        align-items: end;
        color: #604848;
        ul {
          margin-right: 30px;
          margin-bottom: 70px;
          li {
            text-align: right;
          }
        }
      }
      .center {
        width: 35%;
        min-height: 30%;
        height: auto;
        border: 2px solid #000;
        position: absolute;
        transform: translate(61.5%, 7%);

        padding: 15px;
        text-align: left;
        color: #000;
      }
      .right {
        position: absolute;
        overflow: hidden;
        width: 42%;
        height: 105%;
        right: 0;
        bottom: -50px;
        background: #e6e0e0;
        border-top: 30px solid #ccc;
        border-left: 15px solid #ccc;
        border-bottom: 5px solid #ccc;
        border-radius: 30px 0 0 0;
        .light {
          width: 50%;
          height: 30px;
          position: absolute;
          background: #ffffff6e;
          transform: rotate(-45deg);
          top: 0px;
          left: -90px;
        }
        .light2 {
          width: 70%;
          height: 60px;
          position: absolute;
          background: #ffffff6e;
          transform: rotate(-45deg);
          top: 20px;
          left: -90px;
        }
      }
    }
    .footer {
      // margin-top: 10px;
      // background: #fff;
      // height: 40px;
      // border-bottom: 10px solid #ccc;
    }

    &.bar-visual-novel {
      .title {
        color: #f22b4e;
      }
      .main {
        .center {
          border-color: #f22b4e;
        }
      }
    }

    &.bar-sports {
      .title {
        color: #ffa333;
      }
      .main {
        .center {
          border-color: #ffa333;
        }
      }
      // background: #ffa333;
      // opacity: 0.99;
    }

    &.bar-music {
      .title {
        color: #f52b8c;
      }
      .main {
        .center {
          border-color: #f52b8c;
        }
      }
      // background: #f52b8c;
      // opacity: 0.99;
    }

    &.bar-adventure {
      .title {
        color: #48c96c;
      }
      .main {
        .center {
          border-color: #48c96c;
        }
      }
      // background: #48c96c;
      // opacity: 0.99;
    }

    &.bar-simulation {
      .title {
        color: #2dabff;
      }
      .main {
        .center {
          border-color: #2dabff;
        }
      }
      // background: #2dabff;
      // opacity: 0.99;
    }
  }

  .typewriter-control {
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.9);
    }

    &.replay {
      right: 120px;
    }
  }
</style>
