import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    formData: true,
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/admin/user/find',
    method: 'get',
    params: { id }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getUsers(data) {
  return request({
    url: '/admin/user/grid',
    method: 'get',
    params: data
  })
}

export function deleteUser(data) {
  return request({
    url: '/admin/user/delete_physical',
    method: 'delete',
    params: data
  })
}

export function shopServiceList(data) {
  return request({
    url: '/patient/shop/serve/grid',
    method: 'get',
    params: data
  })
}

export function shopServiceCharts(data) {
  return request({
    url: '/patient/shop/serve/chartData',
    method: 'get',
    params: data
  })
}

export function saveUser(data) {
  return request({
    url: '/admin/user/save',
    method: 'post',
    data
  })
}
