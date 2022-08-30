import request from '@/utils/request'

export function fetchAreaList() {
  return request({
    url: '/api/admin/area/queryTree',
    method: 'get'
  })
}

