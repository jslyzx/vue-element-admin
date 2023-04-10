import Layout from '@/layout'

const shopRouter = {
  path: '/shop',
  component: Layout,
  redirect: 'noRedirect',
  name: 'shop',
  meta: {
    title: '药房管理',
    icon: 'wenjianjia'
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/shop/info/index'),
      name: 'shopInfo',
      meta: { title: '授权药房登记' }
    }, {
      path: 'distributed',
      component: () => import('@/views/shop/distributed/index'),
      name: 'shopDistributed',
      meta: { title: '授权药房分布' }
    }
  ]
}

export default shopRouter
