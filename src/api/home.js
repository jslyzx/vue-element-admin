import request from '@/utils/request'

// 年度DOT
export function queryDot(query) {
    return request({
        url: '/api/index/queryDot',
        method: 'post',
        params: query
    })
}
// 销售额
export function querySalesPrice(query) {
    return request({
        url: '/api/index/querySalesPrice',
        method: 'post',
        params: query
    })
}
// 销售数量
export function querySalesNum(query) {
    return request({
        url: '/api/index/querySalesNum',
        method: 'post',
        params: query
    })
}
// 患者数量
export function querySalesInfo(query) {
    return request({
        url: '/api/index/querySalesInfo',
        method: 'post',
        params: query
    })
}
// 热力图
export function queryCustomerHotInfo(query) {
    return request({
        url: '/api/index/queryCustomerHotInfo',
        method: 'post',
        params: query
    })
}
// 销售排行榜
export function queryShopSale(query) {
    return request({
        url: '/api/index/queryShopSale',
        method: 'post',
        params: query
    })
}
// 销售预估完成率和年度完成率
export function querySalesCompletionRate(query) {
    return request({
        url: '/api/index/querySalesCompletionRate',
        method: 'post',
        params: query
    })
}
// 每月销售柱状图
export function queryMonthSalesPrice(query) {
    return request({
        url: '/api/index/queryMonthSalesPrice',
        method: 'post',
        params: query
    })
}