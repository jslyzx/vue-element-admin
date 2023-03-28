import request from '@/utils/request'

export function grid(data) {
  return request({
    url: 'demo/check/grid',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return request({
    url: 'demo/check/save',
    method: 'post',
    data
  })
}
export function find(data) {
  return request({
    url: 'demo/check/find',
    method: 'get',
    params: data
  })
}

export function enable(data) {
  return request({
    url: 'demo/check/enable',
    method: 'post',
    params: data
  })
}
export function disable(data) {
  return request({
    url: 'demo/check/disable',
    method: 'post',
    params: data
  })
}

