import req from './Request'

const CMD = {
  TEST: 'posts',
  SEARCH: 'sample_agentOutsideMemberAuthQuery',
  ADD: 'sample_agentOutsideMemberAuthAdd',
  DEL: 'sample_agentOutsideMemberAuthDel'
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

  external(options: { url: string }, query: Object) {
    return getExternal(options, query)
  }

  //__SAMPLE__
  test(query: any) {
    return post(this.CMD.TEST, query)
  }
  //__SAMPLE.END__
}
export default new API()
