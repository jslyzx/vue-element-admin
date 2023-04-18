import Layout from '@/layout'

const businessRouter = {
  path: '/business',
  component: Layout,
  redirect: 'noRedirect',
  name: 'business',
  meta: {
    title: '商务管理',
    icon: 'wenjianjia'
  },
  children: [
    {
      path: 'personnel',
      component: () => import('@/views/business/personnel/index'),
      name: 'BusinessPersonnel',
      meta: { title: '商务人员' }
    }, {
      path: 'plan',
      component: () => import('@/views/business/plan/index'),
      name: 'BusinessPlan',
      meta: { title: '拜访计划' }
    }, {
      path: 'task',
      component: () => import('@/views/business/task/index'),
      name: 'BusinessTask',
      meta: { title: '拜访任务' }
    }, {
      path: 'check',
      component: () => import('@/views/business/check/index'),
      name: 'BusinessCheck',
      meta: { title: '合规检查' }
    }, {
      path: 'detail/:id',
      component: () => import('@/views/business/personnel/detail'),
      name: 'BusinessPersonnelDetail',
      hidden: true,
      meta: { title: '商务人员详情' }
    }
  ]
}

export default businessRouter
