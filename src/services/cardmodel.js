import { request } from 'utils'

export function queryCardkind () {
  return request({
    url: 'http://0.0.0.0:8000/api_1/cardKindNameList',
    method: 'get',
  })
}

export function query (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/cardmodel',
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/cardmodel',
    method: 'post',
    data: params,
  })
}

export function update (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/cardmodel',
    method: 'put',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: 'http://0.0.0.0:8000/api_1/cardmodel/'.concat(params.id),
    method: 'delete',
  })
}

