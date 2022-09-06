import request from '@/utils/request'

export function queryProvinceSalePriceRate(data) {
    return request({
        url: '/api/yearSales/queryProvinceSalePriceRate',
        method: 'post',
        data,
    })
}

export function queryArea(pId) {
    return request({
        url: `/api/admin/area/query`,
        method: 'get',
        params:{pId}
    })
}

export function queryShop(data) {
    return request({
        url: `/api/admin/shop/grid`,
        method: 'get',
        params:data,
    })
}

export function submitTop(data) {
    return request({
        url: `/api/yearSales/querySalesInfo`,
        method: 'post',
        data,
    })
}