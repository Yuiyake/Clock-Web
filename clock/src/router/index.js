import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminRouter from "@/router/modules/admin";
import UserRouter from "@/router/modules/user";

Vue.use(VueRouter)

export const prorouters = [
  // 重定向到login
  {
    path: '/',
    name: 'userLogin',
    component: () => import('../views/common/userLogin'),
  },
  {
    path: '/userLogin',
    name: 'userLogin',
    component: () => import('../views/common/userLogin'),
  },
  AdminRouter,
  UserRouter,
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: prorouters
})

export default router
