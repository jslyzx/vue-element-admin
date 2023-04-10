import request from '@/utils/request'

export function grid(data) {
  return request({
    url: 'demo/task/plan/grid',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return request({
    url: 'demo/task/plan/save',
    method: 'post',
    data
  })
}
export function find(data) {
  return request({
    url: 'demo/task/plan/find',
    method: 'get',
    params: data
  })
}

export function enable(data) {
  return request({
    url: 'demo/task/plan/enable',
    method: 'post',
    params: data
  })
}
export function disable(data) {
  return request({
    url: 'demo/task/plan/disable',
    method: 'post',
    params: data
  })
}
export function cancel(data) {
  return request({
    url: 'demo/task/plan/delete',
    method: 'delete',
    params: data
  })
}


