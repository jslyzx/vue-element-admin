import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'setting'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'User',
      meta: {
        title: '用户管理'
      }
    },{
      path: 'sales',
      component: () => import('@/views/system/sales'),
      name: 'Sales',
      meta: {
        title: '业务员管理'
      }
    },{
      path: 'target',
      component: () => import('@/views/system/target'),
      name: 'Target',
      meta: {
        title: '指标管理'
      }
    },{
      path: 'shop',
      component: () => import('@/views/system/shop'),
      name: 'Shop',
      meta: {
        title: '门店列表'
      }
    },{
      path: 'region',
      component: () => import('@/views/system/region'),
      name: 'Region',
      meta: {
        title: '地区管理'
      }
    },
  ]
}

export default systemRouter