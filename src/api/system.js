import request from '@/utils/request'

export function fetchAreaList() {
  return request({
    url: '/admin/area/queryTree',
    method: 'get'
  })
}

export function saveRegion(data) {
  return request({
    url: '/admin/area/save',
    method: 'post',
    data
  })
}

export function fetchProvList() {
  return request({
    url: '/admin/division/query',
    method: 'get'
  })
}

export function fetchSaleList(data) {
  return request({
    url: '/admin/salesman/grid',
    method: 'get',
    params: data
  })
}

export function fetchAreaSubList(data) {
  return request({
    url: '/admin/area/query',
    method: 'get',
    params: data
  })
}

export function saveSale(data) {
  return request({
    url: '/admin/salesman/save',
    method: 'post',
    data
  })
}

export function deleteSale(data) {
  return request({
    url: '/admin/salesman/delete_physical',
    method: 'delete',
    params: data
  })
}

export function deleteRegion(data) {
  return request({
    url: '/admin/area/deleteTree',
    method: 'delete',
    params: data
  })
}

export function fetchShopList(data) {
  return request({
    url: '/admin/shop/grid',
    method: 'get',
    params: data
  })
}

export function fetchCityList(data) {
  return request({
    url: '/admin/division/query',
    method: 'get',
    params: data
  })
}

export function saveShop(data) {
  return request({
    url: '/admin/shop/save',
    method: 'post',
    data
  })
}

export function queryShopInfo(data) {
  return request({
    url: '/patient/shop/serve/queryShopInfo',
    method: 'get',
    params: data
  })
}

export function getPatientStructure(data) {
  return request({
    url: '/patient/analysis/queryPatientStructure',
    method: 'get',
    params: data
  })
}

export function queryPatientComparison(data) {
  return request({
    url: '/patient/analysis/queryPatientComparison',
    method: 'get',
    params: data
  })
}

export function queryPatientCountByMonth(data) {
  return request({
    url: '/patient/analysis/queryPatientCountByMonth',
    method: 'get',
    params: data
  })
}

export function queryShopSaleAnalysis(data) {
  return request({
    url: '/sale/shop/queryShopSaleAnalysis',
    method: 'get',
    params: data
  })
}

export function queryPatientStopReasonRange(data) {
  return request({
    url: '/patient/analysis/queryPatientStopReasonRange',
    method: 'get',
    params: data
  })
}

export function queryPatientAnalysis(data) {
  return request({
    url: '/patient/analysis/queryPatientAnalysis',
    method: 'get',
    params: data
  })
}

// 角色管理列表
export function queryRoles(data) {
  return request({
    url: '/admin/role/grid',
    method: 'get',
    params: data
  })
}

// 保存角色
export function saveRole(data) {
  return request({
    url: '/admin/role/save',
    method: 'post',
    data
  })
}

// 获取权限列表
export function queryUserMenu(data) {
  return request({
    url: '/admin/role/queryRoleMenu',
    method: 'get',
    params: data
  })
}

// 保存权限分配
export function saveUserMenu(data) {
  return request({
    url: '/admin/role/saveRoleMenu',
    method: 'post',
    data
  })
}
