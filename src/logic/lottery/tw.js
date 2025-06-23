// __API台灣彩券__
const GAME = {
  WEI_LI_CAI: {
    code: 5134,
    name: '威力彩'
  },
  DA_LE_TOU: {
    code: 5118,
    name: '大樂透'
  },
  JIN_CAI: {
    code: 1197,
    name: '今彩539'
  },
  YUE_HE_CAI_39: {
    code: 1197,
    name: '39樂合彩'
  },
  YUE_HE_CAI_49: {
    code: 1121,
    name: '49樂合彩'
  },
  XING_CAI_3: {
    code: 2108,
    name: '3星彩'
  },
  XING_CAI_4: {
    code: 2109,
    name: '4星彩'
  },
  BIN_GUO: {
    code: 1102,
    name: '賓果'
  }
}

const CMD = {
  LAST_NUMBER: {
    URL: 'https://api.taiwanlottery.com/TLCAPIWeB/Lottery/LastNumber',
    METHOD: 'get'
  }
}
