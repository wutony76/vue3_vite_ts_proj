import req from './Request'
import { GAME } from '@/logic/lottery/tw'

const CMD = {
  TEST: 'posts',
  SEARCH: 'sample_agentOutsideMemberAuthQuery',
  ADD: 'sample_agentOutsideMemberAuthAdd',
  DEL: 'sample_agentOutsideMemberAuthDel'
}
const API_ARGS = {
  SUCCESS: 0
}
const ERR = {
  STATUS_ERROR: 'API.STATUS錯誤'
}

function post(cmd: String, query: Object) {
  return new req({
    url: `/${cmd}`,
    method: 'post',
    data: { cmd: `${cmd}`, ...query }
  }).exec()
}
// 外部接口请求
function getExternal(options: { url: string }, query: Object) {
  return new req({
    baseURL: options.url,
    method: 'get',
    data: query
  }).exec()
}

class API {
  CMD: any
  constructor() {
    this.CMD = CMD
  }

  external(options: { url: string }, query: Object = {}) {
    // console.log(options, query)
    // return getExternal(options, query)
    return new Promise((resolve, reject) => {
      getExternal(options, query)
        .then((res: any) => {
          if (res.rtCode !== API_ARGS.SUCCESS) return reject(ERR.STATUS_ERROR)
          const _content = res.content
          if (!_content) return reject(ERR.STATUS_ERROR)

          const out: { [key: string]: any } = {}
          _content.lastNumberList.forEach((item: any) => {
            out[item.gameCode] = Object.assign(item, { en: GAME[item.gameCode].en })
          })
          out[_content.bingo.gameCode] = Object.assign(_content.bingo, {
            en: GAME[_content.bingo.gameCode].en
          })
          return resolve(out)
        })
        .catch(err => reject(err))
    })
  }

  //__SAMPLE__
  test(query: any) {
    return post(this.CMD.TEST, query)
  }
  //__SAMPLE.END__
}
export default new API()
