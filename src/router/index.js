import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '../components/UserLogin'
import UserHome from '../components/UserHome'
import AdminHome from '../components/AdminHome'
import FormManage from '../components/FormManage'
import UserManage from '../components/UserManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/UserHome',
      name: 'UserHome',
      component: UserHome
    },
    {
      path: '/AdminHome',
      name: 'AdminHome',
      component: AdminHome,
      children: [
        {
          path: '/FormManage',
          name: 'FormManage',
          component: FormManage
        },
        {
          path: '/UserManage',
          name: 'UserManage',
          component: UserManage
        }
      ]
    }
  ]
})
