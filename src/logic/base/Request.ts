import { merge, cloneDeep, get } from 'lodash-es'
import axios from 'axios'

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10 * 1000,
  method: 'GET',
  baseURL: 'https://jsonplaceholder.typicode.com',
}

function createService() {
  const service = axios.create()
  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    async (response) => {
      return get(response, 'data')
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return service
}

export default class Request {
  options: Object
  constructor(options: Object = {}) {
    this.options = options
  }
  exec() {
    const service = createService()
    const mergeConfig = merge(cloneDeep(defaultConfig), this.options)
    return service(mergeConfig)
  }
}