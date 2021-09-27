import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Import from '../views/Import.vue'
import Status from '../views/Status.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/import',
    name: 'Import',
    component: Import
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
