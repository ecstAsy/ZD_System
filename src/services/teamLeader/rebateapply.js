import { request, config } from 'utils'

const { api } = config
const { rebateapply } = api

export function query (params) {
  return request({
    url: rebateapply,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: rebateapply.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params)  {
  return request({
    url: rebateapply,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: rebateapply,
    method: 'patch',
    data: params,
  })
}
