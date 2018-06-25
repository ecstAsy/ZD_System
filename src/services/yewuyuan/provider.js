import { request } from 'utils'

export function query (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/providers',
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/providers',
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/providers/'.concat(params.id),
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/providers',
    method: 'put',
    data: params,
  })
}
