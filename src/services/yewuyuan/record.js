import { request ,config} from 'utils'

const { api } = config
const { records } = api

export function query (params) {
  return request({
    url: '../api_1/records',
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: 'api_1/records',
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: 'api_1/records/'.concat(params.id),
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: 'api_1/records',
    method: 'put',
    data: params,
  })
}
