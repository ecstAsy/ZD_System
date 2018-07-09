import { request, config } from 'utils'

const { api } = config
const { application } = api

export function query (params) {
  return request({
    url: application,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: application.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params)  {
  return request({
    url: application,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: application,
    method: 'patch',
    data: params,
  })
}

