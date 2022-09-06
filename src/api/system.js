import request from '@/utils/request'

export function fetchAreaList() {
  return request({
    url: '/api/admin/area/queryTree',
    method: 'get'
  })
}

export function saveRegion(data) {
  return request({
    url: '/api/admin/area/save',
    method: 'post',
    data
  })
}

export function fetchProvList() {
  return request({
    url: '/api/admin/division/query',
    method: 'get'
  })
}

export function fetchSaleList(data) {
  return request({
    url: '/api/admin/salesman/grid',
    method: 'get',
    params: data
  })
}

