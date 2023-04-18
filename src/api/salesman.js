import request from '@/utils/request'

export function grid(data) {
  return request({
    url: 'demo/salesman/grid',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return request({
    url: 'demo/salesman/save',
    method: 'post',
    data
  })
}
export function find(data) {
  return request({
    url: 'demo/salesman/find',
    method: 'get',
    params: data
  })
}

export function cancel(data) {
  return request({
    url: 'demo/salesman/delete',
    method: 'delete',
    params: data
  })
}
export function authorized(data) {
  return request({
    url: 'demo/salesman/shop/authorized',
    method: 'get',
    params: data
  })
}

export function detail(data) {
  return request({
    url: 'demo/salesman/detail',
    method: 'get',
    params: data
  })
}
