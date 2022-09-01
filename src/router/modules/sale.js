import Layout from '@/layout'

const saleRouter = {
  path: '/sale',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Sale',
  meta: {
    title: '销售',
    icon: 'user'
  },
  children: [
    {
      path: 'yearly',
      component: () => import('@/views/sale/yearly'),
      name: 'SaleYearly',
      meta: { title: '年度销售' }
    }, {
      path: 'path',
      component: () => import('@/views/sale/path'),
      name: 'SalePath',
      meta: { title: '销售流向' }
    }, {
      path: 'rate',
      component: () => import('@/views/sale/rate'),
      name: 'SaleRate',
      meta: { title: '指标达成率' }
    }, {
      path: 'man',
      component: () => import('@/views/sale/man'),
      name: 'SalesMan',
      meta: { title: '业务员销售情况' }
    }, {
      path: 'shop',
      component: () => import('@/views/sale/shop'),
      name: 'ShopSale',
      meta: { title: '门店销售情况' }
    }
  ]
}

export default saleRouter
