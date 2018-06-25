import { request, config } from 'utils'

const { api } = config
const { users } = api

export function query (params) {
  return request({
    url: 'api_1/purchases',
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}
