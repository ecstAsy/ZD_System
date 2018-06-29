import { request, config } from 'utils'

const { api } = config
const { successPolicys } = api

export function query (params) {
  return request({
    url: successPolicys,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: successPolicys,
    method: 'delete',
    data: params,
  })
}
