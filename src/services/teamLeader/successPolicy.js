import { request, config } from 'utils'

const { api } = config
const { successPolicy } = api

export function query (params) {
  return request({
    url: successPolicy,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: successPolicy.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: successPolicy,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
