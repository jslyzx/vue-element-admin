import Layout from '@/layout'

const patientRouter = {
  path: '/patient',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Patient',
  meta: {
    title: '患者',
    icon: 'person'
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/patient/info'),
      name: 'PatientInfo',
      meta: { title: '患者信息' }
    }, {
      path: 'age',
      component: () => import('@/views/patient/age'),
      name: 'PatientAge',
      meta: { title: '新老患者分析' }
    }, {
      path: 'structure',
      component: () => import('@/views/patient/structure'),
      name: 'PatientStructure',
      meta: { title: '患者结构分析' }
    }, {
      path: 'service',
      component: () => import('@/views/patient/service'),
      name: 'ShopService',
      meta: { title: '门店服务情况' }
    },{
      path: 'baseInfo',
      component: () => import('@/views/patient/basicInfo'),
      name: 'ShopService',
      meta: { title: '基本信息',hidden:true }
    }
  ]
}

export default patientRouter
