import request from '@/utils/request'

export function grid(data) {
  return request({
    url: 'admin/shop/grid',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return request({
    url: 'admin/shop/save',
    method: 'post',
    data
  })
}
export function find(data) {
  return request({
    url: 'admin/shop/find',
    method: 'get',
    params: data
  })
}

export function enable(data) {
  return request({
    url: 'admin/shop/enable',
    method: 'post',
    params: data
  })
}
export function disable(data) {
  return request({
    url: 'admin/shop/disable',
    method: 'post',
    params: data
  })
}
export function cancel(data) {
  return request({
    url: 'admin/shop/delete',
    method: 'post',
    params: data
  })
}


