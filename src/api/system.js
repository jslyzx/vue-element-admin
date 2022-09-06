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

export function fetchAreaSubList(data) {
  return request({
    url: '/api/admin/area/query',
    method: 'get',
    params: data
  })
}

export function saveSale(data) {
  return request({
    url: '/api/admin/salesman/save',
    method: 'post',
    data
  })
}

export function deleteSale(data) {
  return request({
    url: '/api/admin/salesman/delete_physical',
    method: 'delete',
    params: data
  })
}

export function deleteRegion(data) {
  return request({
    url: '/api/admin/area/deleteTree',
    method: 'delete',
    params: data
  })
}

export function fetchShopList(data) {
  return request({
    url: '/api/admin/shop/grid',
    method: 'get',
    params: data
  })
}

export function fetchCityList(data) {
  return request({
    url: '/api/admin/division/query',
    method: 'get',
    params: data
  })
}

export function saveShop(data) {
  return request({
    url: '/api/admin/shop/save',
    method: 'post',
    data
  })
}
