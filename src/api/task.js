import request from '@/utils/request'

export function grid(data) {
  return request({
    url: 'demo/task/grid',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return request({
    url: 'demo/task/save',
    method: 'post',
    data
  })
}
export function find(data) {
  return request({
    url: 'demo/task/find',
    method: 'get',
    params: data
  })
}

export function enable(data) {
  return request({
    url: 'demo/task/enable',
    method: 'post',
    params: data
  })
}
export function disable(data) {
  return request({
    url: 'demo/task/disable',
    method: 'post',
    params: data
  })
}
export function cancel(data) {
  return request({
    url: 'demo/task/delete',
    method: 'delete',
    params: data
  })
}


