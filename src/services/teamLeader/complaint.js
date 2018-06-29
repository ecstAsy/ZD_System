import { request, config } from 'utils'

const { api } = config
const { complaint } = api

export function query (params) {
  return request({
    url: complaint,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: complaint.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params)  {
  return request({
    url: complaint,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: complaint,
    method: 'patch',
    data: params,
  })
}

