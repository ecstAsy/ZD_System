import { request } from 'utils'

export function query (params) {
  return request({
    url: '../api_1/purchases',
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: 'api_1/purchases',
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: 'api_1/purchases/'.concat(params.id),
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: 'api_1/purchases',
    method: 'put',
    data: params,
  })
}
