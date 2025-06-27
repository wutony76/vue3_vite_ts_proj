interface GameItem {
  code: number
  name: string
  en: string
}

interface GameMap {
  [key: string]: GameItem
  [key: number]: GameItem
}

// __API台灣彩券__
const _WEI_LI_CAI = {
  code: 5134,
  name: '威力彩',
  en: 'WEILICAI'
}
const _DA_LE_TOU = {
  code: 5118,
  name: '大樂透',
  en: 'DALETOU'
}
const _JIN_CAI = {
  code: 1197,
  name: '今彩539',
  en: 'JINCAI539'
}
const _YUE_HE_CAI_39 = {
  code: 5120,
  name: '39樂合彩',
  en: '39YUEHECAI'
}
const _YUE_HE_CAI_49 = {
  code: 1121,
  name: '49樂合彩',
  en: '49YUEHECAI'
}
const _XING_CAI_3 = {
  code: 2108,
  name: '3星彩',
  en: '3XINGCAI'
}
const _XING_CAI_4 = {
  code: 2109,
  name: '4星彩',
  en: '4XINGCAI'
}
const _BIN_GUO = {
  code: 1102,
  name: '賓果',
  en: 'BINGUO'
}

export const GAME: GameMap = {
  WEI_LI_CAI: _WEI_LI_CAI,
  5134: _WEI_LI_CAI,
  DA_LE_TOU: _DA_LE_TOU,
  5118: _DA_LE_TOU,
  JIN_CAI: _JIN_CAI,
  1197: _JIN_CAI,
  YUE_HE_CAI_39: _YUE_HE_CAI_39,
  5120: _YUE_HE_CAI_39,
  YUE_HE_CAI_49: _YUE_HE_CAI_49,
  1121: _YUE_HE_CAI_49,
  XING_CAI_3: _XING_CAI_3,
  2108: _XING_CAI_3,
  XING_CAI_4: _XING_CAI_4,
  2109: _XING_CAI_4,
  BIN_GUO: _BIN_GUO,
  1102: _BIN_GUO
}

export const CMD = {
  SEARCH: {
    URL: 'https://api.taiwanlottery.com/TLCAPIWeB/Lottery/Lotto649Result',
    METHOD: 'get',
    QUERY: {
      month: '2025-05',
      pageNum: 1,
      pageSize: 20
    }
  },
  LAST_NUMBER: {
    URL: 'https://api.taiwanlottery.com/TLCAPIWeB/Lottery/LastNumber',
    METHOD: 'get'
  }
}
export default CMD
