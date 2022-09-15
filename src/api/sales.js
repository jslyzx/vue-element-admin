import request from '@/utils/request'

export function queryProvinceSalePriceRate(data) {
    return request({
        url: '/yearSales/queryProvinceSalePriceRate',
        method: 'post',
        params: data
    })
}

export function queryRegionSale(data) {
    return request({
        url: '/yearSales/queryRegionSalePriceRate',
        method: 'post',
        params: data
    })
}
export function querySectionSale(data) {
    return request({
        url: '/yearSales/querySectionSalePriceRate',
        method: 'post',
        params: data
    })
}
export function queryArea(pId) {
  return request({
    url: '/admin/area/query',
    method: 'get',
    params: { pId }
  })
}

export function queryShop(data) {
  return request({
    url: '/admin/shop/grid',
    method: 'get',
    params: data
  })
}

export function submitTop(data) {
  return request({
    url: '/yearSales/querySalesInfo',
    method: 'post',
    params: data
  })
}


export function queryShopSale(data) {
    return request({
        url: `/sale/shop/queryShopSaleAnalysis`,
        method: 'get',
        params:data,
    })
}

