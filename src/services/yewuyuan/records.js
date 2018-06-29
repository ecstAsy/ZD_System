import { request, config } from 'utils'

const { api } = config
const { records } = api

export function query (params) {
  return request({
    url: records,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: records,
    method: 'delete',
    data: params,
  })
}
