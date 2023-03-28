import Layout from '@/layout'

const evalRouter = {
  path: '/eval',
  component: Layout,
  redirect: 'noRedirect',
  name: 'eval',
  meta: {
    title: '评估方案',
    icon: 'eval'
  },
  children: [
    {
      path: 'evalPersonnel',
      component: () => import('@/views/eval/eval/index'),
      name: 'Eval',
      meta: { title: '评估方案' }
    }
  ]
}

export default evalRouter
