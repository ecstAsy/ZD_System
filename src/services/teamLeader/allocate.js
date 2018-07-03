import { request, config } from 'utils'

const { api } = config
const { allocate } = api

export function query (params) {
  return request({
    url: allocate,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: allocate.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params)  {
  return request({
    url: allocate,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: allocate,
    method: 'patch',
    data: params,
  })
}

