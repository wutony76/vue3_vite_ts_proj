import router from '@/router'

export default function ready() {
  return new Promise((resolve: any, reject: any) => {
    init().then((isReady) => {
      if (!isReady) throw new Error('!!!INIT.ERROR.錯誤')
      return resolve(Promise.all([handleConfig(), handleUrlQuery()]))
    }).catch((err) => {
      console.error('TTT.launch-js.ready.ERR.', err)
    })
  })
}

// __INIT.FUNC__
function init() {
  return new Promise((resolve: any, reject: any) => {
    try {
      // init something...
      return resolve(true)
    } catch (e) {
      return reject(e)
    }
  })
}
function handleConfig() {
  return new Promise((resolve) => {
    // do.something.
    return resolve(true)
  })
}
function handleUrlQuery() {
  return new Promise((resolve) => {
    // __ do.something __
    const keysRemove: string[] = []
    const hashParamsVal = queryString('params')
    if (hashParamsVal) keysRemove.push('params')
    // console.log('keysRemove', keysRemove)
    removeQueryString(keysRemove)

    // __ do something end__
    return resolve(true)
  })
}

// __HANDLE.URL.QUERY.FUNC__
export function queryString(key: string) {
  let location = document.location.search
  let value = (location.match(
    new RegExp('(?:^\\?|&)' + key + '=(.*?)(?=&|$)')
  ) || ['', null])[1]

  // __HANDLE NULL__
  if (value === null) {
    try {
      let _url = document.location.href
      let _params = new URL(_url).searchParams
      let _value = _params.get(key)
      value = _value
    } catch (e) {
      value = null
    }
  }
  return value
}
export function removeQueryString(keys: string[] = []) {
  if (keys.length == 0) return
  let { pathname, hash, search } = window.location
  let searches = new URLSearchParams(search)
  keys.forEach((key) => {
    searches.delete(key)
    // if (window.SEARCH_PARAMS) delete SEARCH_PARAMS[key]
  })
  const searchString = decodeURIComponent(searches.toString())
  let mark = searches.keys().next().done ? '' : '?'
  let path = `${pathname}${mark}${searchString}${hash}`
  // 改變當前地址 不轉址的方式 
  /**
   * https://juejin.cn/post/7197309324275335227  
   * vue3 中不能使用 history.pushState 来修改 url 的参数
   */
  // window.history.pushState(null, '', path) // vue2.可正常使用
  router.push({ path: path, query: {} })
}