import { request, config } from 'utils'

const { api } = config
const { batches } = api

export function query (params) {
  return request({
    url: batches,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: batches.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params)  {
  return request({
    url: batches,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: batches,
    method: 'patch',
    data: params,
  })
}

