// 销售流向接口
import request from '@/utils/request'

// 医院流向数据
export function queryHospitalSales(query) {
    return request({
        url: '/api/SalesFlow/queryHospitalSales',
        method: 'post',
        params: query
    })
}
// 医院科室流向数据
export function queryHospitalOfficeSales(query) {
    return request({
        url: '/api/SalesFlow/queryHospitalOfficeSales',
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