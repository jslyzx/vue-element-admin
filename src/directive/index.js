import permission from './permission'
import repeat from './repeat'

const install = function (Vue) {
  Vue.directive('permission', permission)
  Vue.directive('repeat', repeat)
}

if (window.Vue) {
  window['permission'] = permission
  window['repeat'] = repeat
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
