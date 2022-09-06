import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    formData: true,
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
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
    url: '/api/admin/user/grid',
    method: 'get',
    params: data
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/admin/user/delete_physical',
    method: 'delete',
    params: data
  })
}
