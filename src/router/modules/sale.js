import Layout from '@/layout'

const saleRouter = {
  path: '/sale',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Sale',
  meta: {
    title: '销售',
    icon: 'claim'
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
    },{
      path: 'shop',
      component: () => import('@/views/sale/shop'),
      name: 'ShopSale',
      meta: { title: '门店销售情况' }
    }
  ]
}

export default saleRouter
