import request from '@/utils/request'

export function grid(data) {
  return request({
    url: 'demo/eval/grid',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return request({
    url: 'demo/eval/save',
    method: 'post',
    data
  })
}
export function find(data) {
  return request({
    url: 'demo/eval/find',
    method: 'get',
    params: data
  })
}

export function enable(data) {
  return request({
    url: 'demo/eval/enable',
    method: 'post',
    params: data
  })
}
export function disable(data) {
  return request({
    url: 'demo/eval/disable',
    method: 'post',
    params: data
  })
}
export function cancel(data) {
  return request({
    url: 'demo/eval/delete',
    method: 'post',
    params: data
  })
}


