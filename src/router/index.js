import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import(/* webpackChunkName: "articles" */ '../views/Articles.vue')
  },
  {
    path: '/article/create',
    name: 'Article create',
    component: () => import(/* webpackChunkName: "article create" */ '../views/ArticleCreate.vue')
  },
  {
    path: '/article/edit',
    name: 'Article edit',
    component: () => import(/* webpackChunkName: "article edit" */ '../views/ArticleEdit.vue')
  },
  {
    path: '/category/create',
    name: 'Category create',
    component: () => import(/* webpackChunkName: "category create" */ '../views/CategoryCreate.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
