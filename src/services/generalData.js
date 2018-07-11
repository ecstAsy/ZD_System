import { request, config } from 'utils'

const { api } = config
const { generalData } = api

export function query (params) {
  return request({
    url: generalData,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: generalData.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params)  {
  return request({
    url: generalData,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: generalData,
    method: 'patch',
    data: params,
  })
}

